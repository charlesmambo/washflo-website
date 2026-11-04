import dotenv from "dotenv";
import http from "node:http";
import nodemailer from "nodemailer";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("./.env", import.meta.url));
const smtpEnvironmentKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO"];
const inheritedSmtpKeys = smtpEnvironmentKeys.filter((key) => Object.hasOwn(process.env, key));
const envResult = dotenv.config({ path: envPath });

if (envResult.error && envResult.error.code !== "ENOENT") {
  console.warn("Could not read backend/.env:", envResult.error.message);
}

if (inheritedSmtpKeys.length) {
  console.warn(
    `SMTP settings already present in the shell/server environment (these take precedence over backend/.env): ${inheritedSmtpKeys.join(", ")}`,
  );
}

const PORT = Number(process.env.PORT || 3001);
const BODY_LIMIT_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://washflo.co.za",
  "https://www.washflo.co.za",
  ...(process.env.ALLOWED_ORIGINS || "").split(",").map((origin) => origin.trim()),
].filter(Boolean));
const recentSubmissions = new Map();

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  if (!origin) return true;
  if (!allowedOrigins.has(origin)) return false;

  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Vary", "Origin");
  return true;
}

function getClientAddress(request) {
  if (process.env.TRUST_PROXY === "true") {
    const forwarded = request.headers["x-forwarded-for"];
    if (typeof forwarded === "string" && forwarded.trim()) {
      return forwarded.split(",")[0].trim();
    }
  }
  return request.socket.remoteAddress || "unknown";
}

function isRateLimited(address) {
  const now = Date.now();
  const entry = recentSubmissions.get(address);

  if (!entry || entry.resetAt <= now) {
    recentSubmissions.set(address, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

async function readJson(request, response) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > BODY_LIMIT_BYTES) {
      sendJson(response, 413, { success: false, message: "Your message is too long to send. Please shorten it and try again." });
      return undefined;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    sendJson(response, 400, { success: false, message: "We couldn't read your message. Please refresh the page and try again." });
    return undefined;
  }
}

function validateSubmission(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const business = typeof body.business === "string" ? body.business.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const errors = {};

  if (name.length < 2) errors.name = "Enter your name using at least 2 characters.";
  if (name.length > 100) errors.name = "Your name must be 100 characters or fewer.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a valid email address so we can reply to you.";
  }
  if (business.length > 120) errors.business = "The business name must be 120 characters or fewer.";
  if (message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  if (message.length > 3000) errors.message = "Your message must be 3,000 characters or fewer.";

  return { values: { name, email, business, message }, errors };
}

function createTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const requiredMailSettings = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO"];
const missingMailSettings = requiredMailSettings.filter((key) => !process.env[key]?.trim());
const mailer = missingMailSettings.length ? null : createTransporter();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/health" && request.method === "GET") {
    return sendJson(response, 200, { ok: true });
  }

  if (requestUrl.pathname !== "/api/contact") {
    return sendJson(response, 404, { success: false, message: "Not found." });
  }

  if (!applyCors(request, response)) {
    return sendJson(response, 403, { success: false, message: "We couldn't submit your message from this page. Please refresh and try again." });
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    return response.end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    return sendJson(response, 405, { success: false, message: "Please use the contact form to send your message." });
  }

  if (isRateLimited(getClientAddress(request))) {
    return sendJson(response, 429, { success: false, message: "You've sent several messages recently. Please wait 15 minutes and try again." });
  }

  const body = await readJson(request, response);
  if (body === undefined) return;

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return sendJson(response, 400, { success: false, message: "Please check your details and try again." });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return sendJson(response, 400, {
      success: false,
      accepted: false,
      message: "We couldn't submit your message. Please refresh the page and try again.",
    });
  }

  const { values, errors } = validateSubmission(body);
  if (Object.keys(errors).length) {
    return sendJson(response, 400, {
      success: false,
      message: "Please check the fields marked below and try again.",
      errors,
    });
  }

  if (!mailer) {
    return sendJson(response, 503, {
      success: false,
      message: "We couldn't send your message right now. Please try again later, or email us at charles@washflo.co.za.",
    });
  }

  try {
    const delivery = await mailer.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: values.email,
      subject: "New Washflo website enquiry",
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Business: ${values.business || "Not provided"}`,
        "",
        "Message:",
        values.message,
      ].join("\n"),
    });

    const configuredRecipient = process.env.MAIL_TO.trim().toLowerCase();
    const recipientAccepted = delivery.accepted?.some(
      (address) => String(address).toLowerCase() === configuredRecipient,
    );

    if (!recipientAccepted) {
      throw new Error("SMTP did not accept the configured recipient.");
    }

    console.info("Contact enquiry accepted by SMTP:", {
      messageId: delivery.messageId,
      response: delivery.response,
      recipientAccepted,
    });

    return sendJson(response, 200, {
      success: true,
      accepted: true,
      message: "Thank you for reaching out! Your message has been sent successfully. We'll get back to you as soon as possible.",
    });
  } catch (error) {
    console.error("Contact email delivery failed:", error instanceof Error ? error.message : "Unknown SMTP error");
    return sendJson(response, 502, {
      success: false,
      message: "We couldn't send your message right now. Please try again later, or email us at charles@washflo.co.za.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Washflo email backend listening on port ${PORT}`);
  if (!mailer) {
    console.warn(`Missing SMTP settings: ${missingMailSettings.join(", ")}. Contact submissions will return 503 until configured.`);
  }
});

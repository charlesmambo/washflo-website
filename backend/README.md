# Washflo email backend

This Node service validates contact form submissions and sends them to the configured mailbox through SMTP. SMTP credentials stay on the server and are never included in the frontend.

## Local setup

1. Install the backend dependencies: `npm --prefix backend install`.
2. Enter the email account password in `backend/.env` as `SMTP_PASS`. The SMTP host, port, username, and sender are already configured.
3. Start the API with `npm run backend:dev` from the project root.
4. Start the Vite site in another terminal with `npm run dev`.

Vite forwards `/api` requests to `http://localhost:3001` during local development.

## Production setup

Deploy the `backend` directory to a Node.js 20 or newer host. For local use, configure the SMTP variables in `backend/.env`. For Render Free, use Resend over HTTPS instead: add `RESEND_API_KEY` in the Render environment settings, set `MAIL_FROM` to a sender on a domain verified in Resend, and keep `MAIL_TO` set to the inbox that should receive enquiries. When `RESEND_API_KEY` is set, the backend uses Resend instead of SMTP. Resend requires adding the DNS records it provides to your domain and verifying the domain before sending from it. See the [Resend send email API](https://resend.com/docs/api-reference/emails/send-email).

Render Free web services block outbound SMTP on ports 25, 465, and 587. If you want to keep sending through the mailbox SMTP server, upgrade the Render web service to a paid instance type. See [Render's free service limitations](https://render.com/docs/free).

Set `ALLOWED_ORIGINS` to the exact website origins, separated by commas, for example `https://washflo.co.za,https://www.washflo.co.za`. If the backend is hosted on a different origin, set the frontend build variable `VITE_API_BASE_URL` to the backend's HTTPS origin. If both are served from the same origin through a reverse proxy, leave it empty and route `/api` to the backend.

Set `TRUST_PROXY=true` only when the backend is behind a trusted proxy that replaces the `X-Forwarded-For` header. The API rate-limits each client to five submissions per 15 minutes.

The health endpoint is `GET /health`. Contact submissions use `POST /api/contact` with JSON fields `name`, `email`, `business`, and `message`.

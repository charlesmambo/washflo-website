# Washflo email backend

This Node service validates contact form submissions and sends them to the configured mailbox through SMTP. SMTP credentials stay on the server and are never included in the frontend.

## Local setup

1. Install the backend dependencies: `npm --prefix backend install`.
2. Enter the email account password in `backend/.env` as `SMTP_PASS`. The SMTP host, port, username, and sender are already configured.
3. Start the API with `npm run backend:dev` from the project root.
4. Start the Vite site in another terminal with `npm run dev`.

Vite forwards `/api` requests to `http://localhost:3001` during local development.

## Production setup

Deploy the `backend` directory to a Node.js 20 or newer host, then add the required variables from `backend/.env` in that host’s environment settings. `MAIL_FROM` should be an address the SMTP account is allowed to send as. The recipient is `charles@washflo.co.za`.

Set `ALLOWED_ORIGINS` to the exact website origins, separated by commas, for example `https://washflo.co.za,https://www.washflo.co.za`. If the backend is hosted on a different origin, set the frontend build variable `VITE_API_BASE_URL` to the backend’s HTTPS origin. If both are served from the same origin through a reverse proxy, leave it empty and route `/api` to the backend.

Set `TRUST_PROXY=true` only when the backend is behind a trusted proxy that replaces the `X-Forwarded-For` header. The API rate-limits each client to five submissions per 15 minutes.

The health endpoint is `GET /health`. Contact submissions use `POST /api/contact` with JSON fields `name`, `email`, `business`, and `message`.

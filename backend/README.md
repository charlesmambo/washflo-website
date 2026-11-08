# Washflo email backend

This Node service validates contact form submissions and sends them through SendGrid. The API key and verified sender stay on the backend.

## Local setup

1. Install backend dependencies: `npm --prefix backend install`.
2. Set `SENDGRID_API_KEY` to the SendGrid API key, `MAIL_FROM` to a verified sender address, and `MAIL_TO` to the inbox that should receive enquiries in `backend/.env`.
3. Start the API with `npm run backend:dev` from the project root.
4. Start the Vite site in another terminal with `npm run dev`.

Vite forwards `/api` requests to `http://localhost:3001` during local development.

## Production setup

Deploy the `backend` directory to a Node.js 20 or newer host and add `SENDGRID_API_KEY`, `MAIL_FROM`, and `MAIL_TO` in the host's environment settings. `MAIL_FROM` must be a sender verified in SendGrid. The contact form sends enquiries to `MAIL_TO` and sets the submitter's email as `Reply-To`.

Set `ALLOWED_ORIGINS` to the exact website origins, separated by commas, for example `https://washflo.co.za,https://www.washflo.co.za`. If the backend is hosted on a different origin, set the frontend build variable `VITE_API_BASE_URL` to the backend's HTTPS origin. If both are served from the same origin through a reverse proxy, leave it empty and route `/api` to the backend.

Set `TRUST_PROXY=true` only when the backend is behind a trusted proxy that replaces the `X-Forwarded-For` header. The API rate-limits each client to five submissions per 15 minutes.

The health endpoint is `GET /health`. Contact submissions use `POST /api/contact` with JSON fields `name`, `email`, `business`, and `message`.

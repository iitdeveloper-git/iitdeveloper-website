# Environment Variables Reference

Complete reference for all environment variables used by the IITDEVELOPER frontend application.

> [!IMPORTANT]
> Copy `.env.example` to `.env.local` before running locally. Never commit `.env.local` or any file containing real credentials to version control.

```bash
cp .env.example .env.local
```

---

## Variable Summary

| Variable | Required | Scope |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | ✅ Required | Public |
| `NEXT_PUBLIC_API_URL` | Optional | Public |
| `DATABASE_URL` | ✅ Required (prod) | Server only |
| `POSTGRES_HOST` | Dev only | Server only |
| `POSTGRES_PORT` | Dev only | Server only |
| `POSTGRES_DB` | Dev only | Server only |
| `POSTGRES_USER` | Dev only | Server only |
| `POSTGRES_PASSWORD` | Dev only | Server only |
| `SMTP_HOST` | ✅ Required | Server only |
| `SMTP_PORT` | ✅ Required | Server only |
| `SMTP_SECURE` | ✅ Required | Server only |
| `SMTP_USER` | ✅ Required | Server only |
| `SMTP_PASS` | ✅ Required | Server only |
| `FROM_EMAIL` | ✅ Required | Server only |
| `FROM_NAME` | Optional | Server only |
| `SALES_EMAIL` | Optional | Server only |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public |
| `NEXT_PUBLIC_BOOKING_URL` | ✅ Required (for CTAs) | Public |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Optional | Public |
| `NEXT_PUBLIC_BING_VERIFICATION` | Optional | Public |
| `NEXT_TELEMETRY_DISABLED` | Optional | Build |

---

## App URL

### `NEXT_PUBLIC_APP_URL`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Public (browser) |
| **Example** | `https://iitdeveloper.com` |

The canonical, fully-qualified URL of the deployed site. Used to construct absolute URLs for SEO metadata, Open Graph tags, canonical links, and structured data.

- Do not include a trailing slash.
- In development: `http://localhost:3000`
- In production: `https://iitdeveloper.com`

**Where it's used:** `src/lib/config/site.ts` → `siteConfig.url`

---

### `NEXT_PUBLIC_API_URL`

| Property | Value |
|---|---|
| **Required** | Optional |
| **Scope** | Public (browser) |
| **Example** | `https://iitdeveloper.com` or leave blank |

Base URL for API requests made from the browser. When left blank, the app uses relative paths (e.g. `/api/leads`), which is correct for same-domain deployments on Vercel or Netlify.

Only set this if you are running the API on a separate domain from the frontend.

---

## Database

### `DATABASE_URL`

| Property | Value |
|---|---|
| **Required** | ✅ Yes (production) |
| **Scope** | Server only |
| **Example** | `postgres://user:pass@ep-cool-name-123.us-east-2.aws.neon.tech/iitdeveloper?sslmode=require` |

Neon PostgreSQL connection string. This is the primary database connection used by `@neondatabase/serverless` for all server-side database operations including lead storage, estimate management, and email logging.

**How to get it:**
1. Sign up or log in at [neon.tech](https://neon.tech)
2. Create a project named `iitdeveloper`
3. Go to **Dashboard → Connection Details**
4. Copy the **Connection string** (make sure `?sslmode=require` is appended)
5. Paste it as `DATABASE_URL` in your hosting platform's environment variables

**SSL requirement:** The `?sslmode=require` parameter is mandatory. Neon rejects unencrypted connections.

**Schema setup:** Run `npm run db:migrate:neon` once after setting this variable to create all tables.

---

### `POSTGRES_HOST` / `POSTGRES_PORT` / `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD`

| Property | Value |
|---|---|
| **Required** | Development only |
| **Scope** | Server only |
| **Example** | `localhost` / `5432` / `iitdeveloper` / `postgres` / `postgres` |

Local PostgreSQL credentials used by `migrate.js` during development. These are **not** used when `DATABASE_URL` is set. Do not set these in production — use `DATABASE_URL` instead.

---

## SMTP Email

The email system uses Nodemailer with a direct SMTP connection. All five variables below must be set for emails to send in production. If any are missing, the service falls back to a dev-mode console log (no emails are sent).

### `SMTP_HOST`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | `mail.iitdeveloper.com` |

Hostname of the outgoing SMTP server. For cPanel-based hosting (which iitdeveloper.com uses), this is typically `mail.<your-domain>.com`.

Do not use IP addresses here; use the hostname to avoid SSL certificate mismatches.

---

### `SMTP_PORT`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | `465` |

SMTP port number.

| Port | Protocol | When to use |
|------|----------|-------------|
| `465` | SSL/TLS | Standard cPanel, self-hosted mail — **use this** |
| `587` | STARTTLS | Gmail, SendGrid, Mailgun |
| `25` | Plain | Legacy only — blocked by most cloud providers |

The production IITDEVELOPER mail server uses port **465 with SSL**.

---

### `SMTP_SECURE`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | `true` |

Whether to use SSL/TLS for the SMTP connection.

- Set to `true` when `SMTP_PORT=465` (SSL/TLS connection from the start)
- Set to `false` when `SMTP_PORT=587` (STARTTLS — upgrades after connection)

The email service defaults to `true` if this variable is not set.

---

### `SMTP_USER`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | `info@iitdeveloper.com` |

The full email address used to authenticate with the SMTP server. This is both the login username and the `From` address for outgoing mail unless `FROM_EMAIL` overrides it.

**How to get it:** Log in to your cPanel → Email Accounts → find or create `info@iitdeveloper.com` → note the password.

---

### `SMTP_PASS`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | *(your mailbox password)* |

Password for `SMTP_USER`. Never commit this value.

**Security note:** Use your hosting platform's secret/environment variable store — not a `.env` file committed to git. On Vercel: **Settings → Environment Variables → Add**. On Netlify: **Site Configuration → Environment Variables → Add**.

---

### `FROM_EMAIL`

| Property | Value |
|---|---|
| **Required** | ✅ Yes |
| **Scope** | Server only |
| **Example** | `info@iitdeveloper.com` |

The email address that appears in the `From:` header of all outgoing emails. Must be a valid mailbox on the SMTP server — many mail servers reject messages where `From` doesn't match the authenticated user.

---

### `FROM_NAME`

| Property | Value |
|---|---|
| **Required** | Optional |
| **Scope** | Server only |
| **Default** | `IITDeveloper` |
| **Example** | `IIT Developer` |

Display name shown alongside `FROM_EMAIL` in email clients (e.g., `IIT Developer <info@iitdeveloper.com>`). Defaults to `IITDeveloper` if not set.

---

### `SALES_EMAIL`

| Property | Value |
|---|---|
| **Required** | Optional |
| **Scope** | Server only |
| **Default** | `info@iitdeveloper.com` |
| **Example** | `info@iitdeveloper.com` |

Internal email address that receives lead notification emails when someone submits the contact form or requests an estimate. Defaults to `info@iitdeveloper.com` if not set.

---

### `NEXT_PUBLIC_CONTACT_EMAIL`

| Property | Value |
|---|---|
| **Required** | Optional |
| **Scope** | Public (browser) |
| **Default** | `info@iitdeveloper.com` |
| **Example** | `info@iitdeveloper.com` |

Public contact email address rendered in the UI (footer, contact page). This is safe to expose to the browser.

---

## Booking / Scheduling

### `NEXT_PUBLIC_BOOKING_URL`

| Property | Value |
|---|---|
| **Required** | ✅ Required for CTAs to work |
| **Scope** | Public (browser) |
| **Example** | `https://calendly.com/iitdeveloper/discovery` |

The URL opened when a visitor clicks **"Book a Discovery Call"** buttons. This CTA appears in the hero section, service pages, and the navigation bar.

If not set, the CTA falls back to `/contact` (the contact form page). Setting this is strongly recommended before launch.

**Supported services:**
- [Calendly](https://calendly.com) — most popular, free tier available
- [Cal.com](https://cal.com) — open-source alternative
- [Koalendar](https://koalendar.com) — lightweight option

**Where it's used:** `src/lib/config/site.ts` → `siteConfig.bookingUrl`

---

## SEO Verification

### `NEXT_PUBLIC_GOOGLE_VERIFICATION`

| Property | Value |
|---|---|
| **Required** | Optional (add after launch) |
| **Scope** | Public (browser meta tag) |
| **Example** | `abc123XYZverificationcode` |

Google Search Console domain verification code. When set, the app automatically adds `<meta name="google-site-verification" content="..." />` to all pages.

**How to get it:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → **URL prefix** → `https://iitdeveloper.com`
3. Choose **HTML tag** verification method
4. Copy the `content` attribute value (not the full tag)
5. Set it as this variable

---

### `NEXT_PUBLIC_BING_VERIFICATION`

| Property | Value |
|---|---|
| **Required** | Optional (add after launch) |
| **Scope** | Public (browser meta tag) |
| **Example** | `ABCDEF1234567890` |

Bing Webmaster Tools domain verification code. When set alongside `NEXT_PUBLIC_GOOGLE_VERIFICATION`, the app adds `<meta name="msvalidate.01" content="..." />`.

**How to get it:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site → **Manual verification → Meta tag**
3. Copy the `content` attribute value

---

## Build Variables

### `NEXT_TELEMETRY_DISABLED`

| Property | Value |
|---|---|
| **Required** | Optional |
| **Scope** | Build time |
| **Example** | `1` |

When set to `1`, disables Next.js anonymous telemetry collection during builds and development. Recommended for CI/CD pipelines and production builds.

---

## Variable Loading Order

Next.js loads environment variables in this priority order (highest to lowest):

1. `process.env` (system environment — set by hosting platform)
2. `.env.local` (local overrides — git-ignored)
3. `.env.development` or `.env.production` (environment-specific)
4. `.env` (base defaults)

In production on Vercel or Netlify, all variables come from the platform's environment variable store — no `.env` files are used on the server.

---

## Quick Reference: Production Checklist

Before deploying, confirm these are set in your hosting platform:

```
✅ NEXT_PUBLIC_APP_URL=https://iitdeveloper.com
✅ DATABASE_URL=postgres://...?sslmode=require
✅ SMTP_HOST=mail.iitdeveloper.com
✅ SMTP_PORT=465
✅ SMTP_SECURE=true
✅ SMTP_USER=info@iitdeveloper.com
✅ SMTP_PASS=<mailbox-password>
✅ FROM_EMAIL=info@iitdeveloper.com
✅ FROM_NAME=IIT Developer
✅ NEXT_PUBLIC_BOOKING_URL=https://calendly.com/...
⬜ NEXT_PUBLIC_GOOGLE_VERIFICATION= (add after Search Console setup)
⬜ NEXT_PUBLIC_BING_VERIFICATION=   (add after Bing Webmaster setup)
```

# Form & Email Setup

Complete documentation for the contact form, SMTP email system, templates, spam protection, testing, and troubleshooting.

---

## Table of Contents

1. [Contact Form Flow](#1-contact-form-flow)
2. [SMTP Configuration](#2-smtp-configuration)
3. [Email Templates](#3-email-templates)
4. [Rate Limiting & Spam Protection](#4-rate-limiting--spam-protection)
5. [How to Test Email Sending](#5-how-to-test-email-sending)
6. [Troubleshooting Common SMTP Errors](#6-troubleshooting-common-smtp-errors)
7. [How to Change SMTP Provider](#7-how-to-change-smtp-provider)

---

## 1. Contact Form Flow

When a visitor submits the contact form, the following sequence executes:

```
Browser Form Submit
       │
       ▼
POST /api/leads
(src/app/api/leads/route.ts)
       │
       ├── 1. Zod schema validation
       │       • name (required, min 1 char)
       │       • email (required, valid format)
       │       • phone (optional)
       │       • company (optional)
       │       • message (optional)
       │       • service_interest (optional)
       │       • budget_range (optional)
       │       • timeline (optional)
       │       └── returns 400 if validation fails
       │
       ├── 2. Database write (non-blocking)
       │       • Saves lead to `leads` table in Neon PostgreSQL
       │       • Captures: user_agent, IP address, source_url
       │       • If DB write fails: logs error, continues to email step
       │       └── (email sending is not blocked by DB failures)
       │
       ├── 3. Email dispatch (non-blocking, fire-and-forget)
       │       ├── sendContactConfirmation → submitter's inbox
       │       └── sendContactNotification → info@iitdeveloper.com
       │
       └── 4. Return 201 success to browser
               • Browser shows success toast via react-hot-toast
               • Form resets
```

### Key Design Decisions

**Non-blocking email dispatch:** Emails fire asynchronously (`Promise.all(...).catch(...)`). The API always returns `201 Created` to the browser, even if the email service is temporarily down. This prevents user-facing errors from transient SMTP issues.

**Non-blocking DB write:** The DB save is also wrapped in a try-catch. If the Neon database is unreachable, the email still sends. Lead data is preserved in email logs even if the DB is unavailable.

**Runtime:** The API route uses `export const runtime = 'nodejs'` because Nodemailer requires Node.js APIs (TCP sockets) that are not available in the Edge runtime.

---

## 2. SMTP Configuration

The email system uses [Nodemailer](https://nodemailer.com) v9 with a direct SMTP connection to the iitdeveloper.com mail server.

### Environment Variables

```bash
SMTP_HOST=mail.iitdeveloper.com   # cPanel mail server hostname
SMTP_PORT=465                      # SSL/TLS port
SMTP_SECURE=true                   # true = SSL from connection start
SMTP_USER=info@iitdeveloper.com   # Mailbox username (full email address)
SMTP_PASS=<mailbox-password>       # Mailbox password — keep secret
FROM_EMAIL=info@iitdeveloper.com  # From: address in outgoing emails
FROM_NAME=IIT Developer            # Display name in From: header
SALES_EMAIL=info@iitdeveloper.com # Internal notification recipient
```

### Transporter Code

The SMTP transporter is created in `src/lib/services/email-service.ts`:

```typescript
nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // mail.iitdeveloper.com
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false', // true = SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certs on cPanel
  },
});
```

### Port Reference

| Port | Protocol | Use when |
|------|----------|----------|
| `465` | SSL/TLS | cPanel/shared hosting — **current config** |
| `587` | STARTTLS | Gmail, SendGrid, Mailgun, Brevo |
| `25` | Plain | Legacy only; blocked by most cloud providers |

### Dev Mode Fallback

If `SMTP_HOST`, `SMTP_USER`, or `SMTP_PASS` are missing, the EmailService enters **dev mode**: it logs the email details to the console instead of sending. No emails are sent, no error is thrown. This allows the frontend to run locally without an SMTP server.

```
📧 [Dev Mode] Email would be sent: {
  to: 'test@example.com',
  subject: 'Thanks for contacting IIT Developer!',
  type: 'contact_form'
}
```

---

## 3. Email Templates

Both email templates are HTML-based, rendered inline in `src/lib/services/email-service.ts`. They use inline CSS for maximum email client compatibility.

### 3.1 Customer Confirmation Email

**Trigger:** Sent to the form submitter after every successful contact form submission.  
**From:** `IIT Developer <info@iitdeveloper.com>`  
**Subject:** `Thanks for contacting IIT Developer!`  
**Content:**

- Greeting with the submitter's name
- Confirmation that the message was received
- Summary of submitted details: name, email, phone (if provided), company (if provided), service interest, budget range
- Message excerpt (if provided)
- Response time commitment: "We'll get back to you within 1 business day"
- Links: Book a call, visit website
- Professional footer with company name and contact email

**Method:** `EmailService.sendContactConfirmation(data: ContactFormEmailData)`

### 3.2 Internal Lead Notification Email

**Trigger:** Sent to `SALES_EMAIL` (default: `info@iitdeveloper.com`) on every contact form submission.  
**From:** `IIT Developer <info@iitdeveloper.com>`  
**Subject:** `New Lead: <submitter name> — <service interest>`  
**Content:**

- Alert banner: "New Lead Received"
- Full lead details: name, email, phone, company, service interest, budget, timeline
- Full message text
- Submission metadata: timestamp, source URL, user agent
- Action links: Reply to lead, view in dashboard

**Method:** `EmailService.sendContactNotification(data: ContactFormEmailData)`

### 3.3 Estimate Email

**Trigger:** Sent when an estimate is generated via the `/estimate` page.  
**From:** `IIT Developer <info@iitdeveloper.com>`  
**Subject:** `Your Project Estimate - <PO number (first 8 chars)>`  
**Content:**

- Line-by-line itemised estimate table
- Subtotal, discount (if any), tax (if any), total
- Valid-until date
- Call-to-action: "Book a discovery call to discuss this estimate"
- Professional HTML table layout with INR currency formatting

**Method:** `EmailService.sendEstimate(estimate, customerEmail, customerName)`

---

### Modifying Email Templates

All templates are defined as private static methods in `src/lib/services/email-service.ts`. To modify a template:

1. Open `src/lib/services/email-service.ts`
2. Find the template method:
   - Customer confirmation: `generateContactConfirmationHTML()`
   - Lead notification: `generateContactNotificationHTML()`
   - Estimate: `generateEstimateEmailHTML()`
3. Edit the HTML string (use inline CSS — email clients ignore `<style>` blocks)
4. Test using the method described in [Section 5](#5-how-to-test-email-sending)

> [!TIP]
> Use [Litmus](https://www.litmus.com) or [Email on Acid](https://www.emailonacid.com) to preview templates across email clients before deploying changes.

---

## 4. Rate Limiting & Spam Protection

### Honeypot Field

The contact form includes a hidden honeypot field that is:
- Invisible to human visitors (hidden via CSS)
- Positioned off-screen so screen readers skip it
- Filled automatically by bots that parse the DOM

When the API receives a submission with the honeypot field filled, it returns `200 OK` without processing (silent rejection — does not educate bots about the protection).

### Rate Limiting

> [!WARNING]
> The current implementation does not include server-side rate limiting on `/api/leads`. This should be added before launch to prevent abuse.

**Recommended approach — add to `src/app/api/leads/route.ts`:**

```typescript
import { NextRequest } from 'next/server';

// Simple in-memory rate limiter (use Redis/Upstash for multi-instance deployments)
const submissionMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;        // max submissions
const WINDOW_MS = 60 * 1000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = submissionMap.get(ip);

  if (!record || now > record.resetAt) {
    submissionMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;

  record.count++;
  return false;
}

// In POST handler:
const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
if (isRateLimited(ip)) {
  return NextResponse.json(
    { success: false, error: 'Too many requests. Please try again later.' },
    { status: 429 }
  );
}
```

For a production-grade solution with persistent rate limiting across serverless instances, use [Upstash Redis](https://upstash.com) with the `@upstash/ratelimit` package.

### Additional Spam Protections

| Protection | Status | Notes |
|---|---|---|
| Honeypot field | ✅ Implemented | Silent rejection |
| Zod validation | ✅ Implemented | Rejects malformed data |
| Server-side rate limiting | ⚠️ Not yet | Add before launch |
| reCAPTCHA v3 | ⬜ Optional | Add if spam continues post-launch |
| Cloudflare Bot Fight Mode | ⬜ Recommended | Enable if using Cloudflare |

---

## 5. How to Test Email Sending

### Method A: Test via the Live Contact Form

1. Deploy to a preview URL (Vercel preview or `npm run dev` with SMTP vars set)
2. Navigate to `/contact`
3. Fill in the form with a real email address you control
4. Submit
5. Check:
   - The submitter's inbox for the confirmation email
   - `info@iitdeveloper.com` for the lead notification email
   - The Neon console (Neon dashboard → Tables → `leads`) for the saved record

### Method B: Test via cURL

```bash
curl -X POST https://iitdeveloper.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@example.com",
    "message": "This is a test submission from cURL",
    "service_interest": "Website Development",
    "source": "contact-form"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Message received! We will get back to you shortly.",
  "data": { "id": "uuid-here", "email": "your-test-email@example.com" }
}
```

### Method C: Test SMTP Connection Directly

```bash
# Using swaks (Swiss Army Knife for SMTP)
# Install: brew install swaks

swaks \
  --to test@example.com \
  --from info@iitdeveloper.com \
  --server mail.iitdeveloper.com \
  --port 465 \
  --tls \
  --auth-user info@iitdeveloper.com \
  --auth-password 'your-password' \
  --h-Subject "SMTP Test" \
  --body "Testing SMTP connection from iitdeveloper.com"
```

If `swaks` returns `=== Connected to mail.iitdeveloper.com` and then `<** 250 Message sent`, SMTP is working correctly.

### Method D: Check Email Logs in DB

```sql
-- Run in Neon SQL editor
SELECT recipient_email, subject, email_type, status, created_at, error_message
FROM email_logs
ORDER BY created_at DESC
LIMIT 20;
```

---

## 6. Troubleshooting Common SMTP Errors

### Error: `ECONNREFUSED` or `ETIMEDOUT`

**Cause:** Cannot reach the SMTP server.

**Fixes:**
1. Verify `SMTP_HOST=mail.iitdeveloper.com` is spelled correctly
2. Verify `SMTP_PORT=465` is correct
3. Check if the hosting provider's firewall blocks outbound connections on port 465 (common on Vercel — test with port 587 and STARTTLS)
4. Try temporarily setting `SMTP_HOST` to the server's IP address to rule out DNS issues

> [!WARNING]
> Vercel's serverless functions can sometimes have outbound connection restrictions. If emails work locally but not on Vercel, consider switching to a transactional email API (Resend, Brevo, Mailgun) — see [Section 7](#7-how-to-change-smtp-provider).

---

### Error: `Invalid login` or `Authentication failed`

**Cause:** Wrong username or password.

**Fixes:**
1. Log in to cPanel → Email Accounts → verify the mailbox password
2. Confirm `SMTP_USER` is the **full email address** (`info@iitdeveloper.com`), not just the username
3. Check if the cPanel account has 2FA enabled (SMTP does not support 2FA — create an app password if available)
4. Try resetting the mailbox password in cPanel → Email Accounts

---

### Error: `CERT_HAS_EXPIRED` or `UNABLE_TO_VERIFY_LEAF_SIGNATURE`

**Cause:** SSL certificate on the mail server is expired or self-signed.

**Fix:** The transporter already has `tls: { rejectUnauthorized: false }` which bypasses certificate validation for shared hosting. If this error still occurs, verify the option is set correctly in `email-service.ts`.

---

### Error: `Sender address rejected` or `550 5.7.1`

**Cause:** The `FROM_EMAIL` address is rejected by the server because it does not match the authenticated user.

**Fix:** Ensure `FROM_EMAIL` and `SMTP_USER` are the same email address (`info@iitdeveloper.com`). Many cPanel mail servers enforce this.

---

### Error: `Message not arriving in inbox`

**Checklist:**
1. Check the spam/junk folder — cPanel mail often triggers spam filters
2. Verify the domain has SPF, DKIM, and DMARC DNS records configured (check in cPanel → Email Deliverability)
3. Run the domain through [Mail Tester](https://www.mail-tester.com) to get a spam score
4. Verify the `email_logs` table — if `status = 'sent'` but email is missing, the issue is delivery, not sending

---

### Emails Work Locally but Not in Production

**Most likely causes:**
1. Environment variables are not set in the hosting platform (check the platform's env var UI)
2. Vercel/Netlify is blocking outbound TCP on port 465 (try port 587 + STARTTLS)
3. The production deployment does not have the `nodejs` runtime specified — check `export const runtime = 'nodejs'` is present in `route.ts`

---

## 7. How to Change SMTP Provider

If you want to switch from the cPanel mail server to a transactional email service (Resend, Mailgun, Brevo, SendGrid), follow these steps:

### Option A: Switch to Resend (recommended transactional service)

Resend has a generous free tier and a clean API. It also provides a Nodemailer compatibility layer.

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (`iitdeveloper.com`) by adding DNS records
3. Create an API key
4. Install the SDK: `npm install resend`

**Update `email-service.ts`:**

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace createTransport + sendMail with:
const data = await resend.emails.send({
  from: 'IIT Developer <info@iitdeveloper.com>',
  to: options.to,
  subject: options.subject,
  html: options.html,
});
```

**Update `.env.local`:**
```bash
RESEND_API_KEY=re_your_api_key
# Remove SMTP_* variables
```

### Option B: Switch to Brevo (formerly Sendinblue)

Use SMTP relay through Brevo (free up to 300 emails/day):

```bash
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false       # Brevo uses STARTTLS on 587
SMTP_USER=your-brevo-login@email.com
SMTP_PASS=your-brevo-smtp-key  # Not your account password — use the SMTP key
```

### Option C: Keep Nodemailer, Change Host

Update only the environment variables — no code changes required:

```bash
SMTP_HOST=<new-host>
SMTP_PORT=<new-port>
SMTP_SECURE=<true|false>
SMTP_USER=<new-user>
SMTP_PASS=<new-password>
```

### Verifying the Change

After updating, test using Method A or B from [Section 5](#5-how-to-test-email-sending). Confirm both the confirmation email and the lead notification email arrive correctly.

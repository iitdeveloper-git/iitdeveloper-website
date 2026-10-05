# IITDeveloper Client Portal & WhatsApp Automation Engine
## Master Architectural Blueprint & Implementation Plan

- **Author / Architect:** IITDeveloper Engineering Team
- **Target Repository:** `iitdeveloper-website` (`portal.iitdeveloper.com`)
- **Status:** Approved for Implementation (v1.0.0)
- **Deployment Target:** OVH VPS `149.56.101.2` (Docker + Caddy + Keycloak SSO + FastAPI + PostgreSQL + Next.js)

---

## 1. Executive Summary & Business Vision

IITDeveloper is evolving from a traditional web agency into an **Enterprise Managed IT & SaaS Partner**. 

Currently, client inquiries, invoice reminders, and renewal tracking happen over manual WhatsApp calls and scattered spreadsheets. This project introduces a unified, multi-tenant **Client Portal (`portal.iitdeveloper.com`)** integrated with an **Intelligent WhatsApp Automation Engine**:

1. **Multi-Tenant Client Portal:** Clients (e.g., Knowledge King Education, LegalSujhav, FlightForge) log in via **IITD IAM Keycloak SSO** to view real-time leads, track website status, download GST invoices, and pay pending bills online via Razorpay/UPI.
2. **WhatsApp Automation Engine:** 
   - Instant lead dispatch to client leadership (`+91 ...`) within 5 seconds of form submission.
   - Automated welcome message & PDF course brochure sent directly to prospective students/customers.
   - Automated billing and renewal reminders (7 days and 1 day before expiration).
3. **Hybrid Permanent Record:** Leads are stored securely in a central PostgreSQL database while simultaneously syncing in real-time to each client's dedicated **Google Sheet**.

---

## 2. System Architecture & Flow Diagram

```
                            [ STUDENT / PROSPECT ]
                                     │ (Submits Form on Client Website)
                                     ▼
                   ┌───────────────────────────────────┐
                   │  Client Website (e.g. kke/react)  │
                   │  POST /api/v1/leads/ingest        │
                   └─────────────────┬─────────────────┘
                                     │
                                     ▼
        ┌─────────────────────────────────────────────────────────────┐
        │          IITDEVELOPER CORE LEAD & BILLING BACKEND           │
        │               (FastAPI on VPS 149.56.101.2)                 │
        └──────┬─────────────────────┬─────────────────────┬──────────┘
               │                     │                     │
               ▼                     ▼                     ▼
        [ PostgreSQL DB ]    [ Google Sheets Sync ]   [ WhatsApp Automation ]
        • Central Ledger     • Client's private      • Meta Cloud API /
        • Multi-tenant data    Google Drive Sheet      Self-Hosted Gateway
        • Invoice records    • Zero-tech access      • Instant Lead Alert
               │                                     • Student Auto-brochure
               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      CLIENT SELF-SERVICE PORTAL                        │
│            portal.iitdeveloper.com (Next.js 14 App Router)             │
│                                                                        │
│  [1. Inbound Leads]  [2. Invoices & Bills]  [3. Services]  [4. Tickets]│
│  • Live table        • Pay via UPI/Razorpay • Domain expiry• Request   │
│  • Export Excel      • Download GST PDF     • SSL / Uptime • edits     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema Extensions (PostgreSQL)

Extending existing `STEP_12_DATABASE_SCHEMA.md` with multi-tenant client and billing tables:

```sql
-- 1. Clients / Tenant Directory
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,                -- e.g. 'knowledgekingedu'
    company_name VARCHAR(255) NOT NULL,              -- 'Knowledge King Education'
    primary_contact_name VARCHAR(128) NOT NULL,      -- 'ER. Mukhtar Ansari (MR Sir)'
    primary_phone VARCHAR(20) NOT NULL,              -- '+917388591234'
    whatsapp_alert_numbers TEXT[] NOT NULL,          -- ARRAY['+917388591234', '+917307265339']
    official_email VARCHAR(255) NOT NULL,            -- 'info.knowledgekingedu@gmail.com'
    domain_name VARCHAR(255) NOT NULL,               -- 'knowledgekingedu.com'
    google_sheet_webhook_url TEXT,                   -- Google Apps Script URL
    keycloak_org_id VARCHAR(128),                    -- IITD IAM Realm / Org UUID
    status VARCHAR(32) DEFAULT 'active',             -- 'active', 'suspended', 'trial'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enhanced Inbound Leads Table
CREATE TABLE client_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    student_name VARCHAR(128) NOT NULL,
    mobile_number VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    target_course VARCHAR(128),
    query_message TEXT,
    source_url VARCHAR(255),
    ip_address VARCHAR(45),
    status VARCHAR(32) DEFAULT 'NEW',                 -- 'NEW', 'CONTACTED', 'ADMITTED', 'LOST'
    internal_notes TEXT,
    whatsapp_notified BOOLEAN DEFAULT FALSE,
    sheet_synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Invoices & Billing Table
CREATE TABLE client_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(64) UNIQUE NOT NULL,      -- 'IITD-INV-2026-104'
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,                     -- 'Annual Hosting, SSL & AMC Renewal'
    description TEXT,
    subtotal_inr NUMERIC(10, 2) NOT NULL,            -- 15000.00
    gst_rate_percent NUMERIC(5, 2) DEFAULT 18.00,    -- 18.00%
    gst_amount_inr NUMERIC(10, 2) NOT NULL,          -- 2700.00
    total_amount_inr NUMERIC(10, 2) NOT NULL,        -- 17700.00
    discount_amount_inr NUMERIC(10, 2) DEFAULT 0.00,
    status VARCHAR(32) DEFAULT 'UNPAID',             -- 'UNPAID', 'PAID', 'OVERDUE', 'CANCELLED'
    due_date DATE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    razorpay_order_id VARCHAR(128),
    razorpay_payment_id VARCHAR(128),
    pdf_invoice_url TEXT,                            -- S3 / Local Static PDF URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Managed Services & Renewals Tracking
CREATE TABLE client_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    service_type VARCHAR(64) NOT NULL,               -- 'DOMAIN', 'HOSTING', 'AMC', 'SEO_MARKETING'
    domain_or_service_name VARCHAR(255) NOT NULL,    -- 'knowledgekingedu.com'
    registrar_or_provider VARCHAR(128),              -- 'GoDaddy', 'OVH VPS'
    start_date DATE NOT NULL,
    renewal_due_date DATE NOT NULL,
    annual_cost_inr NUMERIC(10, 2) NOT NULL,
    auto_reminder_enabled BOOLEAN DEFAULT TRUE,
    status VARCHAR(32) DEFAULT 'ACTIVE'              -- 'ACTIVE', 'EXPIRING_SOON', 'EXPIRED'
);

-- 5. WhatsApp Automation Message Logs
CREATE TABLE whatsapp_message_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id),
    recipient_phone VARCHAR(20) NOT NULL,
    message_type VARCHAR(32) NOT NULL,               -- 'LEAD_ALERT', 'STUDENT_WELCOME', 'INVOICE_REMINDER'
    template_name VARCHAR(64),
    payload JSONB,
    status VARCHAR(32) DEFAULT 'QUEUED',             -- 'SENT', 'DELIVERED', 'FAILED'
    error_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. WhatsApp Automation Engine Specification

### Trigger 1: Real-time Lead Alert to Client Leadership
- **Event:** Inbound lead arrives on website.
- **Recipient:** Client's leadership numbers (e.g., `+91 7388591234`).
- **Template Payload:**
```text
🔔 *NEW ADMISSION LEAD — Knowledge King Education*
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Student:* {{student_name}}
📱 *Mobile:* {{mobile_number}}
🎓 *Course:* {{target_course}}
💬 *Message:* {{query_message}}
⏰ *Received:* {{timestamp}}
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *Direct Call:* tel:{{mobile_number}}
👉 *Open Portal:* https://portal.iitdeveloper.com/leads/{{lead_id}}
```

### Trigger 2: Instant Welcome & Course Brochure to Student
- **Event:** Student enters phone number and submits.
- **Recipient:** Student's mobile number (`+91 ...`).
- **Template Payload:**
```text
Hello {{student_name}}! 👋

Thank you for contacting *Knowledge King Education, Wakilganj (Deoria)*.
We have received your admission inquiry for *{{target_course}}*.

📄 We have attached our *Official 2026-27 Prospectus & Fee Structure*.
Our senior counselor will connect with you within 24 hours.

📞 For urgent guidance, call our helpline: +91 7388591234
🌐 Website: https://knowledgekingedu.com
```

### Trigger 3: Automated Invoice & Renewal Alert
- **Cron Schedule:** Daily at 10:00 AM IST.
- **Rules:**
  - `T-15 Days`: Friendly reminder of upcoming domain/hosting renewal.
  - `T-3 Days`: Urgent reminder with direct UPI / Razorpay payment link.
  - `T-0 Day`: Invoice payment confirmation with PDF receipt attachment.
- **Template Payload:**
```text
Dear {{company_name}},

Your invoice *#{{invoice_number}}* for *{{title}}* (Amount: ₹{{total_amount}}) is due on *{{due_date}}*.

💳 *Quick Pay Online (UPI / NetBanking / Cards):*
👉 {{payment_link}}

Thank you for choosing IITDeveloper as your technology partner!
```

---

## 5. Client Portal (`portal.iitdeveloper.com`) UI / UX Modules

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **IITD IAM Keycloak SSO**:

### Module 1: Executive Dashboard (`/`)
- Summary KPI Cards: **Total Leads (Month)**, **Pending Invoices**, **Active Services**, **Server Uptime (100%)**.
- Recent Activity Feed (Recent leads, recent invoice payments).

### Module 2: Inbound Leads Manager (`/leads`)
- Responsive data table with instant search and status chips (`New`, `Contacted`, `Admitted`).
- Lead details drawer: View student message, call button, add counselor notes.
- **One-click "Export to Excel / CSV"** for sales/calling teams.

### Module 3: Billing & Invoices (`/invoices`)
- List of all invoices: `Paid` vs `Pending Payment`.
- Instant **"Pay Now"** button launching Razorpay Checkout.
- **"Download Official GST Tax Invoice"** button (vector PDF generation).

### Module 4: Managed Services & Renewals (`/services`)
- Cards for each managed asset:
  - `knowledgekingedu.com` — GoDaddy Domain (Expires in 280 days).
  - High-Speed Cloud VPS — OVH Docker Container (Healthy / 99.98% Uptime).
  - SSL Certificate — Caddy Auto-Renewal (Active).

### Module 5: Helpdesk & Edit Requests (`/tickets`)
- Click **"Request Website Update"**.
- Upload new banner image, text revision, or faculty change.
- Track ticket progress: `Submitted` ➔ `In Progress` ➔ `Deployed`.

---

## 6. Implementation Phasing & Milestones

| Phase | Duration | Deliverables | Success Metric |
| :--- | :--- | :--- | :--- |
| **Phase 1: Ingestion API & WhatsApp Dispatch** | Week 1 | FastAPI `POST /v1/leads/ingest` + Meta Cloud API / Baileys Gateway + Google Sheets sync | Submissions trigger instant WhatsApp lead alert in < 3s |
| **Phase 2: Billing & Invoicing Engine** | Week 2 | `client_invoices` DB + Razorpay payment links + PDF invoice generator + WhatsApp payment alerts | Automated UPI payments update invoice status to `PAID` |
| **Phase 3: Next.js Client Portal UI** | Week 3 | `portal.iitdeveloper.com` dashboard + Keycloak SSO login + Leads table with Excel export | Client logs in and manages their own leads & invoices |
| **Phase 4: Admin Super-Console** | Week 4 | IITDeveloper admin panel to onboard new clients, issue invoices, and monitor global analytics | Multi-client onboarding in < 2 minutes |

---

## 7. Immediate Next Steps

1. **Enable Ingestion Webhook in Client Apps**: Update `VITE_LEADS_WEBHOOK_URL` in `knowledgekingedu/react-app/.env` to point to the central leads ingestion endpoint.
2. **Setup WhatsApp Gateway on VPS `149.56.101.2`**: Deploy Docker container for WhatsApp Business API / Evolution API.
3. **Deploy Portal Route in `iitdeveloper-website`**: Wire Next.js `/portal` route protected by IITD IAM authentication.

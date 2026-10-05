# IITDeveloper Client Portal & OpsPilot Integration
## Complete Architecture, RBAC Specification & Implementation Guide

- **Target Route:** `https://iitdeveloper.com/portal`
- **Codebase:** `iitdeveloper-website` (`frontend/src/app/portal/`)
- **Backend Infrastructure:** OVH VPS `149.56.101.2` (Next.js 14 + FastAPI + PostgreSQL + Docker)
- **Monitoring Integration:** OpsPilot API (`src/opspilot/web/api.py`)
- **Status:** Approved for Implementation (v3.0 - Unified Architecture)

---

## 1. Architectural Blueprint

Instead of deploying a separate application or configuring complex multi-tenant subdomains, the entire Client Hub lives directly on your flagship website at **`iitdeveloper.com/portal`**.

```
                           [ Student Submits Form ]
                         (e.g., knowledgekingedu.com)
                                      │
                                      ▼
                       POST /api/v1/leads/ingest
                                      │
               ┌──────────────────────┼──────────────────────┐
               ▼                      ▼                      ▼
        [ PostgreSQL DB ]     [ Google Sheets ]      [ WhatsApp API ]
        • Permanent record    • Row appended to       • Instant alert to
        • Tagged by 'client'    client's sheet          client leadership
               │
               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   iitdeveloper.com/portal (Next.js 14)                 │
│                                                                        │
│   ┌────────────────────────────────┐ ┌──────────────────────────────┐  │
│   │         Role: Client           │ │         Role: Admin          │  │
│   │  (e.g. Knowledge King Team)    │ │      (Ravi / IITDeveloper)   │  │
│   ├────────────────────────────────┤ ├──────────────────────────────┤  │
│   │ • View own student leads       │ │ • Client switcher dropdown   │  │
│   │ • Download Excel / CSV export  │ │ • View leads across all apps │  │
│   │ • Pay bills via UPI / Razorpay │ │ • Create & dispatch invoices │  │
│   │ • Download GST Tax Invoices    │ │ • Full OpsPilot server stats │  │
│   │ • Website Uptime Badge         │ │ • Restart Docker containers  │  │
│   └────────────────────────────────┘ └──────────────────────────────┘  │
│                                   │                                    │
│                                   ▼ (Internal API Proxy)               │
│                  [ OpsPilot API on VPS 149.56.101.2 ]                  │
│                  • Probes SSL certificates & domain expiry             │
│                  • Checks Docker container health                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Role-Based Access Control (RBAC) Specification

Authentication uses simple JWT session tokens (or IITD IAM Keycloak). The token payload carries the user's role and client scope:

```json
{
  "user_id": "usr_101",
  "name": "ER. Mukhtar Ansari",
  "email": "info.knowledgekingedu@gmail.com",
  "role": "client_admin",
  "client": "knowledgekingedu"
}
```

### The 4 Defined Roles:

| Role | Target User | Capabilities & Permissions |
| :--- | :--- | :--- |
| **`platform_admin`** | **Ravi / Founder** | **Full System Access:** Switch between any client, view all student leads, create/send invoices, view full OpsPilot infrastructure metrics, trigger Docker container restarts. |
| **`platform_viewer`** | **IITD Internal Support** | **Global View-Only:** View leads and OpsPilot uptime across all clients. Cannot delete data, issue invoices, or restart servers. |
| **`client_admin`** | **Client Business Owner** *(e.g. MR Sir)* | **Client Management:** Scoped strictly to `client = 'knowledgekingedu'`. View and export all student leads, pay invoices via UPI/Cards, download official GST PDF receipts, see website uptime status. |
| **`client_staff`** | **Client Front-Desk / Telecallers** | **Counselor Scoped:** Can view student leads and add follow-up notes *(e.g., "Called, will visit campus")*. **Billing, invoices, and service costs are completely hidden.** |

---

## 3. Database Schema (PostgreSQL)

Single database, clean relationships, zero multi-tenancy overhead:

```sql
-- 1. Clients Directory
CREATE TABLE portal_clients (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,               -- 'knowledgekingedu', 'legalsujhav'
    name VARCHAR(255) NOT NULL,                     -- 'Knowledge King Education'
    primary_contact VARCHAR(128) NOT NULL,          -- 'ER. MR Sir'
    phone VARCHAR(20) NOT NULL,                     -- '+917388591234'
    whatsapp_numbers TEXT[] NOT NULL,               -- ARRAY['+917388591234', '+917307265339']
    official_email VARCHAR(255) NOT NULL,            -- 'info.knowledgekingedu@gmail.com'
    domain_name VARCHAR(255) NOT NULL,              -- 'knowledgekingedu.com'
    google_sheet_url TEXT,                          -- Client's Google Sheet Webhook URL
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users & Portal Login Accounts
CREATE TABLE portal_users (
    id SERIAL PRIMARY KEY,
    client_slug VARCHAR(64) REFERENCES portal_clients(slug) ON DELETE CASCADE, -- NULL for platform admins
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL,                      -- 'platform_admin', 'platform_viewer', 'client_admin', 'client_staff'
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Inbound Student & Customer Leads
CREATE TABLE portal_leads (
    id SERIAL PRIMARY KEY,
    client_slug VARCHAR(64) NOT NULL REFERENCES portal_clients(slug) ON DELETE CASCADE,
    student_name VARCHAR(128) NOT NULL,
    mobile_number VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    target_course VARCHAR(128),
    query_message TEXT,
    status VARCHAR(32) DEFAULT 'NEW',                -- 'NEW', 'CONTACTED', 'ADMITTED', 'LOST'
    counselor_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Invoices, GST Bills & Renewals
CREATE TABLE portal_invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(64) UNIQUE NOT NULL,     -- 'IITD-INV-2026-101'
    client_slug VARCHAR(64) NOT NULL REFERENCES portal_clients(slug) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,                    -- 'Annual Hosting, Domain & Maintenance Renewal'
    amount_inr NUMERIC(10, 2) NOT NULL,             -- Total INR
    gst_rate_percent NUMERIC(5, 2) DEFAULT 18.00,
    status VARCHAR(32) DEFAULT 'UNPAID',            -- 'UNPAID', 'PAID', 'OVERDUE'
    due_date DATE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    razorpay_order_id VARCHAR(128),
    razorpay_payment_id VARCHAR(128),
    pdf_url TEXT,                                   -- URL to download GST PDF
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. OpsPilot Integration Architecture

OpsPilot is **NOT** directly accessed by clients. Instead, the Next.js portal calls OpsPilot’s REST API over the local Docker network using a secure internal API key:

```
[ Next.js API Route: /api/portal/services/health ]
                         │
                         ▼ (Internal HTTP GET)
        http://149.56.101.2:8000/api/domains/renewals
        Header: Authorization: Bearer <OPSPILOT_INTERNAL_KEY>
                         │
                         ▼
             [ OpsPilot Returns JSON ]
  {
    "domain": "knowledgekingedu.com",
    "ssl_status": "VALID",
    "ssl_days_left": 84,
    "uptime_percentage": 99.98,
    "container_status": "RUNNING"
  }
                         │
                         ▼
[ Portal renders friendly status card for Client ]
```

### What the Client Sees:
- 🟢 **Website Status:** Live & Operational (99.98% Uptime)
- 🔒 **Security:** SSL Certificate Active (Auto-renewed by Caddy)
- ⏳ **Domain Renewal:** Renews in 280 Days (GoDaddy)

---

## 5. WhatsApp Automation Engine

### Trigger 1: Real-Time Lead Alert to Client Leadership
- **Trigger:** Inbound form submission on client website.
- **Recipient:** Client's WhatsApp (`+91 7388591234`).
- **Template:**
```text
🔔 *NEW STUDENT INQUIRY — Knowledge King Education*
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Student:* Rahul Sharma
📱 *Mobile:* +91 9876543210
🎓 *Course:* 12th Board / JEE Prep
💬 *Query:* "Please share fee structure & hostel details"
⏰ *Received:* Just now (via Website)
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *Click to Call:* tel:+919876543210
👉 *View in Portal:* https://iitdeveloper.com/portal/leads
```

### Trigger 2: Instant Welcome & Course Brochure to Student
- **Trigger:** Immediate auto-responder.
- **Recipient:** Student's mobile number.
- **Payload:** Welcomes student and attaches the official PDF brochure.

### Trigger 3: Automated Invoice & Renewal Reminders
- **Trigger:** 10 days and 3 days before renewal due date.
- **Message:** Contains invoice summary and direct one-click UPI payment link.

---

## 6. Page Map in `iitdeveloper-website`

All portal pages are organized under `frontend/src/app/portal/`:

```
frontend/src/app/portal/
├── layout.tsx                # Authenticated portal shell (Sidebar, User Avatar, Client Switcher)
├── page.tsx                  # Dashboard Overview (KPIs, Recent Leads, Next Invoices)
├── login/
│   └── page.tsx              # Clean login screen (Email & Password / IITD IAM SSO)
├── leads/
│   └── page.tsx              # Live student leads table + Search + "Export to Excel"
├── invoices/
│   ├── page.tsx              # Invoice listing (Paid vs Unpaid) + "Pay Now via UPI"
│   └── [id]/page.tsx         # Printable / downloadable GST Tax Invoice view
└── services/
    └── page.tsx              # Managed services, Domain & SSL health (OpsPilot powered)
```

---

## 7. Implementation Roadmap & Milestones

| Milestone | Scope | Duration |
| :--- | :--- | :--- |
| **Milestone 1: Database & Ingestion API** | Run PostgreSQL migration on VPS `149.56.101.2`. Deploy `POST /api/v1/leads/ingest` with WhatsApp & Google Sheets dispatch. | 2 Days |
| **Milestone 2: Client Website Integration** | Connect `knowledgekingedu`, `legalsujhav`, and other client websites to the new ingestion endpoint. | 1 Day |
| **Milestone 3: Portal UI & RBAC** | Build `frontend/src/app/portal/` with Next.js App Router, Tailwind CSS, role guards, and Excel export. | 3 Days |
| **Milestone 4: OpsPilot & Invoicing Hookup** | Connect OpsPilot health API proxy and Razorpay checkout for online bill payments. | 2 Days |
| **Milestone 5: Production Launch** | Deploy live to `https://iitdeveloper.com/portal`. Onboard Knowledge King Education credentials. | 1 Day |

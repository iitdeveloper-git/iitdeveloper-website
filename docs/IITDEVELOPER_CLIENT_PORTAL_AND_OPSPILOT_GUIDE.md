# IITDeveloper Client Portal, Sendrin, Growixa & OpsPilot Master Guide
## The Unified Product Ecosystem & Implementation Architecture

- **Portal URL:** `https://iitdeveloper.com/portal`
- **Codebase:** `iitdeveloper-website` (`frontend/src/app/portal/`)
- **Backend Infrastructure:** OVH VPS `149.56.101.2` (Next.js 14 + FastAPI + PostgreSQL + Docker)
- **Ecosystem Members:**
  - 🔑 **IITD IAM:** Central Identity & SSO (`iam.iitdeveloper.com`)
  - 🖥️ **IITDeveloper Portal:** Client Hub & Billing (`iitdeveloper.com/portal`)
  - 📨 **Sendrin (GNS):** Transactional WhatsApp, SMS & Email Delivery Engine (`api.sendrin.com`)
  - 🚀 **Growixa:** Audience CRM, Broadcast Campaigns & Retargeting (`growixa.iitdeveloper.com`)
  - 🛡️ **OpsPilot:** Infrastructure, Docker & Domain Renewal Watchdog (`opspilot`)
- **Status:** Approved for Production Architecture (v4.0 - Master Ecosystem Edition)

---

## 1. The Master Ecosystem Flywheel

Google Sheets has been **completely eliminated**. Data lives in your self-hosted PostgreSQL database, feeds the Portal UI, triggers real-time transactional alerts via **Sendrin**, and automatically builds the client's marketing list inside **Growixa**:

```
                       [ Student / Prospect Submits Form ]
                          (e.g., knowledgekingedu.com)
                                       │
                                       ▼
                       POST /api/v1/leads/ingest
                                       │
                ┌──────────────────────┼──────────────────────┐
                ▼                      ▼                      ▼
        [ PostgreSQL DB ]     [ SENDRIN ENGINE ]      [ GROWIXA CRM ]
        • Permanent record    • Calls Sendrin API     • Lead pushed to Growixa
        • Live in Portal UI   • Instant WhatsApp        Audience Contacts
        • Search & Export       to Client Leader:     • Auto-tagged:
                                "New Lead! Call Now"    `course: JEE`, `client: kke`
                              • Auto-welcome PDF to   • Client can run WhatsApp
                                student phone           Admission Broadcasts!
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│             https://iitdeveloper.com/portal (Next.js 14)               │
│                                                                        │
│   ┌────────────────────────────────┐ ┌──────────────────────────────┐  │
│   │         Role: Client           │ │         Role: Admin          │  │
│   │  (e.g. Knowledge King Team)    │ │    (Ravi / IITDeveloper)     │  │
│   ├────────────────────────────────┤ ├──────────────────────────────┤  │
│   │ • View & search student leads  │ │ • Client switcher dropdown   │  │
│   │ • One-click "Download to Excel"│ │ • View leads across all apps │  │
│   │ • Pay bills via UPI / Razorpay │ │ • Create & send new invoices │  │
│   │ • Download official GST PDFs   │ │ • View OpsPilot server health│  │
│   │ • Website Uptime Status Badge  │ │ • Restart Docker containers  │  │
│   │ • Launch Growixa Campaigns     │ │ • Track global revenue       │  │
│   └────────────────────────────────┘ └──────────────────────────────┘  │
│                                   │                                    │
│                                   ▼ (Internal Backend Proxy)           │
│                  [ OpsPilot API on VPS 149.56.101.2 ]                  │
│                  • Probes SSL certificates & domain expiry             │
│                  • Checks Docker container health                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Role-Based Access Control (RBAC) Specification

No complex multi-tenancy subdomains are used. The portal lives on `iitdeveloper.com/portal`. User sessions are authenticated via JWT or IITD IAM Keycloak SSO with 4 distinct roles:

```json
{
  "user_id": "usr_9921",
  "name": "ER. Mukhtar Ansari",
  "email": "info.knowledgekingedu@gmail.com",
  "role": "client_admin",
  "client": "knowledgekingedu"
}
```

### The 4 Defined Roles:

| Role | Target User | Capabilities & Permissions |
| :--- | :--- | :--- |
| **`platform_admin`** | **Ravi / Founder** | **Full System Access:** Client switcher dropdown to manage any client. View all leads across all companies, create and dispatch invoices, view full OpsPilot infrastructure metrics, trigger Docker container restarts, and manage Sendrin/Growixa API keys. |
| **`platform_viewer`** | **IITD Internal Team** | **Global View-Only:** View lead flow, check OpsPilot server health, and view invoice status across all clients. Cannot delete records, issue bills, or restart containers. |
| **`client_admin`** | **Client Business Owner** *(e.g. MR Sir)* | **Client Management:** Scoped strictly to `client = 'knowledgekingedu'`. View and search all their student leads, download Excel/CSV exports, pay invoices via UPI/Razorpay, download GST PDF tax receipts, see website uptime status, and access their Growixa marketing audience. |
| **`client_staff`** | **Counselors / Telecallers** | **Counselor Scoped:** Can view student leads and add call notes *(e.g., "Interested in JEE, follow up Tuesday")*. **Billing, invoices, service costs, and server status are completely hidden.** |

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
    whatsapp_alert_numbers TEXT[] NOT NULL,         -- ARRAY['+917388591234', '+917307265339']
    official_email VARCHAR(255) NOT NULL,            -- 'info.knowledgekingedu@gmail.com'
    domain_name VARCHAR(255) NOT NULL,              -- 'knowledgekingedu.com'
    growixa_audience_id VARCHAR(64),                -- Linked Audience List in Growixa
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users & Login Accounts
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
    sendrin_notified BOOLEAN DEFAULT FALSE,
    growixa_synced BOOLEAN DEFAULT FALSE,
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
    pdf_url TEXT,                                   -- Direct PDF download URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. Sendrin (GNS) Notification Engine Integration

**Sendrin** (`ett_gns`) acts as the high-speed transactional message delivery gateway for WhatsApp, SMS, and Email.

### Implementation in Ingestion API:
```typescript
import { SendrinClient } from '@sendrin/sdk';

const sendrin = new SendrinClient({
  apiKey: process.env.SENDRIN_API_KEY,
  endpoint: 'https://api.sendrin.com/v1',
});

// Trigger 1: Real-time WhatsApp Alert to Client Leadership
await sendrin.messages.send({
  channel: 'whatsapp',
  to: client.whatsapp_alert_numbers[0], // e.g. '+917388591234'
  template: 'student_lead_alert',
  variables: {
    student_name: lead.student_name,
    mobile: lead.mobile_number,
    course: lead.target_course || 'General Admission',
    query: lead.query_message || 'No query specified',
    lead_id: lead.id,
  },
});

// Trigger 2: Welcome Message + PDF Prospectus to Student Phone
await sendrin.messages.send({
  channel: 'whatsapp',
  to: lead.mobile_number,
  template: 'student_welcome_brochure',
  variables: {
    student_name: lead.student_name,
    institute_name: client.name,
    brochure_pdf_url: `https://${client.domain_name}/assets/docs/prospectus.pdf`,
  },
});
```

---

## 5. Growixa Audience CRM & Remarketing Integration

Whenever a lead is received, it is automatically pushed into **Growixa** as an **Audience Contact**:

```typescript
// Push Contact to Growixa Audience CRM
await fetch('https://growixa.iitdeveloper.com/api/v1/audiences/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GROWIXA_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    audience_id: client.growixa_audience_id,
    first_name: lead.student_name,
    phone: lead.mobile_number,
    email: lead.email,
    tags: [client.slug, lead.target_course, 'website_lead', 'session_2026_27'],
    custom_attributes: {
      query: lead.query_message,
      lead_date: new Date().toISOString(),
    },
  }),
});
```

### What the Client Can Do in Growixa:
1. **Admission Campaigns:** Send a broadcast to all 2,000 students who inquired over the year:
   *"Announcing New JEE & NEET Fast-Track Batches — 20% Early Bird Scholarship!"*
2. **Automated Follow-Up Sequences:** Students receive periodic motivational messages, past toppers' tips, and exam date reminders automatically.
3. **No Lost Leads:** Even if a student doesn't enroll immediately, their contact remains an active marketing asset for future batches.

---

## 6. OpsPilot Infrastructure Health Integration

OpsPilot runs privately on VPS `149.56.101.2`. The client **never sees technical server logs or commands**. The portal backend queries OpsPilot's local API and displays a clean, comforting status widget:

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
```

### Displayed to Client:
- 🟢 **Website Status:** Live & Operational (99.98% Uptime)
- 🔒 **Security:** SSL Certificate Active (Auto-renewed by Caddy)
- ⏳ **Domain & Hosting:** Renews in 280 Days

---

## 7. Portal UI Pages Map (`frontend/src/app/portal/`)

All portal routes are built inside the existing `iitdeveloper-website` Next.js 14 App Router project:

```
frontend/src/app/portal/
├── layout.tsx                # Authenticated portal shell (Sidebar, User Profile, Client Switcher)
├── page.tsx                  # Dashboard Overview (Total Leads, Next Renewal Due, Active Status)
├── login/
│   └── page.tsx              # Clean, branded login screen
├── leads/
│   └── page.tsx              # Real-time searchable leads table + "Export to Excel" button
├── invoices/
│   ├── page.tsx              # Invoice listing (Paid vs Unpaid) + "Pay Now via UPI / Razorpay"
│   └── [id]/page.tsx         # Downloadable GST Tax Invoice view
├── marketing/
│   └── page.tsx              # Growixa Audience Overview (Total Contacts, Launch Broadcast button)
└── services/
    └── page.tsx              # Website health badge (OpsPilot powered) + "Request Website Edit"
```

---

## 8. Implementation Milestones

| Milestone | Scope | Deliverable |
| :--- | :--- | :--- |
| **Milestone 1: DB & Ingestion Webhook** | Run SQL migrations on VPS PostgreSQL. Build `POST /api/v1/leads/ingest` with Sendrin & Growixa dispatch. | Ingestion endpoint live and logging leads |
| **Milestone 2: Client Website Integration** | Connect `knowledgekingedu/react-app` contact form to the new ingestion webhook. | Form submits lead ➔ Sendrin WhatsApp alert delivered |
| **Milestone 3: Portal UI & RBAC** | Build `frontend/src/app/portal/` with Next.js App Router, role guards, and Excel export. | Client logs in to view leads and export spreadsheet |
| **Milestone 4: Razorpay Invoicing & OpsPilot** | Implement Razorpay online payment button for invoices and OpsPilot health badge proxy. | Client pays invoice online; status flips to `PAID` |
| **Milestone 5: Production Rollout** | Launch `https://iitdeveloper.com/portal`. Onboard Knowledge King Education credentials. | Client actively using portal for daily lead management |

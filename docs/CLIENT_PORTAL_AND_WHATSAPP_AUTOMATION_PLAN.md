# IITDeveloper Client Portal & WhatsApp Automation Engine
## Lean & Practical Implementation Plan (Single-App Architecture)

- **Target Repository:** `iitdeveloper-website` (`portal.iitdeveloper.com` or `iitdeveloper.com/portal`)
- **Architecture Philosophy:** **Lean & Pragmatic** — No complex multi-tenant subdomains or database isolation. A single unified web portal with simple role-based filtering (`role: 'admin' | 'client'`).
- **Status:** Approved for Implementation (v2.0 - Simplified)
- **Deployment:** OVH VPS `149.56.101.2` (Next.js + FastAPI + PostgreSQL + Docker)

---

## 1. Core Vision & Business Workflow

A single, clean portal that solves two massive problems for IITDeveloper:
1. **For Clients (e.g. Knowledge King Education):** Log in to see their live website leads, download GST tax invoices, and pay pending hosting/AMC bills online.
2. **For IITDeveloper (Admin):** Automatic cash collection (no chasing payments), instant automated WhatsApp alerts to clients when a lead arrives, and a central overview of all client leads.

```
                              [ Student Submits Form ]
                                          │
                                          ▼
                      [ POST /api/v1/leads (with client='knowledgekingedu') ]
                                          │
                  ┌───────────────────────┼───────────────────────┐
                  ▼                       ▼                       ▼
          [ PostgreSQL DB ]      [ Google Sheet Sync ]   [ WhatsApp Automation ]
         • Saved permanently    • Row added to client's • Instant ping to client:
         • Tagged by 'client'     Google Drive sheet       "New Student Lead!"
                  │                                     • Welcome to student
                  ▼
      ┌────────────────────────────────────────────────────────┐
      │        IITDEVELOPER PORTAL (Single Next.js App)        │
      │                                                        │
      │  [Admin View (Ravi)]         [Client View (Knowledge King)]
      │  • Filter all clients        • Sees ONLY their own leads
      │  • Issue new invoices        • Sees ONLY their own bills
      │  • Global revenue stats      • "Pay Now via UPI / Card"
      └────────────────────────────────────────────────────────┘
```

---

## 2. Ultra-Lean Database Schema (Single PostgreSQL Database)

No tenant schemas. Tables simply use a `client_id` (or `client_slug`) column:

```sql
-- 1. Clients Directory
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,               -- 'knowledgekingedu', 'legalsujhav'
    name VARCHAR(255) NOT NULL,                     -- 'Knowledge King Education'
    contact_person VARCHAR(128) NOT NULL,           -- 'ER. MR Sir'
    phone VARCHAR(20) NOT NULL,                     -- '+917388591234'
    whatsapp_numbers TEXT[] NOT NULL,               -- ARRAY['+917388591234', '+917307265339']
    email VARCHAR(255) NOT NULL,                    -- 'info.knowledgekingedu@gmail.com'
    google_sheet_url TEXT,                          -- Client's Google Sheet Webhook URL
    password_hash VARCHAR(255) NOT NULL,            -- Direct login or Keycloak user ID
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Inbound Leads Table
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    client VARCHAR(64) NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    course VARCHAR(128),
    message TEXT,
    status VARCHAR(32) DEFAULT 'NEW',                -- 'NEW', 'CONTACTED', 'ADMITTED', 'LOST'
    internal_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Invoices & Billing Table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(64) UNIQUE NOT NULL,     -- 'IITD-INV-2026-101'
    client VARCHAR(64) NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,                    -- 'Annual Hosting, Domain & Maintenance Renewal'
    amount NUMERIC(10, 2) NOT NULL,                 -- Total amount in INR
    gst_number VARCHAR(32),
    status VARCHAR(32) DEFAULT 'UNPAID',            -- 'UNPAID', 'PAID', 'OVERDUE'
    due_date DATE NOT NULL,
    paid_at TIMESTAMP,
    razorpay_payment_id VARCHAR(128),
    pdf_url TEXT,                                   -- Direct PDF download link
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Managed Services Tracker
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    client VARCHAR(64) NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
    service_name VARCHAR(128) NOT NULL,             -- 'Domain: knowledgekingedu.com', 'Cloud VPS Hosting'
    renewal_date DATE NOT NULL,
    annual_cost NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'ACTIVE'             -- 'ACTIVE', 'EXPIRED'
);
```

---

## 3. WhatsApp Automation Engine

### Rule 1: Instant Lead Alert to Client
- **When:** Student submits form on client website.
- **To:** Client's WhatsApp (`+91 7388591234`).
- **Message:**
```text
🔔 *NEW STUDENT LEAD — Knowledge King Education*
━━━━━━━━━━━━━━━━━━━━
👤 *Student:* Rahul Sharma
📱 *Phone:* +91 9876543210
🎓 *Course:* 12th Board / JEE Prep
💬 *Query:* "Please share fee structure"
━━━━━━━━━━━━━━━━━━━━
👉 *Call Student:* tel:+919876543210
👉 *Open Portal:* https://portal.iitdeveloper.com
```

### Rule 2: Instant Welcome & Brochure to Student
- **When:** Student submits inquiry.
- **To:** Student's mobile number.
- **Message:**
```text
Hello Rahul! 👋

Thank you for your interest in *Knowledge King Education*.
We have received your admission inquiry for *12th Board / JEE Prep*.

📄 Attached is our *Official 2026 Prospectus & Fee Structure*.
Our counselor will call you within 24 hours.
Helpline: +91 7388591234
```

### Rule 3: Automated Invoice & Renewal Reminder
- **When:** 10 days before hosting/domain expiry.
- **To:** Client's phone.
- **Message:**
```text
Dear Knowledge King Education,

Your Annual Hosting & Domain Renewal Invoice #IITD-INV-2026-101 (₹6,000) is due on Oct 15.

💳 *Pay Online via UPI / Card:*
👉 https://portal.iitdeveloper.com/invoices/101
```

---

## 4. Portal UI Modules (Single Next.js App)

A clean dashboard at `portal.iitdeveloper.com` with 2 user roles:

### Role A: Admin (IITDeveloper)
- **Client Switcher Dropdown:** `[ All Clients ▼ | Knowledge King | LegalSujhav | FlightForge ]`
- **Global Overview:** Total leads received across all clients, total pending invoice revenue, recent payments.
- **Create Invoice Modal:** Select client, enter amount, click "Generate & Send Invoice via WhatsApp".

### Role B: Client (e.g. Knowledge King Education)
1. **Live Leads Tab (`/leads`):**
   - Simple table of student inquiries.
   - Filter by date or course.
   - One-click **"Download Excel / CSV"**.
2. **Invoices Tab (`/invoices`):**
   - See unpaid invoices with **"Pay Now via UPI / Razorpay"**.
   - Download past GST receipts as PDF.
3. **Services & Support Tab (`/services`):**
   - Website status: `knowledgekingedu.com` (Uptime: 100%, Domain renewal: Dec 2027).
   - "Request an Edit" button.

---

## 5. Execution Roadmap

| Step | Scope | Target |
| :--- | :--- | :--- |
| **Step 1** | Create `leads`, `invoices`, and `clients` tables in PostgreSQL on VPS | Day 1 |
| **Step 2** | Build `POST /api/v1/leads` endpoint with parallel WhatsApp dispatch & Google Sheet append | Day 2 |
| **Step 3** | Connect client contact form (`knowledgekingedu/react-app/src/pages/Contact.jsx`) to API | Day 3 |
| **Step 4** | Build simple Next.js Client Portal UI (`/leads`, `/invoices` with Razorpay checkout) | Day 4–5 |
| **Step 5** | Test end-to-end with real lead submission, WhatsApp ping, and invoice generation | Day 6 |

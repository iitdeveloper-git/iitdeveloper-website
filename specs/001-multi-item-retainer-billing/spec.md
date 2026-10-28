# Feature Specification: Multi-Item Invoice Builder & Recurring Retainer Engine

**Feature Branch**: `001-multi-item-retainer-billing`
**Created**: 2026-10-29
**Status**: Ready for Planning
**Target Repo**: `iitdeveloper-app` (Client OS Billing Portal)

---

## 1. Executive Summary

Empower the IITDeveloper Admin Portal to issue **Hybrid Invoices** combining one-time deliverables (e.g. Website Development, Custom Handover) with recurring retainer services (e.g. Annual Maintenance Contract - AMC, Cloud VPS Hosting, Server SLA, Domain Renewal) in a single GST-compliant transaction. The customer receives a single invoice and pays in one upfront payment. Behind the scenes, the system splits fulfillment into a one-time project completion track and initiates an automated recurring subscription tracker with 1-year or 1-month renewal reminders.

---

## 2. User Scenarios & Acceptance Criteria

### User Story 1 - Multi-Line Item Builder with Quick Presets (Priority: P1)
As an Admin, I want to create an invoice with multiple itemized service rows (using quick presets like Website Dev, Cloud VPS, AMC, Domain) so that I can bill multiple services on the same official GST tax invoice.

**Acceptance Scenarios**:
1. **Given** the Issue Official Invoice modal is open, **When** I click `+ Add Line Item`, **Then** a new editable row appears with Description, SAC Code, Nature, Qty, Rate, and Amount.
2. **Given** I select the preset `Annual Maintenance Contract (AMC)`, **Then** Description auto-fills with standard AMC text, SAC code `998314`, and Nature defaults to `Yearly`.
3. **Given** I add 3 items totaling ₹95,000, **Then** Subtotal and GST recalculate dynamically in real-time.

---

### User Story 2 - Retainer Cycle Frequency Selector (Yearly vs. Monthly) (Priority: P1)
As an Admin issuing a retainer invoice, I want to toggle between Annual (1 Year / AMC) and Monthly cycles so that I am not forced to manually edit monthly dates to represent an annual retainer.

**Acceptance Scenarios**:
1. **Given** I select Retainer billing, **When** I toggle `Yearly (1 Year / AMC)`, **Then** the cycle dates automatically calculate from `Today` to `Today + 365 Days` (e.g., 01/11/2026 to 31/10/2027), and label displays "Annual Retainer / AMC Cycle (1 Year)".
2. **Given** I toggle `Monthly`, **Then** the cycle calculates standard 30-day bounds (e.g. 01/11/2026 to 30/11/2026).

---

### User Story 3 - Per-Item Billing Nature Pill (One-Time vs. Recurring) (Priority: P1)
As an Admin adding line items, I want to designate each service as `One-Time`, `Yearly`, or `Monthly` via a clean segmented control so that the system knows which items recur and which are static deliverables.

**Acceptance Scenarios**:
1. **Given** an invoice with Website Dev (One-Time) and Cloud Hosting (Yearly), **When** the invoice is generated, **Then** the client sees both items on one bill and pays once.
2. **Given** the bill is paid, **Then** the backend automatically records a renewal schedule only for the Cloud Hosting (Yearly) item.

---

### User Story 4 - Client Subscriptions Database Tracker (Priority: P2)
As an Admin, I want recurring services to be automatically registered in `client_subscriptions` so that expiry dates and renewal schedules are tracked systematically without manual spreadsheets.

**Acceptance Scenarios**:
1. **Given** an invoice with a 1-year Cloud VPS item (`01/11/2026` to `31/10/2027`), **When** the invoice is created or marked settled, **Then** a row in `client_subscriptions` is created with `next_renewal_date = '2027-11-01'`.

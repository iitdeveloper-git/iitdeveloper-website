# Phase 0: Research & Technical Decisions

**Feature Branch**: `001-multi-item-retainer-billing`
**Created**: 2026-10-29

---

## Decision 1: Line Item Billing Nature UX Control

### Question
How should the Admin designate whether an item is One-Time, Yearly Recurring, or Monthly Recurring?

### Alternatives Evaluated
1. **HTML Radio Buttons**: Can look cluttered when repeated across 4+ line item rows.
2. **Standard Select Dropdown**: Requires 2 clicks to change and hides state inside closed menu.
3. **Segmented Pill Buttons (`[One-Time] [↻ Yearly] [↻ Monthly]`)**: Compact, 1-click toggle, distinct active glowing state (`emerald-400` / `blue-400`).

### Decision & Rationale
**Segmented Pill Buttons**. They provide instant visual scanning across multiple table rows, match the Obsidian theme aesthetic, and allow changing an item's nature in a single click without opening a menu.

---

## Decision 2: Pre-Populated Service Preset Catalog

### Question
Which services should be pre-configured in the 1-click Preset Dropdown?

### Decision & Rationale
Directly match the official IITDeveloper Service Quotation & Invoice specification templates:
* `Website and Web App Development` (SAC `998314`, Nature: `one_time`)
* `Mobile App Development` (SAC `998314`, Nature: `one_time`)
* `Managed Cloud VPS Hosting & Server SLA` (SAC `998315`, Nature: `yearly`)
* `Annual Maintenance Contract (AMC)` (SAC `998314`, Nature: `yearly`)
* `Domain Registration / Renewal` (SAC `998315`, Nature: `yearly`)
* `DevOps, Backups & SSL Retainer` (SAC `998315`, Nature: `monthly`)
* `SEO + AEO + GEO Optimization` (SAC `998314`, Nature: `monthly`)
* `Custom Service Item` (Free text)

---

## Decision 3: Database & Subscription Tracking Architecture

### Question
How should the system track recurring subscriptions without breaking existing invoice operations?

### Decision & Rationale
1. **Invoice Items**: Kept in `invoices.items` (`JSONB`). Fully backwards-compatible. Each item records:
   ```json
   {
     "description": "Annual Maintenance Contract (AMC) 2026–2027",
     "sacCode": "998314",
     "qty": 1,
     "rate": 25000,
     "amount": 25000,
     "billingNature": "yearly",
     "periodStart": "2026-11-01",
     "periodEnd": "2027-10-31"
   }
   ```
2. **Subscription Table**: Create `client_subscriptions` in the PostgreSQL database. When an invoice containing recurring items is issued or marked paid, a record is upserted with `current_period_start`, `current_period_end`, and `next_renewal_date`.

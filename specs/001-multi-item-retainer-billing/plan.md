# Implementation Plan: Multi-Item Invoice Builder & Recurring Retainer Engine

**Branch**: `001-multi-item-retainer-billing` | **Date**: 2026-10-29 | **Spec**: [Feature Spec](file:///Users/ravi/Projects/iitdeveloper-website/specs/001-multi-item-retainer-billing/spec.md)

---

## 1. Summary

Implement a dynamic Multi-Line Item Builder with quick service presets, yearly/monthly retainer frequency toggles, and an automated PostgreSQL recurring subscription tracker. This enables issuing hybrid invoices combining one-time development deliverables with annual AMC and cloud hosting in a single transaction.

---

## 2. Technical Context

* **Language/Framework**: TypeScript, React 19, Next.js 15 (App Router).
* **Styling**: TailwindCSS with Obsidian Dark Theme tokens (`#0D1215`, `#172126`, `#35484A`, `#8BE0BA`).
* **Database**: PostgreSQL 16 (`core_postgres` on OVH VPS, DB: `iitd_portal`).
* **PDF Engine**: ReportLab (GNS API `invoice_pdf_generator.py`).
* **Target Services**:
  * `iitdeveloper-app` (Admin Portal & Invoice API)
  * `gns_api` (Vector Studio PDF Generator)
  * `core_postgres` (Database migrations)

---

## 3. Constitution & Quality Check

* [x] **Preserve Brand Aesthetics**: Seamlessly integrates into existing Obsidian Dark styling.
* [x] **Zero Content Fabrication**: Preserves all existing legal entity snapshots, GSTIN, and SAC classifications.
* [x] **Data Integrity**: Uses atomic transactions and locked sequential counters for invoices.
* [x] **Backwards Compatibility**: Existing single-amount invoices remain 100% readable and valid.

---

## 4. Work Breakdown by Component

### Component A: Database Migration
* Create table `client_subscriptions` with foreign keys to `clients(id)` and `invoices(id)`.
* Add indexes on `client_id`, `next_renewal_date`, and `status`.

### Component B: Backend API (`/api/invoices` & `invoices-service.ts`)
* Extend `CreateInvoiceInput` to accept detailed `items` with `billingNature`, `periodStart`, and `periodEnd`.
* Automatically upsert recurring items into `client_subscriptions` upon invoice creation.
* Support billing models: `full_upfront`, `advance_milestone`, `remaining_final`, `recurring_yearly`, `recurring_monthly`.

### Component C: Admin UI (`src/app/admin/page.tsx`)
* In "Issue Official Invoice" modal:
  * Add **Retainer Frequency Switcher**: `[Yearly (1 Year / AMC)]` vs `[Monthly (30 Days)]`.
  * Add **Multi-Line Item Builder**:
    * Quick Presets Dropdown (`Website Dev`, `Mobile App`, `Cloud VPS`, `AMC`, `Domain Renewal`, `Custom`).
    * Per-item Nature Selector Pills: `[ One-Time ] [ ↻ Yearly ] [ ↻ Monthly ]`.
    * Quantity, Rate, and auto-computed Amount.
    * Real-time Subtotal, CGST/SGST/IGST, and Total Amount calculation.
    * Add/Remove line item actions.

### Component D: Verification & Release
* Verify desktop & mobile responsive layout.
* Build verification (`npm run build`).
* Deploy to VPS `/opt/iitdeveloper-app`.
* Git commit, push `main`, and tag release `v1.2.0`.

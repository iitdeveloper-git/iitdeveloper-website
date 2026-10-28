# Tasks: Multi-Item Invoice Builder & Recurring Retainer Engine

**Branch**: `001-multi-item-retainer-billing`
**Input**: [plan.md](file:///Users/ravi/Projects/iitdeveloper-website/specs/001-multi-item-retainer-billing/plan.md), [spec.md](file:///Users/ravi/Projects/iitdeveloper-website/specs/001-multi-item-retainer-billing/spec.md), [data-model.md](file:///Users/ravi/Projects/iitdeveloper-website/specs/001-multi-item-retainer-billing/data-model.md)

---

## Phase 1: Setup & Database Foundation (Blocking)

- [X] T001 Migrate `client_subscriptions` table into PostgreSQL (`core_postgres` / `iitdeveloper_prod`) per `data-model.md`
- [X] T002 [P] Update TypeScript interfaces in `src/lib/invoices-service.ts` for `LineItem` and subscription types

---

## Phase 2: User Story 1 - Multi-Line Item Builder with Quick Presets (Priority: P1)

- [X] T003 [P] [US1] Create pre-configured service presets constant array (`Website Dev`, `Cloud VPS`, `AMC`, `Domain Renewal`, etc.) in `src/app/admin/page.tsx`
- [X] T004 [US1] Implement dynamic line items state (`items`, `addItem`, `removeItem`, `updateItem`) with real-time subtotal and tax calculation
- [X] T005 [US1] Build line items UI in Issue Official Invoice modal with preset selector, SAC code, rate, qty, and trash button

---

## Phase 3: User Story 2 - Retainer Cycle Frequency Selector (Priority: P1)

- [X] T006 [P] [US2] Add Yearly vs. Monthly frequency toggle pills in Retainer section of invoice modal
- [X] T007 [US2] Implement auto-calculation of 365-day (annual) vs 30-day (monthly) period bounds when frequency changes

---

## Phase 4: User Story 3 - Per-Item Billing Nature Pill (Priority: P1)

- [X] T008 [P] [US3] Add segmented pill selector `[One-Time] [↻ Yearly] [↻ Monthly]` to each line item row
- [X] T009 [US3] Wire item nature state into invoice payload sent to `/api/invoices`

---

## Phase 5: User Story 4 - Subscriptions Database Tracker (Priority: P2)

- [X] T010 [US4] Update `createInvoice` in `src/lib/invoices-service.ts` to automatically upsert recurring items into `client_subscriptions`
- [X] T011 [US4] Return `subscriptionsCreated` count in `/api/invoices` response

---

## Phase 6: Polish & Verification

- [X] T012 [P] Verify responsive layout across mobile, tablet, and desktop
- [X] T013 Verify production build with `npm run build` (Passed cleanly, 16/16 routes optimized)
- [X] T014 Run end-to-end quickstart validation test for Rakesh Puri & Associates
- [X] T015 Deploy to VPS and commit release tag `v1.2.0` (Active and healthy on `iitd_app`)

---

## Phase 7: Phase 2 - Quotation Engine Backend & 3-Page Public Template

- [X] T016 Create `quotations` & `quotation_counters` tables in PostgreSQL `iitdeveloper_prod` on VPS `core_postgres`
- [X] T017 [P] Implement `src/lib/quotations-service.ts` with atomic quote numbering (`IITD-YYYY-XXXX`), token generation, and 1-click `convertQuotationToInvoice`
- [X] T018 [P] Implement API routes `/api/quotations` and `/api/quotations/[id]/convert`
- [X] T019 Implement 3-page studio public quotation template at `src/app/quote/[token]/page.tsx` (Dev & Infra, Marketing & Social, Scope & Terms, Sign/Acceptance)

---

## Phase 8: Phase 2 - Quotation Engine Admin Console Integration & Live Verification

- [X] T020 Integrate Quotations tab, list table, and 3-page template creation modal into `src/app/admin/page.tsx`
- [X] T021 Validate TypeScript types and production build (`npx tsc --noEmit` && `npm run build`)
- [X] T022 Issue live test quotation for Rakesh Puri & Associates and verify 1-click conversion to official Tax Invoice
- [X] T023 Deploy to VPS `149.56.101.2`, verify container health, and commit release tag `v1.3.1`

---

## Phase 9: Phase 2.1 - Quotation Actions Dropdown & Portal Email/WhatsApp Dispatch

- [X] T024 [P] Implement `dispatchQuotationNotification` in `src/lib/dispatcher.ts` and API route `src/app/api/quotations/[id]/send/route.ts`
- [X] T025 [P] Replace loose buttons in Quotations table with standard `Actions ⌄` dropdown in `src/app/admin/page.tsx`
- [X] T026 Integrate Send/Share Quotation Modal (Postal Email + WhatsApp) with 1-click portal dispatch in `src/app/admin/page.tsx`
- [X] T027 Validate build (`npx tsc --noEmit` & `npm run build`), deploy to VPS, and commit release tag `v1.4.0`

---

## Phase 10: Phase 2.2 - Client-Side Interactive Approval, Change Requests & Dashboard

- [X] T028 [P] Implement public quote action API routes (`/api/quote/[token]/accept` and `/api/quote/[token]/feedback`) with automated Postal email alerts to Admin and Client
- [X] T029 [P] Create `ClientQuoteActions.tsx` component with sticky bottom bar, Accept modal, and Change Request modal on `/quote/[token]`
- [X] T030 Add "Proposals & Estimates" tab/widget in Client Dashboard (`src/app/dashboard/page.tsx`)
- [X] T031 Update Admin Workspace (`src/app/admin/page.tsx`) to highlight `CHANGES_REQUESTED` and `ACCEPTED` status badges with client comments
- [X] T032 Validate build (`npx tsc --noEmit` & `npm run build`), deploy to VPS, and commit release tag `v1.5.0`






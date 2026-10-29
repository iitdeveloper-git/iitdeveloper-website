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

---

## Phase 11: Phase 3 - Standardized Client Onboarding Dossier & 360° Profile Studio

- [X] T033 [P] Extend Client TypeScript models & Zod schemas in `src/lib/leads-service.ts`, `src/app/api/clients/route.ts`, and `src/app/api/clients/[id]/route.ts` with corporate entity, GSTIN, digital footprint, social media profiles, and acquisition attribution
- [X] T034 [P] Update `onboardClient`, `updateClient`, and `getAllClients` in `src/lib/leads-service.ts` to persist and retrieve standardized dossier fields from PostgreSQL columns and `metadata` JSONB
- [X] T035 Redesign Client Onboarding Studio modal in `src/app/admin/page.tsx` into a modular 4-step intake (`01 / Entity & Tax`, `02 / Web & Social`, `03 / Team & Source`, `04 / Access & Handoff`) with smart GSTIN auto-state detection and pre-filled WhatsApp handoff
- [X] T036 Build expandable 360° Client Profile drawer in Admin Clients list (`src/app/admin/page.tsx`) to view and edit digital presence, social links, GSTIN, team contacts, and lead attribution inline
- [X] T037 Validate build (`npx tsc --noEmit` & `npm run build`), deploy to VPS, restart `iitd_app`, and commit release tag `v1.6.0`

---

## Phase 12: Phase 3.1 - Real-World Quotation Sync (Rakesh Puri & Associates)

- [X] T038 Update client record for `Rakesh Puri & Associates | Advocates & legal consultants` in PostgreSQL with contact person (`Rakesh Kumar Puri`), phone (`9414432758`), location (`Jodhpur, Rajasthan, INDIA`), and role (`Member of bar council`)
- [X] T039 Re-seed quotation `IITD-2026-0001` with real-world line items (Website Development ₹11,500, SEO ₹0, Logo ₹0, Domain ₹1,500, Server hosting ₹2,000, Subtotal ₹25,000, Discount ₹10,000, Total ₹15,000), milestone schedule, scope terms, and client inputs
- [X] T040 Upgrade 3-page studio proposal template (`src/app/quote/[token]/page.tsx`) to render client role, package title, dynamic notes, milestone schedule, and custom terms
- [X] T041 Build, deploy to VPS, verify live SSR output on `https://app.iitdeveloper.com/quote/bv7w8yOfx2P4f8qvvGCLmTYyjXHxJ4RKfG3ekxzWBoc`, and tag release `v1.6.1`

---

## Phase 13: Phase 3.2 - Real-World Client Onboarding & Quotation Sync (Samarpan Clinic)

- [X] T042 Register client `Samarpan Clinic` in PostgreSQL with contact person (`Dr. A. Verma`), phone (`+91 98222 33445`), location (`Gyanpur, Bhadohi, U.P., INDIA`), and role (`Medical Director / Healthcare Practice`)
- [X] T043 Update quotation `IITD-2026-0002` with real-world line items (Website Development ₹12,500, Google Business ₹0, SEO ₹0, Logo ₹0, Domain ₹1,500, Server hosting ₹2,000, Subtotal ₹27,000, Discount ₹11,000, Total ₹16,000), payment milestones (40% ₹6,400 / 40% ₹6,400 / 20% ₹3,200), and signatory (`For IITDeveloper: Sushma Sharma | Co-Founder`)
- [X] T044 Upgrade 3-page studio proposal template (`src/app/quote/[token]/page.tsx`) with formal Acceptance & Signatory declaration block and flexible multi-tier address fallback
- [X] T045 Build, deploy to VPS, verify live SSR output on `https://app.iitdeveloper.com/quote/F9KigphGPqqRzH7hDU05Yp-iCQ-f8semf0eiiPgjldY`, and tag release `v1.6.2`

---

## Phase 14: Phase 3.3 - Sendrin Quotation Template Registration & Dispatch Engine

- [X] T046 Register event `billing.quotation_issued` in Sendrin (`gns_prod`) with JSON Schema v1 under tenant `IITDeveloper`
- [X] T047 Publish Sendrin template `billing.quotation_issued` (v1 Active) with responsive dark-mode HTML, scope breakdown, milestone schedule, and direct proposal CTA
- [X] T048 Update `src/lib/dispatcher.ts` and Admin Workspace modal in `src/app/admin/page.tsx` with `billing.quotation_issued (v1 Active)`
- [X] T049 Execute end-to-end Sendrin dispatch test to `rdntechinfo@gmail.com` and `lmobds@gmail.com` (Accepted with 250 OK by Postal relay)
- [X] T050 Build, deploy to VPS, restart `iitd_app`, and commit release tag `v1.6.3`

---

## Phase 15: Phase 3.4 - Standardized Lotus Brand Transactional Quotation Framework (Option A)

- [X] T051 Update Sendrin (`gns_prod`) template `billing.quotation_issued` (v1 Active) with the two-card framework matching `billing.invoice_issued` (dark slate lotus header card, amber eyebrow, white summary card, milestone schedule, and direct CTA)
- [X] T052 Update `src/lib/dispatcher.ts` in `iitdeveloper-app` with the standardized two-card lotus email template HTML
- [X] T053 Validate TypeScript compilation and production build (`npx tsc --noEmit && npm run build`)
- [X] T054 Deploy updated build to VPS (`149.56.101.2`), recreate Docker container `iitd_app`, and tag release `v1.6.4`
- [X] T055 Dispatch live end-to-end test quotation email to `rdntechinfo@gmail.com` and `lmobds@gmail.com` and verify 250 OK relay delivery matching visual inbox specs

---

## Phase 16: Phase 3.5 - Official Sendrin Adapter Architecture & Universal Event Gateway (v1.7.0)

- [X] T056 Build official Sendrin Adapter (`src/lib/sendrin.ts`) in `iitdeveloper-app` providing typed interfaces (`sendQuotation`, `sendInvoice`, `sendPaymentReceipt`) targeting Sendrin's `/api/v1/notifications` endpoint
- [X] T057 Fix Sendrin verified domain validation in `ett_gns_app/api.py` on VPS to recognize tenant-owned verified active domains (`iitdeveloper.com`) and remove sandbox restrictions
- [X] T058 Refactor `src/lib/dispatcher.ts` to route all billing event dispatches (`billing.quotation_issued`, `billing.invoice_issued`, `billing.payment_received`) exclusively through `sendrin` adapter
- [X] T059 Validate TypeScript type checking (`npx tsc --noEmit`) and production Next.js compilation (`npm run build`)
- [X] T060 Deploy to VPS (`149.56.101.2`), recreate `iitd_app`, and tag release `v1.7.0`
- [X] T061 Execute live end-to-end Sendrin dispatch test via Next.js API, verifying `202 Accepted` status, Sendrin notification IDs (`ntf_466e1fa61e4943988b0195033d15dd0c`, `ntf_880a8cf92b384a5d9ac1ef84bf084ab8`), and delivery logging in `gns_prod`











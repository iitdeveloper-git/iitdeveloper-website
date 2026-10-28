# Quickstart Validation Guide: Multi-Item Invoices & Retainers

**Feature Branch**: `001-multi-item-retainer-billing`
**Created**: 2026-10-29

---

## 1. Prerequisites
* App running locally or in staging: `npm run dev` at `http://localhost:3000` (or `https://iitdeveloper.com/admin`).
* PostgreSQL database connected with `client_subscriptions` table migrated.

---

## 2. Test Scenario 1: Multi-Item Invoice with Quick Presets
1. Open Admin Portal &rarr; Click **"Issue Official Invoice"**.
2. Select Client: **Rakesh Puri & Associates**.
3. In the line items section:
   * Click Preset: `Website and Web App Development` &rarr; Enter Rate `50000`, Nature: `One-Time`.
   * Click `+ Add Line Item`.
   * Click Preset: `Annual Maintenance Contract (AMC)` &rarr; Enter Rate `25000`, Nature: `Yearly`.
   * Click `+ Add Line Item`.
   * Click Preset: `Managed Cloud VPS Hosting & Server SLA` &rarr; Enter Rate `20000`, Nature: `Yearly`.
4. Verify dynamic calculations:
   * Subtotal: ₹95,000.00
   * GST @ 18%: ₹17,100.00
   * Total Amount: ₹1,12,100.00
5. Click **"Generate & Dispatch Retainer Bill"**.
6. Verify output:
   * Sequential Invoice Number generated (e.g. `IITD/26-27/0005`).
   * Magic pay link generated.
   * Email dispatched to `lmobds@gmail.com`.

---

## 3. Test Scenario 2: Annual vs. Monthly Retainer Toggle
1. Select Billing Model: **Retainer**.
2. Click **Yearly (1 Year / AMC)**:
   * Verify Period displays `01/11/2026` to `31/10/2027` (or 1 year span).
   * Verify header says **"Annual Retainer / AMC Cycle (1 Year)"**.
3. Click **Monthly (30 Days)**:
   * Verify Period reverts to current month `01/11/2026` to `30/11/2026`.

---

## 4. Test Scenario 3: Subscription Record Verification
Run in database:
```sql
SELECT * FROM client_subscriptions WHERE client_id = 'a6543167-e8a3-41d1-88f5-54eb072736ef';
```
* Expected: 2 subscription records created (`AMC` and `Cloud VPS`) with `next_renewal_date = '2027-11-01'`.

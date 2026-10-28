# Data Model: Multi-Item Invoices & Subscriptions

**Feature Branch**: `001-multi-item-retainer-billing`
**Created**: 2026-10-29

---

## 1. Line Item Structure (`invoices.items` JSONB)

Each entry in the `invoices.items` array adheres to:

```typescript
export interface LineItem {
  id?: string;
  description: string;
  sacCode: string;               // e.g. "998314" or "998315"
  qty: number;                   // e.g. 1
  rate: number;                  // Base price before GST
  amount: number;                // qty * rate
  billingNature: 'one_time' | 'yearly' | 'monthly';
  periodStart?: string;          // YYYY-MM-DD
  periodEnd?: string;            // YYYY-MM-DD
}
```

---

## 2. Table: `client_subscriptions` (New)

```sql
CREATE TABLE IF NOT EXISTS client_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    origin_invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    service_name VARCHAR(255) NOT NULL,
    service_category VARCHAR(64) DEFAULT 'infrastructure',
    billing_frequency VARCHAR(32) NOT NULL,          -- 'yearly' | 'monthly'
    recurring_rate NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(8) DEFAULT 'INR',
    status VARCHAR(32) DEFAULT 'ACTIVE',             -- 'ACTIVE', 'RENEWAL_DUE', 'RENEWED', 'CANCELLED'
    current_period_start DATE NOT NULL,
    current_period_end DATE NOT NULL,
    next_renewal_date DATE NOT NULL,
    alert_lead_days INT DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_subscriptions_client ON client_subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_renewal ON client_subscriptions(next_renewal_date);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_status ON client_subscriptions(status);
```

---

## 3. Relationships & State Transitions

* **`clients` 1:N `invoices`**: An organization can have multiple sequential invoices.
* **`invoices` 1:N `client_subscriptions`**: An invoice containing 1 or more recurring line items spawns corresponding subscription tracker records.
* **State Transition**:
  * Upon Invoice Creation / Payment: `ACTIVE`
  * When `current_date >= next_renewal_date - alert_lead_days`: `RENEWAL_DUE`
  * Upon Settlement of renewal invoice: Period advances and status returns to `ACTIVE`.

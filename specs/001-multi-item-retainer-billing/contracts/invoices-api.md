# Interface Contract: `/api/invoices`

**Feature Branch**: `001-multi-item-retainer-billing`
**Created**: 2026-10-29

---

## POST `/api/invoices`

Creates a sequential GST invoice with support for multi-line items and recurring subscription registration.

### Request Body
```json
{
  "clientId": "a6543167-e8a3-41d1-88f5-54eb072736ef",
  "title": "Comprehensive Engineering, Cloud VPS & AMC 2026–2027",
  "billingType": "full_upfront",
  "subtotalAmount": 95000.00,
  "taxRate": 18.0,
  "dueDate": "2026-11-10",
  "isInterstate": false,
  "notes": "Includes 1-year Managed OVH VPS and Annual Maintenance SLA.",
  "items": [
    {
      "description": "Website & Web App Development — Portal Architecture",
      "sacCode": "998314",
      "qty": 1,
      "rate": 50000.00,
      "amount": 50000.00,
      "billingNature": "one_time"
    },
    {
      "description": "Annual Maintenance Contract (AMC) 2026–2027",
      "sacCode": "998314",
      "qty": 1,
      "rate": 25000.00,
      "amount": 25000.00,
      "billingNature": "yearly",
      "periodStart": "2026-11-01",
      "periodEnd": "2027-10-31"
    },
    {
      "description": "Managed Cloud VPS Hosting & Server SLA (1 Year)",
      "sacCode": "998315",
      "qty": 1,
      "rate": 20000.00,
      "amount": 20000.00,
      "billingNature": "yearly",
      "periodStart": "2026-11-01",
      "periodEnd": "2027-10-31"
    }
  ],
  "autoDispatch": true
}
```

### Response (200 OK)
```json
{
  "success": true,
  "invoice": {
    "invoice": {
      "id": "c1f7a0b3-...",
      "invoiceNumber": "IITD/26-27/0005",
      "totalAmount": 112100.00,
      "subtotalAmount": 95000.00,
      "cgstAmount": 8550.00,
      "sgstAmount": 8550.00,
      "status": "ISSUED"
    },
    "payUrl": "https://iitdeveloper.com/pay/abc123xyz"
  },
  "subscriptionsCreated": 2,
  "dispatch": {
    "emailDispatched": true,
    "recipientEmail": "lmobds@gmail.com"
  }
}
```

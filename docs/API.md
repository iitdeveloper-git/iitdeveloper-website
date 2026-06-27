# Backend API Documentation

## Overview
Complete REST API for pricing calculation, estimate management, and email delivery.

## Base URL
```
Development: http://localhost:3000/api
Production: https://iitdeveloper.com/api
```

## Authentication
Currently no authentication required. Future versions will implement JWT tokens.

---

## Endpoints

### Health Check

#### `GET /api/health`
Check API and database health.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-04-25T10:30:00.000Z",
  "services": {
    "database": "up",
    "api": "up"
  },
  "version": "1.0.0"
}
```

---

### Services

#### `GET /api/services`
Get all available services.

**Query Parameters:**
- `category` (optional): Filter by category (technical, ai, marketing, consulting)

**Response:**
```json
{
  "services": [...],
  "count": 10,
  "categories": ["technical", "ai", "marketing", "consulting"]
}
```

#### `GET /api/services/[id]`
Get single service details.

**Response:**
```json
{
  "id": "web-app",
  "name": "Web Application Development",
  "category": "technical",
  "description": "Full-stack web application with modern tech stack",
  "basePrice": 15000,
  "unit": "project",
  "icon": "Code",
  "estimatedDuration": "8-12 weeks",
  "options": [...]
}
```

---

### Price Calculation

#### `POST /api/estimates/calculate`
Calculate price for a service configuration.

**Request Body:**
```json
{
  "serviceId": "web-app",
  "configuration": {
    "complexity": "moderate",
    "features": ["auth", "payments"],
    "users": "10k"
  },
  "quantity": 1
}
```

**Response:**
```json
{
  "serviceId": "web-app",
  "configuration": {...},
  "quantity": 1,
  "totalPrice": 25500,
  "pricePerUnit": 25500
}
```

---

### Estimates

#### `POST /api/estimates`
Create new estimate.

**Request Body:**
```json
{
  "lineItems": [
    {
      "id": "item-1",
      "serviceId": "web-app",
      "serviceName": "Web Application Development",
      "quantity": 1,
      "configuration": {...},
      "basePrice": 15000,
      "totalPrice": 25500,
      "unit": "project",
      "notes": "Optional notes"
    }
  ],
  "discount": {
    "type": "percentage",
    "value": 10,
    "reason": "Early bird discount"
  },
  "tax": {
    "rate": 8.5,
    "amount": 1947.75
  },
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Inc",
    "phone": "+1234567890",
    "message": "Looking forward to working together"
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "createdAt": "2026-04-25T10:30:00.000Z",
  "updatedAt": "2026-04-25T10:30:00.000Z",
  "lineItems": [...],
  "subtotal": 25500,
  "discount": {...},
  "tax": {...},
  "total": 24997.75,
  "status": "draft",
  "validUntil": "2026-05-25T10:30:00.000Z",
  "customerInfo": {...}
}
```

#### `GET /api/estimates`
List all estimates.

**Query Parameters:**
- `status` (optional): Filter by status (draft, sent, approved, rejected)
- `customerEmail` (optional): Filter by customer email
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "estimates": [...],
  "count": 15,
  "filters": {...}
}
```

#### `GET /api/estimates/[id]`
Get single estimate by ID.

**Response:**
```json
{
  "id": "uuid",
  "createdAt": "2026-04-25T10:30:00.000Z",
  ...
}
```

#### `PATCH /api/estimates/[id]`
Update estimate.

**Request Body:** (all fields optional)
```json
{
  "lineItems": [...],
  "discount": {...},
  "tax": {...},
  "status": "sent",
  "customerInfo": {...}
}
```

**Response:**
```json
{
  "id": "uuid",
  "updatedAt": "2026-04-25T11:00:00.000Z",
  ...
}
```

#### `DELETE /api/estimates/[id]`
Delete estimate (soft delete).

**Response:**
```json
{
  "message": "Estimate deleted successfully"
}
```

#### `GET /api/estimates/[id]/activities`
Get estimate activity log.

**Response:**
```json
{
  "estimateId": "uuid",
  "activities": [
    {
      "id": "uuid",
      "estimateId": "uuid",
      "activityType": "created",
      "description": "Estimate created",
      "metadata": null,
      "createdAt": "2026-04-25T10:30:00.000Z"
    }
  ],
  "count": 5
}
```

---

### Email

#### `POST /api/estimates/send`
Send estimate via email.

**Request Body:**
```json
{
  "estimateId": "uuid",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Inc"
  },
  "message": "Optional custom message to include in email"
}
```

**Response:**
```json
{
  "success": true,
  "estimate": {...},
  "emailId": "resend-message-id"
}
```

---

## Error Responses

All endpoints return consistent error responses:

**400 Bad Request** - Validation Error
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": ["lineItems"],
      "message": "At least one service is required"
    }
  ]
}
```

**404 Not Found**
```json
{
  "error": "Estimate not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to create estimate",
  "message": "Database connection failed"
}
```

---

## Database Schema

See `src/lib/db/schema.sql` for complete PostgreSQL schema.

**Tables:**
- `estimates` - Main estimates table
- `estimate_activities` - Activity log
- `email_logs` - Email delivery tracking

**Views:**
- `active_estimates` - Non-deleted estimates
- `estimate_stats` - Summary statistics

**Functions:**
- `generate_po_number()` - Generate unique PO numbers
- `update_updated_at_column()` - Auto-update timestamps

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Database
```bash
# Create database
createdb iitdeveloper

# Run schema
psql iitdeveloper < src/lib/db/schema.sql
```

### 3. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your database credentials
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test API
```bash
# Health check
curl http://localhost:3000/api/health

# Get services
curl http://localhost:3000/api/services

# Calculate price
curl -X POST http://localhost:3000/api/estimates/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "web-app",
    "configuration": {"complexity": "simple"},
    "quantity": 1
  }'
```

---

## Email Configuration

The API uses [Resend](https://resend.com) for email delivery.

**Setup:**
1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   FROM_EMAIL=noreply@yourdomain.com
   ```
4. Verify your domain in Resend dashboard

**Development Mode:**
- If `RESEND_API_KEY` is not set, emails are logged to console
- Email logs are still saved to database

---

## Production Deployment

### Environment Variables
Set all variables from `.env.example` in your hosting platform.

### Database
- Use managed PostgreSQL (AWS RDS, Supabase, etc.)
- Enable connection pooling
- Set up automated backups

### Security
- Enable HTTPS only
- Add rate limiting
- Implement authentication (future)
- Sanitize all inputs (Zod handles this)

### Monitoring
- Log all API errors
- Track email delivery rates
- Monitor database performance
- Set up alerts for failures

---

## Future Enhancements

- [ ] JWT authentication
- [ ] Admin dashboard
- [ ] PDF generation endpoint
- [ ] Webhook support
- [ ] Payment integration (Stripe)
- [ ] Real-time updates (WebSockets)
- [ ] API rate limiting
- [ ] API versioning (v2)
- [ ] GraphQL endpoint
- [ ] Bulk operations
- [ ] Advanced analytics
- [ ] Export to CSV/Excel

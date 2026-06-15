# 🚀 Quick Start Guide - Backend & Contact Form

## Prerequisites Checklist

- [x] Node.js 20+ installed
- [x] PostgreSQL running (Podman/Docker)
- [ ] Resend API account (get one at [resend.com](https://resend.com))
- [ ] Environment variables configured

---

## Step 1: Setup Environment Variables

Create `.env.local` in the `frontend/` directory:

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database (Local Development)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Email Service (Required)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=IITDeveloper
SALES_EMAIL=info@yourdomain.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 🔑 Get Your Resend API Key

1. Sign up at [resend.com](https://resend.com/signup)
2. Go to **API Keys** in dashboard
3. Click **Create API Key**
4. Copy and paste into `.env.local`

**For testing**, you can use `onboarding@resend.dev` as FROM_EMAIL (no domain verification needed).

---

## Step 2: Start Database

```bash
cd frontend

# Start PostgreSQL container
npm run db:start

# Initialize schema (creates tables)
npm run db:init
```

**Verify database is running:**
```bash
npm run db:status
```

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Step 5: Test Contact Form

### Option A: Use the UI

1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check console logs for email status

### Option B: Test API Directly

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "Website Development",
    "budget": "$10K - $25K",
    "message": "This is a test message from the contact form."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "uuid-here",
    "email": "test@example.com",
    "status": "new",
    "lead_quality": "warm",
    "lead_score": 65
  }
}
```

---

## Step 6: Verify Emails

### Check Resend Dashboard

1. Go to [resend.com/emails](https://resend.com/emails)
2. You should see 2 emails:
   - ✉️ Confirmation email to customer
   - 📨 Notification email to sales team

### Check Email Inbox

- Customer should receive branded confirmation email
- Sales email should receive lead notification

---

## 🐛 Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
npm run db:status

# If not running, start it
npm run db:start

# Test connection
npm run db:psql
# Should connect to database
```

### Email Not Sending

**Issue**: `RESEND_API_KEY is not configured`
```bash
# Solution: Add API key to .env.local
echo 'RESEND_API_KEY=re_your_key' >> .env.local
```

**Issue**: `Email failed: Forbidden`
```bash
# Solution: Verify your domain in Resend
# OR use onboarding@resend.dev for testing
FROM_EMAIL=onboarding@resend.dev
```

**Issue**: Emails sent but not received
```bash
# Check Resend Dashboard logs
# Check spam folder
# Verify email addresses are valid
```

### API Route 404

```bash
# Make sure you're in the frontend directory
cd frontend
npm run dev

# Route should be available at:
# http://localhost:3000/api/leads
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📊 View Leads in Database

### Using CLI

```bash
npm run db:psql

# Run SQL query
SELECT 
  id,
  name,
  email,
  lead_quality,
  lead_score,
  created_at
FROM leads
ORDER BY created_at DESC
LIMIT 10;
```

### Using API

```bash
curl http://localhost:3000/api/leads
```

---

## 🧪 Development Workflow

### 1. Make Changes
```bash
# Edit files in src/
# Hot reload happens automatically
```

### 2. Check Types
```bash
npm run type-check
```

### 3. Lint Code
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Test Production Build
```bash
npm start
```

---

## 📝 Common Tasks

### Add New API Route

1. Create file in `src/app/api/your-route/route.ts`
2. Export GET, POST, etc. functions
3. Test at `http://localhost:3000/api/your-route`

### Update Email Template

1. Edit `src/lib/services/email-service.ts`
2. Find `generateContactConfirmationHTML()` or `generateContactNotificationHTML()`
3. Update HTML
4. Test by submitting form

### Modify Lead Scoring

1. Edit database function in `src/lib/db/schema.sql`
2. Look for `calculate_lead_score()`
3. Update logic
4. Re-run migrations: `npm run db:migrate`

---

## 🚀 Ready for Production?

Once everything works locally:

1. **Setup Production Database**
   ```bash
   # Create Neon database at neon.tech
   # Get connection string
   # Add to Cloudflare environment variables
   ```

2. **Deploy to Cloudflare**
   ```bash
   ./deploy-cloudflare.sh check
   # Follow instructions in CLOUDFLARE_DEPLOYMENT.md
   ```

3. **Configure Custom Domain**
   - Add domain in Cloudflare Dashboard
   - Update DNS records
   - Wait for SSL provisioning

4. **Monitor & Optimize**
   - Check Cloudflare Analytics
   - Monitor Resend email delivery
   - Track lead quality metrics

---

## 📚 Documentation

- [Backend Summary](./BACKEND_CONTACT_SUMMARY.md) - What was built
- [Cloudflare Deployment](./CLOUDFLARE_DEPLOYMENT.md) - Step-by-step deployment
- [API Documentation](./frontend/API.md) - Full API reference

---

## 🆘 Need Help?

**Check logs:**
```bash
# API route errors
# Check terminal where npm run dev is running

# Database errors
npm run db:logs

# Email errors
# Check Resend Dashboard > Logs
```

**Common commands:**
```bash
npm run dev          # Start dev server
npm run db:start     # Start database
npm run db:stop      # Stop database
npm run db:psql      # Open psql shell
npm run type-check   # Check TypeScript
npm run lint         # Run linter
npm run build        # Build for production
```

---

**Ready to build! 🎉**

# 🎯 Database Quick Start

Your project is now configured to work with **any PostgreSQL database** using the `DATABASE_URL` environment variable!

## ✅ Current Setup:

**Connected to:** Neon (Serverless PostgreSQL)  
**Status:** ✅ Migrations completed successfully  
**Email:** Contact notifications → `info@iitdeveloper.com`

---

## 🚀 How It Works

The database client (`src/lib/db/client.ts`) automatically detects your database configuration:

### Option 1: Use `DATABASE_URL` (Recommended)
```env
DATABASE_URL=postgresql://user:pass@host/database?sslmode=require
```
- ✅ Works with Neon, Supabase, Heroku, Vercel Postgres
- ✅ Works locally and in production
- ✅ Single configuration for all environments

### Option 2: Use individual env vars (Local only)
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

---

## 🔄 Switch Database Anytime

### To Neon (Current):
```env
# In .env.local
DATABASE_URL=postgresql://neondb_owner:npg_l4X3hAiYOzWH@ep-fancy-truth-app7pl9q.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### To Supabase:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres
```

### To Local PostgreSQL:
```env
# Comment out DATABASE_URL
# Uncomment local settings:
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

---

## 📊 Run Migrations

After changing `DATABASE_URL`, run migrations:

```bash
npm run db:migrate:neon
```

This will:
1. Connect to your database
2. Create all tables (leads, estimates, etc.)
3. Set up indexes and functions

---

## 🧪 Test Your Setup

### 1. Start Dev Server:
```bash
npm run dev
```

### 2. Test Contact Form:
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Testing contact form"
  }'
```

### 3. Expected Response:
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

### 4. Check Your Email:
- You should receive notification at: **info@iitdeveloper.com**
- Customer receives confirmation at their email

---

## 🌐 Deploy Anywhere

Your database connection works on:
- ✅ **Cloudflare Pages** - Just add `DATABASE_URL` env var
- ✅ **Netlify** - Add to Environment Variables
- ✅ **Vercel** - Add to Project Settings
- ✅ **Local Development** - Already configured!

### Deployment Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add contact form backend"
   git push
   ```

2. **Deploy to Cloudflare Pages**
   - Connect GitHub repo in Cloudflare Dashboard
   - Add environment variables:
     ```
     DATABASE_URL=your-neon-connection-string
     RESEND_API_KEY=your-resend-key
     SALES_EMAIL=info@iitdeveloper.com
     ```

3. **Deploy!**
   - Click "Deploy"
   - Your contact form works globally!

---

## 📝 Environment Variables Needed

Copy these to your deployment platform:

```env
# Database (Required)
DATABASE_URL=postgresql://neondb_owner:npg_l4X3hAiYOzWH@ep-fancy-truth-app7pl9q.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require

# Email (Required for contact form)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@iitdeveloper.com
FROM_NAME=IITDeveloper
SALES_EMAIL=info@iitdeveloper.com

# App URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_CONTACT_EMAIL=info@iitdeveloper.com
```

---

## 🎉 You're All Set!

Your contact form now:
- ✅ Saves leads to Neon database
- ✅ Sends email confirmation to customers
- ✅ Sends notification to you (info@iitdeveloper.com)
- ✅ Works on any hosting platform
- ✅ Completely free (within Neon's free tier)

**Next Step:** Get a Resend API key to enable emails!

1. Sign up: [resend.com](https://resend.com)
2. Get API key (free 3,000 emails/month)
3. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`
4. Restart server: `npm run dev`

---

## 🆘 Troubleshooting

### Error: Connection refused
```
Check DATABASE_URL in .env.local
Ensure connection string is correct
```

### Error: Table doesn't exist
```bash
npm run db:migrate:neon
```

### Emails not sending
```
Add RESEND_API_KEY to .env.local
Check Resend dashboard for logs
```

---

**Need help?** Check the full guides:
- [QUICK_START.md](../QUICK_START.md) - Getting started
- [NEON_SETUP.md](../NEON_SETUP.md) - Detailed Neon setup
- [CLOUDFLARE_DEPLOYMENT.md](../CLOUDFLARE_DEPLOYMENT.md) - Deployment guide

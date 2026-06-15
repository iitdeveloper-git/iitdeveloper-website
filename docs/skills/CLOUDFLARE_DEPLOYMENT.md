# 🚀 Cloudflare Pages Deployment Guide - Updated & Complete

## ✅ What We've Done (Changes Made)

### 1. **Database Client - Edge Compatible**
- ✅ Replaced `pg` package with `@neondatabase/serverless`
- ✅ Updated `/src/lib/db/client.ts` to use Neon's HTTP-based driver
- ✅ Works with Cloudflare's Edge Runtime (V8 isolates)
- ✅ No Node.js APIs required - fully edge-compatible

### 2. **API Routes - Edge Runtime Enabled**
- ✅ Added `export const runtime = 'edge'` to ALL API routes:
  - `/api/leads/route.ts`
  - `/api/health/route.ts`
  - `/api/services/route.ts`
  - `/api/estimates/route.ts`
  - `/api/estimates/calculate/route.ts`
  - `/api/estimates/send/route.ts`
  - `/api/estimates/[id]/route.ts`
  - `/api/estimates/[id]/pdf/route.ts`
  - `/api/estimates/[id]/activities/route.ts`
  - `/api/services/[id]/route.ts`

### 3. **Next.js Configuration**
- ✅ Updated `next.config.js`:
  - Enabled `images.unoptimized = true` (Cloudflare handles image optimization)
  - Removed `output: 'standalone'` (not needed for Cloudflare)
  - Optimized for edge deployment

### 4. **Build Scripts**
- ✅ Added to `package.json`:
  - `npm run pages:build` - Build for Cloudflare Pages
  - `npm run pages:preview` - Preview locally with Wrangler
  - `npm run pages:deploy` - Deploy to Cloudflare

### 5. **Configuration Files**
- ✅ Updated `wrangler.toml` with nodejs_compat flag
- ✅ Created `.env.cloudflare` template with all required variables

---

## 📦 Packages Installed

```bash
✅ @neondatabase/serverless - Edge-compatible PostgreSQL client
✅ @cloudflare/next-on-pages - Cloudflare Pages adapter for Next.js
```

---

## 🚀 Deployment Steps

### **Option A: Deploy via Cloudflare Dashboard (Easiest)**

#### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Configure for Cloudflare Pages deployment"
git push origin main
```

#### Step 2: Create Cloudflare Pages Project
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your repository
5. Configure build settings:

**Build Settings:**
```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
Root directory: frontend
Node version: 18 or 20
```

#### Step 3: Add Environment Variables
In Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables:

**Add these variables:**
```env
DATABASE_URL = postgresql://neondb_owner:npg_l4X3hAiYOzWH@ep-fancy-truth-app7pl9q.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require

SALES_EMAIL = goyalnikhil743@gmail.com

# Option 1: Gmail SMTP (100% FREE)
GMAIL_USER = goyalnikhil743@gmail.com
GMAIL_APP_PASSWORD = your_16_char_password_here

# Option 2: Resend (Alternative)
# RESEND_API_KEY = re_your_key_here

NODE_ENV = production
```

**How to Get Gmail App Password:**
1. Visit https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not enabled)
3. Visit https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Enter "IIT Developer Website"
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
7. Paste into `GMAIL_APP_PASSWORD` in Cloudflare (remove spaces)

#### Step 4: Deploy
Click **Save and Deploy**. Your site will be live at:
```
https://iitdeveloper.pages.dev
```

---

### **Option B: Deploy via Wrangler CLI**

#### Step 1: Install Wrangler
```bash
npm install -g wrangler
```

#### Step 2: Login to Cloudflare
```bash
npx wrangler login
```

#### Step 3: Build for Cloudflare
```bash
cd frontend
npm run pages:build
```

#### Step 4: Deploy
```bash
npx wrangler pages deploy .vercel/output/static --project-name=iitdeveloper
```

#### Step 5: Add Environment Variables
```bash
# Add secrets via CLI
npx wrangler pages secret put DATABASE_URL --project-name=iitdeveloper
npx wrangler pages secret put GMAIL_USER --project-name=iitdeveloper
npx wrangler pages secret put GMAIL_APP_PASSWORD --project-name=iitdeveloper
npx wrangler pages secret put SALES_EMAIL --project-name=iitdeveloper
```

---

## 🧪 Test Locally Before Deploying

### 1. Test Development Build
```bash
cd frontend
npm run dev
```
Visit http://localhost:3000 and verify:
- ✅ Homepage loads
- ✅ Contact form works
- ✅ All pages accessible

### 2. Test Cloudflare Build Locally
```bash
# Build for Cloudflare Pages
npm run pages:build

# Preview with Wrangler (simulates Cloudflare environment)
npm run pages:preview
```

### 3. Check for Errors
```bash
# TypeScript check
npm run type-check

# Lint check
npm run lint
```

---

## 📊 Environment Variables Reference

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection | Already configured |
| `SALES_EMAIL` | ✅ Yes | Recipient email | `goyalnikhil743@gmail.com` |
| `GMAIL_USER` | ⚠️ Optional | Gmail SMTP user | `goyalnikhil743@gmail.com` |
| `GMAIL_APP_PASSWORD` | ⚠️ Optional | Gmail app password | https://myaccount.google.com/apppasswords |
| `RESEND_API_KEY` | ⚠️ Optional | Resend API (alternative) | https://resend.com/api-keys |
| `NODE_ENV` | ✅ Yes | Environment | `production` |

**Note:** Use either Gmail SMTP or Resend, not both.

---

## 🔍 Verify Deployment

### Test These Endpoints After Deployment:

1. **Health Check**
```bash
curl https://iitdeveloper.pages.dev/api/health
# Expected: {"status":"healthy","database":"connected"}
```

2. **Contact Form**
```bash
curl -X POST https://iitdeveloper.pages.dev/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "source": "contact_form"
  }'
# Expected: {"success":true,"message":"Lead created successfully"}
```

3. **Services API**
```bash
curl https://iitdeveloper.pages.dev/api/services
# Expected: Array of services
```

---

## 🚨 Troubleshooting

### Build Errors

**Error: `Cannot find module '@neondatabase/serverless'`**
```bash
# Solution: Reinstall packages
npm install --force
```

**Error: `Edge Runtime not supported`**
- ✅ **Already Fixed**: All API routes have `export const runtime = 'edge'`

### Database Connection Issues

**Error: `DATABASE_URL is not set`**
- Solution: Add `DATABASE_URL` in Cloudflare Dashboard → Environment Variables

**Error: `Database connection failed`**
- Verify Neon database is active at https://console.neon.tech
- Check connection string is correct
- Ensure `?sslmode=require` is at the end

### Email Issues

**No emails received**
1. Check Gmail app password is correct (16 characters)
2. Verify 2FA is enabled on Gmail account
3. Check spam/junk folder
4. Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in Cloudflare

**Gmail SMTP authentication failed**
- Generate new app password: https://myaccount.google.com/apppasswords
- Remove spaces from password when pasting in Cloudflare

---

## 🔗 Custom Domain Setup

### 1. Add Custom Domain in Cloudflare
1. Pages → Your Project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `iitdeveloper.com`

### 2. Update DNS
Cloudflare provides DNS records. Add to your DNS provider:
```
Type: CNAME
Name: @ (or www)
Value: iitdeveloper.pages.dev
Proxy: Yes (orange cloud)
```

### 3. SSL/TLS
- Cloudflare automatically provisions SSL certificates
- Your site will be HTTPS immediately

---

## 📈 Cloudflare Pages Benefits

✅ **Global CDN**: 200+ data centers worldwide  
✅ **Edge Functions**: API routes run at the edge  
✅ **Zero Cold Starts**: Always-warm functions  
✅ **Unlimited Bandwidth**: Free tier includes unlimited bandwidth  
✅ **Automatic HTTPS**: Free SSL certificates  
✅ **DDoS Protection**: Built-in security  
✅ **Auto Deployment**: Push to Git = Auto deploy  

---

## 💰 Pricing (Free Tier)

**Cloudflare Pages:**
- ✅ 500 builds/month
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ Unlimited sites

**Neon Database:**
- ✅ 512 MB storage
- ✅ Unlimited databases
- ✅ Auto-scaling

**Gmail SMTP:**
- ✅ 500 emails/day
- ✅ Completely free

**Total Cost: $0/month** 🎉

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Cloudflare Pages project created
- [ ] All environment variables added
- [ ] Gmail app password configured
- [ ] Database migrations run (`npm run db:migrate:neon`)
- [ ] Test build succeeds (`npm run pages:build`)
- [ ] Local preview works (`npm run pages:preview`)
- [ ] Contact form tested
- [ ] Email notifications working
- [ ] All pages load correctly
- [ ] Mobile responsive checked
- [ ] Custom domain configured (optional)

---

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Neon Database](https://neon.tech/docs)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Resend API](https://resend.com/docs)

---

## 🎯 Quick Command Reference

```bash
# Development
npm run dev                  # Start dev server
npm run pages:build          # Build for Cloudflare
npm run pages:preview        # Preview locally

# Database
npm run db:migrate:neon      # Run migrations on Neon

# Deployment
npx wrangler login           # Login to Cloudflare
npm run pages:deploy         # Deploy to Cloudflare Pages

# Testing
npm run type-check           # TypeScript check
npm run lint                 # ESLint check
```

---

## 🎉 You're Ready!

Your website is now **fully configured** for Cloudflare Pages deployment.

**Next Steps:**
1. Follow "Option A" deployment steps above
2. Test contact form after deployment
3. Verify emails arrive at `goyalnikhil743@gmail.com`
4. Share your live site! 🚀

**Your site will be live at:**
```
https://iitdeveloper.pages.dev
```

**Questions?** Check the troubleshooting section above or Cloudflare Pages documentation.

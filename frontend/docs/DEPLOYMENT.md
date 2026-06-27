# Deployment Guide

Complete instructions for deploying the IITDEVELOPER website to production.

---

## Table of Contents

1. [Pre-deployment Checklist](#1-pre-deployment-checklist)
2. [Vercel Deployment (Primary)](#2-vercel-deployment-primary)
3. [Netlify Deployment (Alternative)](#3-netlify-deployment-alternative)
4. [Environment Variables Setup](#4-environment-variables-setup)
5. [Custom Domain: iitdeveloper.com](#5-custom-domain-iitdevelopercom)
6. [Redirects](#6-redirects)
7. [Build Configuration](#7-build-configuration)
8. [Post-deployment Verification](#8-post-deployment-verification)
9. [Rollback Instructions](#9-rollback-instructions)

---

## 1. Pre-deployment Checklist

Complete every item before deploying to production.

### Code & Content
- [ ] Run `npm run build` locally — zero errors (warnings are acceptable)
- [ ] Run `npm run type-check` — zero TypeScript errors
- [ ] Run `npm run lint` — zero lint errors
- [ ] Search codebase for `REQUIRED_` — replace all placeholder strings
- [ ] Verify `featureFlags.showTestimonials = false` if testimonials are not owner-verified
- [ ] Verify `featureFlags.showVerifiedStats = false` if stats are unverified
- [ ] Confirm `siteConfig.url = 'https://iitdeveloper.com'` in `src/lib/config/site.ts`

### Database
- [ ] `DATABASE_URL` is set and points to the production Neon database
- [ ] `npm run db:migrate:neon` has been run against the production database
- [ ] Verify the `leads`, `estimates`, `email_logs` tables exist in Neon console

### Email
- [ ] All SMTP variables are set: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- [ ] Test email sends correctly (see [FORM_AND_EMAIL_SETUP.md](./FORM_AND_EMAIL_SETUP.md))

### SEO & Public
- [ ] `NEXT_PUBLIC_APP_URL=https://iitdeveloper.com` is set
- [ ] `NEXT_PUBLIC_BOOKING_URL` is set to a valid scheduling link
- [ ] OG image exists at `public/og-image.jpg` (1200×630px)
- [ ] Logo exists at `public/logo.png`
- [ ] Favicon exists at `public/favicon.ico`

---

## 2. Vercel Deployment (Primary)

Vercel is the recommended platform for Next.js 14 App Router projects. It provides zero-config builds, automatic SSL, edge caching, and preview deployments on every pull request.

### 2.1 First-time Setup

**Prerequisites:** A GitHub account with the repository pushed, and a Vercel account.

#### Step 1 — Install Vercel CLI (optional but recommended)

```bash
npm install -g vercel
```

#### Step 2 — Connect Repository via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub account and find `iitdeveloper_website_2.0`
4. Click **Import**

#### Step 3 — Configure Project Settings

In the **Configure Project** screen:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js (auto-detected) |
| **Root Directory** | `iit-developer_website/frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `npm install` |
| **Node.js Version** | 18.x or 20.x |

> [!IMPORTANT]
> Setting the **Root Directory** to `iit-developer_website/frontend` is critical because the Next.js app is not at the repository root.

#### Step 4 — Add Environment Variables

Before clicking **Deploy**, add all production environment variables. See [Section 4](#4-environment-variables-setup) for the full list.

#### Step 5 — Deploy

Click **Deploy**. Vercel will:
- Clone the repository
- Install dependencies (`npm install`)
- Run `npm run build`
- Deploy to a `.vercel.app` preview URL

The first deployment is to a preview URL. After adding and verifying the custom domain, traffic will route correctly.

---

### 2.2 Subsequent Deployments

Every push to the `main` branch triggers an automatic production deployment. Every push to any other branch creates a preview deployment with a unique URL.

To deploy manually from the CLI:

```bash
cd iit-developer_website/frontend
vercel --prod
```

---

### 2.3 Vercel Project Settings Reference

After the initial deployment, review these settings in the Vercel dashboard:

**Settings → General**
- Node.js Version: `18.x`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Settings → Git**
- Production Branch: `main`
- Preview Branches: all other branches

**Settings → Functions**
- Default region: choose the region nearest your users (e.g., `iad1` for US East, `bom1` for Mumbai)

---

## 3. Netlify Deployment (Alternative)

Use Netlify if you prefer its workflow or already have a Netlify account. A `netlify.toml` is already present in the repository root.

### Existing `netlify.toml` (repository root)

```toml
[build]
  base    = "frontend"
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

> [!NOTE]
> The `netlify.toml` `base` is set to `frontend` because Netlify resolves paths relative to the monorepo root (`iit-developer_website/`). Ensure this path is correct for your repository structure.

### 3.1 First-time Setup

#### Step 1 — Import from Git

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
2. Connect to GitHub and select your repository
3. Set the **Base directory** to `iit-developer_website/frontend`
4. Build command: `npm run build`
5. Publish directory: `.next`

#### Step 2 — Install Next.js Plugin

Netlify requires the `@netlify/plugin-nextjs` plugin to properly handle Next.js 14 App Router features (Server Components, API routes, ISR). This is already declared in `netlify.toml`. Netlify will install it automatically.

If it is not installed automatically:
```bash
npm install @netlify/plugin-nextjs --save-dev
```

#### Step 3 — Add Environment Variables

Go to **Site configuration → Environment variables** and add all production variables. See [Section 4](#4-environment-variables-setup).

#### Step 4 — Deploy

Click **Deploy site**. Netlify will run the build and publish.

### 3.2 Netlify vs Vercel Feature Comparison

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Next.js 14 App Router support | Native | Via plugin |
| Preview deployments | ✅ | ✅ |
| Custom domains | ✅ | ✅ |
| Edge functions | ✅ | ✅ |
| Image optimisation | Native (`next/image`) | Requires configuration |
| Server Components (streaming) | Native | Via plugin |
| Free tier | Generous | Generous |

**Recommendation:** Use Vercel for the best Next.js 14 compatibility.

---

## 4. Environment Variables Setup

### On Vercel

1. Open your project in the [Vercel dashboard](https://vercel.com)
2. Go to **Settings → Environment Variables**
3. Add each variable with its name, value, and environment scope:
   - **Production** — live site
   - **Preview** — pull request previews (use test/staging values here)
   - **Development** — `vercel dev` local

**Required production variables:**

```
NEXT_PUBLIC_APP_URL         = https://iitdeveloper.com
DATABASE_URL                = postgres://...?sslmode=require
SMTP_HOST                   = mail.iitdeveloper.com
SMTP_PORT                   = 465
SMTP_SECURE                 = true
SMTP_USER                   = info@iitdeveloper.com
SMTP_PASS                   = <your-smtp-password>
FROM_EMAIL                  = info@iitdeveloper.com
FROM_NAME                   = IIT Developer
SALES_EMAIL                 = info@iitdeveloper.com
NEXT_PUBLIC_BOOKING_URL     = https://calendly.com/iitdeveloper/...
NEXT_TELEMETRY_DISABLED     = 1
```

> [!CAUTION]
> Never paste `SMTP_PASS` or `DATABASE_URL` into any public repository, issue, or chat message. Use the hosting platform's secrets manager only.

### On Netlify

1. Go to **Site configuration → Environment variables → Add a variable**
2. Add each key-value pair
3. Scopes: **All** (applies to production and deploy previews)

To apply new environment variables to a deployed site, trigger a redeploy:
- Vercel: push an empty commit or click **Redeploy** in the dashboard
- Netlify: click **Trigger deploy → Clear cache and deploy site**

---

## 5. Custom Domain: iitdeveloper.com

The canonical domain is **`https://iitdeveloper.com`** (non-www). All `www.iitdeveloper.com` traffic must redirect to the non-www version with a 301.

### 5.1 Add Domain on Vercel

1. Go to **Settings → Domains**
2. Add `iitdeveloper.com` — click **Add**
3. Add `www.iitdeveloper.com` — click **Add**
4. Set `iitdeveloper.com` as the **primary domain**
5. Vercel will automatically configure `www` → non-www 301 redirect

### 5.2 DNS Configuration

Update your domain registrar's DNS records to point to Vercel:

**For Vercel (recommended — uses Vercel DNS):**
Transfer DNS to Vercel, or add the following records at your registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

**For Netlify:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `75.2.60.5` | 3600 |
| `CNAME` | `www` | `<your-site>.netlify.app` | 3600 |

> [!NOTE]
> DNS propagation can take up to 48 hours, though it typically completes in under 30 minutes.

### 5.3 SSL Certificate

Both Vercel and Netlify automatically provision and renew **Let's Encrypt** SSL certificates once DNS is pointing correctly. No manual configuration is needed.

Verify SSL is working:
```bash
curl -I https://iitdeveloper.com
# Should return: HTTP/2 200 with strict-transport-security header
```

### 5.4 www → non-www Redirect

Vercel handles this automatically when you set the primary domain to `iitdeveloper.com`.

On Netlify, add to `netlify.toml`:
```toml
[[redirects]]
  from   = "https://www.iitdeveloper.com/*"
  to     = "https://iitdeveloper.com/:splat"
  status = 301
  force  = true
```

---

## 6. Redirects

Application-level redirects are handled by Next.js in `next.config.js`. See [URL_REDIRECT_MAP.md](./URL_REDIRECT_MAP.md) for the full redirect table.

The current `next.config.js` does not yet include an explicit `redirects()` array. Add one following this pattern:

```js
// next.config.js
const nextConfig = {
  // ... existing config ...

  async redirects() {
    return [
      {
        source: '/services/devops-cloud',
        destination: '/services/cloud-devops',
        permanent: true, // 301
      },
      {
        source: '/blog/:path*',
        destination: '/insights/:path*',
        permanent: true,
      },
      // Add all redirects from URL_REDIRECT_MAP.md
    ];
  },
};
```

These redirects run at the edge (before the page renders), so they do not affect Lighthouse scores.

---

## 7. Build Configuration

### Build Command

```bash
npm run build
```

This runs `next build`, which:
1. Type-checks all TypeScript files
2. Compiles all pages and API routes
3. Optimises and bundles JavaScript
4. Generates static pages where possible
5. Outputs build artefacts to `.next/`

### Output Directory

```
.next/
```

### Node.js Version

**Minimum: 18.x** (LTS)  
**Recommended: 20.x** (current LTS)

Set the Node version in Vercel: **Settings → General → Node.js Version → 20.x**

### Key Build Flags (from `next.config.js`)

| Option | Value | Reason |
|--------|-------|--------|
| `reactStrictMode` | `true` | Catches common React bugs in development |
| `swcMinify` | `true` | Faster minification using the SWC compiler |
| `eslint.ignoreDuringBuilds` | `true` | Prevents lint errors from blocking CI builds |
| `typescript.ignoreBuildErrors` | `true` | Prevents TS errors from blocking builds (fix errors separately with `npm run type-check`) |
| `images.formats` | `['avif', 'webp']` | Modern image formats for better performance |
| `optimizePackageImports` | `['lucide-react', 'framer-motion']` | Tree-shakes large icon/animation libraries |

> [!WARNING]
> `ignoreBuildErrors: true` means TypeScript errors will not fail the build. Run `npm run type-check` in CI separately to catch type errors before they reach production.

---

## 8. Post-deployment Verification

Run these checks immediately after deploying to production.

### 8.1 Core Pages

```bash
# Check homepage returns 200
curl -o /dev/null -s -w "%{http_code}" https://iitdeveloper.com
# Expected: 200

# Check www → non-www redirect
curl -o /dev/null -s -w "%{http_code}" https://www.iitdeveloper.com
# Expected: 301

# Check 404 page
curl -o /dev/null -s -w "%{http_code}" https://iitdeveloper.com/this-page-does-not-exist
# Expected: 404
```

### 8.2 API Health Check

```bash
curl https://iitdeveloper.com/api/health
# Expected: {"status":"ok","database":"connected"}
```

### 8.3 SEO Endpoints

```bash
# Sitemap
curl https://iitdeveloper.com/sitemap.xml
# Expected: XML with <urlset> and all site URLs

# Robots.txt
curl https://iitdeveloper.com/robots.txt
# Expected: User-agent directives + sitemap URL
```

### 8.4 Contact Form

1. Navigate to `https://iitdeveloper.com/contact`
2. Fill out the form with a test email address
3. Submit — expect a success toast message
4. Check the test inbox for a confirmation email
5. Check `info@iitdeveloper.com` for the lead notification email

### 8.5 Performance Baseline

Run Lighthouse from Chrome DevTools (or [PageSpeed Insights](https://pagespeed.web.dev)) on the homepage and record scores. Target: **90+** across all categories.

### 8.6 Structured Data

Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results):
- Enter `https://iitdeveloper.com`
- Confirm Organization and WebSite schemas are detected with no errors

---

## 9. Rollback Instructions

### On Vercel

1. Go to the project dashboard → **Deployments**
2. Find the last known-good deployment (look for the green ✅ badge)
3. Click the three-dot menu → **Promote to Production**
4. The rollback is instant — no rebuild required

### On Netlify

1. Go to **Deploys**
2. Find the last stable deploy
3. Click **Publish deploy**

### Via Git (any platform)

If a bad commit was merged to `main`, revert it:

```bash
# Identify the bad commit hash
git log --oneline -10

# Revert (creates a new commit, safe for shared branches)
git revert <bad-commit-hash>
git push origin main
```

The hosting platform will automatically build the reverted code.

### Database Rollback

The database schema uses `CREATE TABLE IF NOT EXISTS` — migrations are additive and safe to re-run. There is no automatic rollback for destructive schema changes. Before any breaking migration, take a Neon database snapshot:

1. Neon Console → your project → **Branches**
2. Click **Create branch** from `main` — this is a zero-cost snapshot
3. Run the migration on the main branch
4. If something goes wrong, restore from the branch snapshot

# Production Launch Checklist

Pre-launch checklist for the IITDEVELOPER website. Work through every section before going live. Check items off as you complete them.

> [!IMPORTANT]
> This document should be reviewed on every major deployment, not just the initial launch.

**Target launch domain:** https://iitdeveloper.com  
**Last reviewed:** _(fill in before launch)_  
**Reviewed by:** _(fill in before launch)_

---

## 1. Content & Copy

- [ ] Search codebase for `REQUIRED_` — all placeholder strings have been replaced with real content
- [ ] Homepage hero headline and subheadline reviewed and finalised
- [ ] All service page descriptions are accurate and complete
- [ ] About page founder bio is accurate
- [ ] Founding year confirmed: **2020** — do not change without evidence
- [ ] MSME registration year confirmed: **2020**
- [ ] `featureFlags.showTestimonials` is set to `false` (testimonials disabled until quotes are owner-verified)
- [ ] `featureFlags.showVerifiedStats` is set to `false` (stats disabled until figures are verified with evidence)
- [ ] No unverified revenue claims, client counts, or project counts appear anywhere on the site
- [ ] All "30+ technologies" and "4+ years experience" claims reviewed — these are conservative and defensible ✅
- [ ] Privacy Policy page exists and is accurate
- [ ] Terms of Service page exists and is accurate
- [ ] Cookie policy (if required) exists
- [ ] Contact email `info@iitdeveloper.com` is displayed correctly in footer and contact page
- [ ] All external links (social, booking, GitHub) open correctly or are hidden if URLs are null

---

## 2. Forms

- [ ] Contact form on `/contact` submits without error
- [ ] Form validation shows appropriate error messages for:
  - [ ] Empty required fields (name, email, message)
  - [ ] Invalid email format
  - [ ] Excessively long inputs
- [ ] Success toast appears after form submission
- [ ] Honeypot field is present in the form markup (invisible to users, catches bots)
- [ ] Form data is saved to the `leads` table in Neon — verify in Neon console
- [ ] Estimate form on `/estimate` works end-to-end
- [ ] PDF generation and email delivery of estimates work correctly

---

## 3. Email

- [ ] Contact form confirmation email arrives in the submitter's inbox within 2 minutes
- [ ] Lead notification email arrives in `info@iitdeveloper.com` within 2 minutes
- [ ] Confirmation email "From" shows: `IIT Developer <info@iitdeveloper.com>`
- [ ] Emails are not landing in spam (check spam folder on first test)
- [ ] Email subject lines are clear and professional
- [ ] Email HTML renders correctly on Gmail, Outlook, and Apple Mail
- [ ] SMTP credentials confirmed: host `mail.iitdeveloper.com`, port `465`, SSL enabled
- [ ] `SMTP_PASS` is set in the production environment variable store — not hardcoded

---

## 4. Booking URL

- [ ] `NEXT_PUBLIC_BOOKING_URL` is set to a valid scheduling link (Calendly, Cal.com, etc.)
- [ ] Clicking "Book a Discovery Call" in the hero section opens the scheduling page
- [ ] Clicking "Book a Discovery Call" in the navigation opens the scheduling page
- [ ] Scheduling page branding (logo, colours, availability) has been configured
- [ ] At least 3 upcoming time slots are available in the booking calendar

---

## 5. SEO Fundamentals

- [ ] `<title>` tag is correct on the homepage (check with browser "View Source")
- [ ] Meta description is present and under 160 characters on the homepage
- [ ] All major pages have unique `<title>` and `<meta name="description">` tags
- [ ] Canonical `<link rel="canonical">` is set correctly on all pages (non-www HTTPS)
- [ ] No pages are incorrectly set to `noindex`
- [ ] `/robots.txt` is accessible at `https://iitdeveloper.com/robots.txt`
- [ ] `/sitemap.xml` is accessible at `https://iitdeveloper.com/sitemap.xml`
- [ ] Sitemap contains all intended pages (homepage, about, contact, all service pages, estimate)
- [ ] Sitemap does not contain `/api/`, `/admin/`, or private routes
- [ ] `GPTBot` and `ChatGPT-User` are allowed in `robots.txt` (for GEO/AEO — already configured ✅)
- [ ] OG image exists at `https://iitdeveloper.com/og-image.jpg` (1200×630px)
- [ ] OG image loads correctly when URL is tested in the Facebook Sharing Debugger

---

## 6. Analytics

- [ ] Choose an analytics provider:
  - [ ] Google Analytics 4 (GA4) — add `gtag.js` or use `@next/third-parties/google`
  - [ ] Plausible Analytics — privacy-friendly, GDPR-compliant, no cookie banner required
  - [ ] Fathom Analytics — privacy-friendly alternative
- [ ] Analytics script is loading correctly (check browser Network tab)
- [ ] A test pageview event fires on the homepage
- [ ] No personal data is sent to analytics without consent (GDPR consideration)
- [ ] Analytics is excluded from local development (check for environment guards)

---

## 7. Google Search Console

- [ ] Domain property `https://iitdeveloper.com` added to [Search Console](https://search.google.com/search-console)
- [ ] Domain ownership verified (HTML tag method → set `NEXT_PUBLIC_GOOGLE_VERIFICATION`)
- [ ] Sitemap submitted: `https://iitdeveloper.com/sitemap.xml`
- [ ] "URL Inspection" test on homepage returns "URL is on Google" or "URL is not on Google" (not an error)
- [ ] No coverage errors reported under **Indexing → Pages**
- [ ] Rich Results test passes for homepage structured data

---

## 8. Bing Webmaster Tools

- [ ] Site added to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Domain ownership verified (HTML meta tag → set `NEXT_PUBLIC_BING_VERIFICATION`)
- [ ] Sitemap submitted: `https://iitdeveloper.com/sitemap.xml`
- [ ] No crawl errors reported

---

## 9. DNS & Domain

- [ ] `https://iitdeveloper.com` resolves and loads the homepage
- [ ] `https://www.iitdeveloper.com` redirects to `https://iitdeveloper.com` with HTTP **301**
- [ ] `http://iitdeveloper.com` redirects to `https://iitdeveloper.com` with HTTP **301**
- [ ] DNS propagation is complete worldwide (check with [whatsmydns.net](https://www.whatsmydns.net))
- [ ] No "This site can't be reached" or DNS errors in any major region

---

## 10. SSL / HTTPS

- [ ] SSL certificate is valid (green padlock in browser)
- [ ] Certificate covers both `iitdeveloper.com` and `www.iitdeveloper.com`
- [ ] Certificate expiry date is more than 30 days away
- [ ] `Strict-Transport-Security` (HSTS) header is present:
  ```bash
  curl -I https://iitdeveloper.com | grep strict-transport
  ```
- [ ] No mixed content warnings in browser console (no HTTP resources on HTTPS pages)

---

## 11. Performance

- [ ] Run Lighthouse on homepage — record all scores
  - [ ] Performance: ≥ 90
  - [ ] Accessibility: ≥ 90
  - [ ] Best Practices: ≥ 90
  - [ ] SEO: ≥ 95
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) on `https://iitdeveloper.com` — record Core Web Vitals:
  - [ ] LCP (Largest Contentful Paint): < 2.5s
  - [ ] FID / INP (Interaction to Next Paint): < 200ms
  - [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] No images larger than 500KB are loaded without lazy loading
- [ ] `next/image` is used for all critical above-the-fold images
- [ ] Three.js / Framer Motion animations do not cause jank on mid-range devices
- [ ] Fonts load with `display: swap` (already configured via `next/font` ✅)

---

## 12. Accessibility

- [ ] Run [axe DevTools](https://www.deque.com/axe/) or [WAVE](https://wave.webaim.org) on the homepage
- [ ] Zero critical accessibility violations
- [ ] All images have meaningful `alt` text (decorative images have `alt=""`)
- [ ] All form inputs have associated `<label>` elements
- [ ] Focus states are visible on all interactive elements (keyboard navigation works)
- [ ] Colour contrast ratio is ≥ 4.5:1 for body text, ≥ 3:1 for large text
- [ ] Skip-to-content link is present for keyboard users

---

## 13. Mobile & Cross-browser

- [ ] Homepage tested on a real iOS device (Safari)
- [ ] Homepage tested on a real Android device (Chrome)
- [ ] Navigation works correctly on mobile (hamburger menu or mobile nav)
- [ ] Contact form is usable on mobile (correct keyboard types, no viewport zoom)
- [ ] All CTAs are tappable (minimum 44×44px touch target)
- [ ] Desktop browser testing: Chrome, Firefox, Safari, Edge
- [ ] No horizontal scrolling on any viewport width

---

## 14. Spam Protection

- [ ] Honeypot field is present in the contact form (hidden field that bots fill, humans don't)
- [ ] Contact form rejects submissions with the honeypot field filled
- [ ] Rate limiting is configured on the `/api/leads` endpoint (to prevent spam floods)
- [ ] Cloudflare Bot Fight Mode is enabled (if using Cloudflare as a proxy)
- [ ] Consider adding reCAPTCHA v3 if spam persists after launch

---

## 15. 404 & Error Pages

- [ ] Custom 404 page exists (`src/app/not-found.tsx`)
- [ ] 404 page displays brand styling (not a blank page)
- [ ] 404 page has a link back to the homepage
- [ ] Visiting a non-existent URL (e.g. `/xyz-does-not-exist`) shows the custom 404
- [ ] Server error handling (500) is graceful — check `error.tsx` files

---

## 16. Redirects

- [ ] All redirects in [URL_REDIRECT_MAP.md](./URL_REDIRECT_MAP.md) are implemented in `next.config.js`
- [ ] Test each redirect manually:
  - [ ] `/services/devops-cloud` → `/services/cloud-devops` (301)
  - [ ] `/services/ai-agents` → `/services/ai-automation` (301)
  - [ ] `/services/ai-workflows` → `/services/ai-automation` (301)
  - [ ] `/blog` → `/insights` (301)
  - [ ] `/case-studies` → `/work` (301)
  - [ ] `/docs` → `/contact` (301)
  - [ ] `/api-docs` → `/contact` (301)
  - [ ] `/support` → `/contact` (301)
  - [ ] `/pricing-estimator` → `/estimate` (301)
- [ ] Redirects return HTTP 301 (not 302)
- [ ] No redirect chains (A → B → C should be collapsed to A → C)
- [ ] No redirect loops

---

## 17. Structured Data

- [ ] Organization schema is present on every page (check `<head>` source)
- [ ] WebSite schema is present on every page
- [ ] Service schema is present on individual service pages
- [ ] Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results)
  - [ ] `https://iitdeveloper.com` — Organization, WebSite schemas detected
  - [ ] `https://iitdeveloper.com/services/website-development` — Service schema detected
- [ ] Validate with [schema.org validator](https://validator.schema.org)
  - [ ] No critical errors
  - [ ] No warnings about missing recommended properties

---

## 18. Social Preview (Open Graph)

- [ ] Test homepage OG preview with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] OG title renders correctly
  - [ ] OG description is under 200 characters
  - [ ] OG image loads (1200×630px, under 8MB)
- [ ] Test with [Twitter/X Card Validator](https://cards-dev.twitter.com/validator)
  - [ ] `summary_large_image` card type renders
- [ ] Test with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] OG image clearly shows the IITDEVELOPER brand/logo

---

## 19. Legal & Compliance

- [ ] Privacy Policy URL: `/privacy` — page exists and is up to date
- [ ] Terms of Service URL: `/terms` — page exists and is up to date
- [ ] Cookie notice/banner is displayed if cookies are used for analytics
- [ ] GDPR compliance: analytics opt-out or consent mechanism is in place (for EU visitors)
- [ ] No third-party scripts load before cookie consent (if consent is required)

---

## 20. Final Sign-off

- [ ] All items above are checked ✅
- [ ] Team has reviewed the live staging/preview URL
- [ ] DNS cutover time has been scheduled (low-traffic window recommended)
- [ ] Rollback plan is documented (see [DEPLOYMENT.md → Rollback](./DEPLOYMENT.md#9-rollback-instructions))
- [ ] Monitoring/alerting is set up (Vercel Analytics, UptimeRobot, or equivalent)
- [ ] Domain registrar auto-renewal is enabled

---

**Signed off by:** ___________________________  
**Date:** ___________________________  
**Deployment URL confirmed live:** ___________________________

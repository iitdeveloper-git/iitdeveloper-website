# URL Redirect Map

All permanent (301) redirects for the IITDEVELOPER website. This document is the single source of truth for URL routing changes.

> [!IMPORTANT]
> Every redirect listed here must be implemented in `next.config.js` before launch. Test each one manually after deployment.

---

## Implementation

Redirects are handled by the Next.js `redirects()` async function in `next.config.js`. These run at the **edge** — before page rendering — so they are fast and do not count as a page request for analytics.

### How to Add a Redirect

Open `next.config.js` and add an entry to the `redirects()` array:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ... other config ...

  async redirects() {
    return [
      // Simple redirect
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,  // true = 301, false = 302
      },

      // Wildcard redirect (preserves sub-paths)
      {
        source: '/blog/:path*',
        destination: '/insights/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

**`permanent: true`** — HTTP 301 (search engines transfer link equity to the new URL)  
**`permanent: false`** — HTTP 302 (temporary; no link equity transfer — use only for A/B tests)

---

## Redirect Table

### Service Page Renames

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `/services/devops-cloud` | `/services/cloud-devops` | 301 | Pillar rename to match canonical service naming |
| `/services/ai-agents` | `/services/ai-automation` | 301 | Pillar consolidation — AI Agents merged into AI Automation |
| `/services/ai-workflows` | `/services/ai-automation` | 301 | Pillar consolidation — AI Workflows merged into AI Automation |

**Context:** The service taxonomy was reorganised into four core pillars. Old service URLs must redirect to prevent broken inbound links and preserve any accumulated SEO authority.

---

### Section Renames

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `/blog` | `/insights` | 301 | Section renamed from "Blog" to "Insights" — more authoritative brand positioning |
| `/blog/:path*` | `/insights/:path*` | 301 | All blog article URLs redirect with path preserved |
| `/case-studies` | `/work` | 301 | Section renamed from "Case Studies" to "Work" — simpler, portfolio-style naming |
| `/case-studies/:path*` | `/work/:path*` | 301 | All case study URLs redirect with path preserved |

---

### Removed Routes

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `/docs` | `/contact` | 301 | Documentation route removed; visitors routed to contact instead |
| `/api-docs` | `/contact` | 301 | API docs route removed; no public API documentation planned |
| `/support` | `/contact` | 301 | Support route removed; all support handled via contact form |

---

### Canonical Route Corrections

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `/pricing-estimator` | `/estimate` | 301 | `/estimate` is the canonical route; old URL from early development |

> [!NOTE]
> The current `sitemap.ts` still includes `/pricing-estimator` in the routes array. Remove it after this redirect is live to prevent the old URL from being indexed.

---

### www → non-www (Handled at Platform Level)

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `https://www.iitdeveloper.com/*` | `https://iitdeveloper.com/*` | 301 | Canonical domain is non-www; all www traffic redirects |

This redirect is configured at the **hosting platform level** (Vercel or Netlify), not in `next.config.js`. See [DEPLOYMENT.md → Custom Domain](./DEPLOYMENT.md#5-custom-domain-iitdevelopercom) for setup instructions.

---

### HTTP → HTTPS (Handled at Platform Level)

| Old URL | New URL | Status | Reason |
|---------|---------|:------:|--------|
| `http://iitdeveloper.com/*` | `https://iitdeveloper.com/*` | 301 | HTTPS enforced; HTTP deprecated |

Also handled at the platform level — Vercel and Netlify enforce HTTPS automatically.

---

## Complete `next.config.js` Redirects Block

Copy this block into `next.config.js` (inside `nextConfig`):

```js
async redirects() {
  return [
    // ── Service page renames ──────────────────────────────────────────────
    {
      source: '/services/devops-cloud',
      destination: '/services/cloud-devops',
      permanent: true,
    },
    {
      source: '/services/ai-agents',
      destination: '/services/ai-automation',
      permanent: true,
    },
    {
      source: '/services/ai-workflows',
      destination: '/services/ai-automation',
      permanent: true,
    },

    // ── Section renames ───────────────────────────────────────────────────
    {
      source: '/blog',
      destination: '/insights',
      permanent: true,
    },
    {
      source: '/blog/:path*',
      destination: '/insights/:path*',
      permanent: true,
    },
    {
      source: '/case-studies',
      destination: '/work',
      permanent: true,
    },
    {
      source: '/case-studies/:path*',
      destination: '/work/:path*',
      permanent: true,
    },

    // ── Removed routes → contact ──────────────────────────────────────────
    {
      source: '/docs',
      destination: '/contact',
      permanent: true,
    },
    {
      source: '/api-docs',
      destination: '/contact',
      permanent: true,
    },
    {
      source: '/support',
      destination: '/contact',
      permanent: true,
    },

    // ── Canonical route corrections ───────────────────────────────────────
    {
      source: '/pricing-estimator',
      destination: '/estimate',
      permanent: true,
    },
  ];
},
```

---

## Testing Redirects

After deploying, test each redirect with `curl`:

```bash
# Check status code and Location header
curl -o /dev/null -s -w "Status: %{http_code}\nLocation: %{redirect_url}\n" \
  https://iitdeveloper.com/services/devops-cloud

# Expected output:
# Status: 301
# Location: https://iitdeveloper.com/services/cloud-devops
```

Or use a browser with the Network tab open. Look for:
- Status code `301`
- `Location` response header pointing to the new URL
- Final destination page loads with status `200`

---

## Redirect Anti-patterns to Avoid

| Anti-pattern | Problem | Fix |
|---|---|---|
| Redirect chains: `/a` → `/b` → `/c` | Each hop loses ~10–15% link equity; adds latency | Collapse to `/a` → `/c` directly |
| 302 instead of 301 for permanent moves | Search engines do not transfer link equity | Use `permanent: true` |
| Redirecting to a 404 page | Destroys link equity permanently | Redirect to the closest relevant live page |
| Redirect loops | Site becomes inaccessible | Test with curl before deploying |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-06-26 | Initial redirect map created for v2.0 launch | Documentation |

# SEO, GEO and AEO implementation

- Canonical host: `https://iitdeveloper.com`
- Metadata helper: `frontend/src/lib/seo.ts`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`; Netlify deploy previews are blocked when `CONTEXT=deploy-preview`.
- Structured data: Organization and WebSite site-wide; Service, CreativeWork, and BlogPosting on matching visible pages.
- Redirects: `frontend/next.config.js`

GEO/AEO readiness is implemented through clear definitions, consistent entity information, answer-first service copy, visible dates and authorship, original articles, case-study evidence, and structured data that matches visible content.

After launch:

1. Set Google and Bing verification variables.
2. Submit `https://iitdeveloper.com/sitemap.xml`.
3. Validate representative pages with Schema.org and search-engine rich-result tools.
4. Monitor indexation, branded mentions, citations where measurable, and article refresh dates.

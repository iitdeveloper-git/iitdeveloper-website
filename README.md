# IITDEVELOPER website

Production website for IITDEVELOPER, positioned around AI systems, cloud and DevOps, SaaS development, and SEO/GEO/AI visibility.

## Local development

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
cd frontend
npm run type-check
npm run lint
npm run build
```

## Content updates

- Services: `frontend/src/content/site.ts`
- Case studies: `frontend/src/content/work.ts`
- Insights: `frontend/src/content/insights.ts`
- Global metadata/schema: `frontend/src/lib/seo.ts`

Optional business information is hidden when its environment variable is empty. Do not publish unverified statistics, testimonials, locations, social profiles, or case-study outcomes.

See `docs/` for launch, forms, SEO/GEO, deployment, environment, and redirect documentation.

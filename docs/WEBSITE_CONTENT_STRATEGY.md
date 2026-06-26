# Website content strategy

## Positioning

IITDEVELOPER is presented as an engineering-led agency founded in 2020 and relaunched for the AI era. The website avoids implying uninterrupted full-scale operations.

## Primary service architecture

1. AI Systems & Intelligent Automation
2. Cloud, DevOps & Platform Engineering
3. SaaS & Custom Software Development
4. SEO, GEO & AI Search Visibility

Legacy capabilities remain available through redirects or the “Additional capabilities” section, but do not compete with the four pillars.

## Content rules

- Add only verified outcomes and approved testimonials.
- Label internal work as “IITDEVELOPER Product Lab.”
- Label unfinished work as “In Development.”
- Omit unavailable case-study fields instead of inventing values.
- Keep SEO, AEO, GEO, and AIO explanations precise; never guarantee rankings or AI citations.

## Adding content

- Add a service in `frontend/src/content/site.ts` and create a route under `frontend/src/app/services/`.
- Add a case study in `frontend/src/content/work.ts`; the route is statically generated.
- Add an article in `frontend/src/content/insights.ts`; include published/updated dates, summary, original sections, and a related service.

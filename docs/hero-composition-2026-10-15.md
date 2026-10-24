# Hero composition refinement

The existing H1 now opens with a full-width line on desktop, followed by an inset two-line result. Description and CTAs align to the inset. The architectural system occupies a separate portion of the shared page grid beneath the opening line; the metric strip closes the composition. Desktop uses a 100svh minimum with content-driven growth. Smaller screens retain readable sizing and natural scrolling.

Moved EngineeringLab into Hero before the metrics to make the mobile/tablet reading order headline, description, CTAs, visual, metrics. No copy, links, metadata, brand tokens, navigation or other sections changed. The existing SVG and its controls remain intact.

Modified: Hero.tsx, HeroEditorial.css, and only the hero import/placement in app/page.tsx.

Validation: TypeScript passed; production build passed (36 routes, existing GitHub API fallback warnings); production HTML retained all 233 original text items, links, media, SEO metadata and section count. Browser inspection at 1440, 1024, 768 and 390px. Exact single H1 confirmed. No hero horizontal overflow at 1024/390px; mobile metrics follow the visual without overlap. Existing lint command remains blocked by incompatible ESLint options. No deployment.

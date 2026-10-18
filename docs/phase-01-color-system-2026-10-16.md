# Phase 01 — Website Color System

Implemented a cohesive obsidian, warm ivory, and electric lime palette across the existing website without changing content, layout, animation behavior, routes, metadata, forms, or media.

## Tokens

- Base background: `#0D1215`
- Surface background: `#172126`
- Elevated surface: `#223038`
- Alternate section: `#10191D`
- Accent: `#8BE0BA`
- Primary text: `#F0F6F3`
- Secondary text: `#B4C6C1`
- Border: `#35484A`
- Dark accent text: `#10261E`

The semantic CSS variables remain the source of truth. Tailwind defaults now reference those variables, while existing component-level brand literals were updated to their matching palette aliases.

Semantic roles now include `surface`, `surface-elevated`, `surface-muted`, `text-primary`, `text-secondary`, `text-inverse`, `accent`, `border-strong`, button states, `focus-ring`, and selection colors. A `[data-theme='light']` compatibility variant preserves the selector while keeping the approved dark-first Graphite surfaces.

Homepage section wrappers now inherit semantic section variants: dark hero/technology/testimonials/contact/footer surfaces and dark Graphite surfaces for services/client/open-source/process surfaces. The variants alter color inheritance only; component structure, content, media, and user-controlled theme behavior remain unchanged.

The discovered route inventory includes homepage, about, careers, case studies, contact, cookies, estimate flows, open-source, projects, privacy, all service detail routes, team, terms, and shared error handling. They inherit the same root tokens through the shared layout. The original logo SVG colors were explicitly restored and client/product imagery remains unchanged.

Contrast validation: primary text on base is 17.21:1, secondary text on base is 10.58:1, accent on base is 12.09:1, dark accent text on accent is 10.22:1, primary text on surface is 14.96:1, and the derived interactive border is 3.78:1. Focus rings use electric lime; success, error, disabled, hover, and selection tokens are defined semantically.

Validation: TypeScript passed, production build passed with 36 routes, `git diff --check` passed, and the live homepage reports the new background, primary, and secondary variables. Existing lint remains blocked by the repository's Next/ESLint option mismatch. No deployment performed.

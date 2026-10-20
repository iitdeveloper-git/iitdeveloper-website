# IITDeveloper Color System Audit

Audit date: 2026-10-16

## Theme architecture

- Next.js App Router uses `frontend/src/app/layout.tsx` as the shared root layout.
- `frontend/src/app/styles.css` is the active global stylesheet and is imported by the root layout.
- Tailwind CSS is configured in `frontend/tailwind.config.ts` with `darkMode: 'class'` and semantic color extensions.
- `styles-backup.css` and `globals.css` mirror the token source for legacy/recovery use; they are kept aligned with the active stylesheet.
- No runtime `ThemeProvider` or forced theme switch was found. The default surface is dark; `[data-theme='light']` remains as a compatibility selector but resolves to the same dark-first Graphite surfaces, with no hydration-time theme mutation.
- Homepage section wrappers in `homepage.css` provide semantic light/dark inheritance without changing component structure.

## Graphite Terminal token foundation

| Role | Value |
| --- | --- |
| Base background | `#0D1215` |
| Surface background | `#172126` |
| Elevated surface | `#223038` |
| Alternate section | `#10191D` |
| Accent | `#8BE0BA` |
| Primary text | `#F0F6F3` |
| Secondary text | `#B4C6C1` |
| Border | `#35484A` |
| Dark accent text | `#10261E` |
| Derived border-strong | `#52706F` |
| Focus/active accent | `#8BE0BA` |

Semantic variables now include backgrounds, surfaces, text roles, accent/action roles, border strengths, focus ring, selection, success, error, and disabled states. Tailwind exposes the same roles through `surface-*`, `text-*`, `button-*`, `border-*`, `ring-focus`, `success`, `error`, and `disabled` utilities.

## Existing color usage

- Shared global tokens and utility classes are centralized in `styles.css`.
- Component-level SVG and canvas visuals use the approved lime/ivory/obsidian derived shades.
- Shared buttons, links, forms, modals, menus, tabs, badges, cards, and footer surfaces inherit semantic Tailwind roles.
- Client card presentation surfaces use semantic variables; client logo pixels are untouched.
- Email/PDF templates retain inline colors because they are rendered outside the browser theme, but their brand colors use the approved palette.
- Remaining literal neutrals are limited to email/PDF compatibility, functional status rendering, shadows/opacity, and protected brand artwork.

## Protected assets

- `frontend/src/components/ui/Logo.tsx` retains the original logo gradients and corner-accent colors by explicit requirement.
- Client logos, product screenshots, photography, and third-party brand artwork are not recolored.
- The `theme-color` meta value follows the approved base background and does not alter the logo.

## Route inventory

The repository currently contains these public route families:

- `/`, `/about`, `/careers`, `/case-studies`, `/contact`, `/cookies`
- `/estimate`, `/estimate/[id]`
- `/open-source`, `/projects`, `/privacy`, `/refund-policy`, `/team`, `/terms`
- `/services` plus all service detail routes: `ai-agents`, `ai-workflows`, `app-development`, `b2b-promotion`, `devops-cloud`, `ecommerce`, `graphic-design`, `marketing`, `salesforce`, `seo-smm`, `shopify-store`, and `website-development`
- Shared not-found and API surfaces inherit the root token architecture where applicable.

## Contrast findings

Measured combinations:

- Primary text on base: `17.21:1`
- Secondary text on base: `10.58:1`
- Accent on base: `12.09:1`
- Dark accent text on accent: `10.22:1`
- Primary text on surface: `14.96:1`
- Derived border-strong on base: `3.78:1`

The palette uses `#B4C6C1` for readable secondary text; muted opacity is reserved for low-emphasis metadata. It is not used for normal body text where its contrast would be insufficient. Light surfaces use the darker secondary text/border derivation for readable copy and interactive boundaries; `#DDE1D8` remains available for low-emphasis light separators.

## Validation status

- TypeScript check: passed.
- Production build: passed, 36 routes generated.
- `git diff --check`: passed.
- Lint: blocked by the repository's existing Next/ESLint option incompatibility.
- Content, SEO metadata, routes, layouts, animation behavior, forms, and media were not changed by the color migration.

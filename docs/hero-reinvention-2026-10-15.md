# Homepage hero reinvention

## Locked content before implementation

H1: `From Vision to Reality, We Build What Works`

Paragraph: `Premium web applications, intelligent AI solutions, and scalable systems built by experts who actually care about your success.`

CTAs: `Let's Talk` → `/contact`; `Explore Services` → `/services`.

Metrics: `100+` / `Projects Delivered`; `99.9%` / `Uptime SLA`; `24/7` / `Support Available`; `50+` / `Happy Clients`.

Existing supporting illustration: `Engineering lab`, `SYSTEM DESIGN`, `Ideas connected. Systems considered.`, `Pause` / `Resume`; accessible name `Connected system blueprint`; accessible description `Interface, intelligence, and infrastructure connected around a central system. An illustrative diagram, not a live system monitor.` All existing SVG geometry, labels, canvas and gradient retained.

Existing disabled estimator comment remains disabled. No claims, projects, clients or metrics added.

## Dependencies and brand

Existing Framer Motion, Lucide, Next Link and buttonVariants. No added dependencies. Actual global theme is `src/app/styles.css`, imported by layout.tsx, with existing dark root behavior. Tailwind primary #00539C, secondary #FFD662 and global text gradient `linear-gradient(135deg, #00539C 0%, #0073CC 30%, #FFD662 100%)` remain unchanged. New CSS references existing variables and colors only.

## Scope and design

Hero.tsx, EngineeringLab.tsx and new HeroEditorial.css only, plus this record. Existing uncommitted changes were retained and working copies saved under /private/tmp/iit-hero-before before edits. Editorial headline, architectural rules, frameless blueprint and a flat metric strip. Separate/connect layers control enhances the original illustration. No shared component, page layout, metadata, theme, route or other homepage section is edited.

## Validation

- `npm run type-check`: passed independently (build configuration skips built-in type validation).
- `npm run build`: passed, all 36 pages generated. Existing GitHub API DNS warnings use the open-source section's fallback; no related code changed.
- `npm run lint`: blocked by existing Next 14 / ESLint 10 option incompatibility. Dependencies/configuration deliberately left untouched.
- `git diff --check`: passed.
- Production HTML audited with the existing preservation parser: all 233 original text items present after normalizing markup whitespace; no missing original links, media or metadata; eight original sections retained. H1 text exactly matches, with one semantic H1.
- Captured working-tree DOM compared with redesigned DOM: all link labels/destinations and non-hero section text preserved. Metadata sets including canonical and JSON-LD match (tag order differed only).
- Original page.tsx and homepage.css byte-match pre-edit working snapshots. No brand token, theme, SEO, shared navigation, integration or asset file edits.
- Browser checked at 320, 390, 768, 1024, 1200 and 1440 px. Hero scroll width fits viewport; mobile/tablet drawing stays in document flow. Desktop drawing clears the metric strip.
- Separate/connect layers tested with Enter; aria-pressed and diagram state update. Pause/resume tested; original pulse pauses. CTA and illustration controls measured at 56px and 44px tall respectively.
- Existing reduced-motion CSS and media-query listeners retained; new layer transitions fall under the existing hero reduced-motion override. OS preference emulation was not available, so reduced motion was source-reviewed.
- The wider homepage shows document overflow on mobile outside the clipped hero; unrelated modules left unchanged as requested.

Screenshots saved in the task visualization directory: hero-desktop.jpg, hero-tablet.jpg, hero-mobile.jpg. No deployment performed. Only the hero is complete; other modules require separate approval.

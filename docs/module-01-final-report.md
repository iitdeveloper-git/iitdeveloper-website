# Module 01 — Final performance and preservation report

## Before Phase 6

Phase 5 production build reported homepage route size 16.6 kB and first-load JS 171 kB (Next build estimates). Hero uses the full Framer useAnimate API and motion wrappers for static content. HeroFilm mounts future supplied video after hydration, without waiting for load or visibility. No actual video or raster visual assets are currently supplied. Existing inventories record the exact original content, destinations and brand definitions.

Plan: smaller existing animation API, native static elements, defer optional desktop video until page load/idle and intersection, mobile/reduced-motion SVG or poster, pause offscreen animation, explicitly reserve visual dimensions. Scope: Hero.tsx, HeroFilm.tsx, HeroFilm.css, HeroMotion.css and preservation documentation. No dependencies or unrelated sections will be edited during Phase 6.

## Before / after (Phase 5 → Phase 6)

| Measure / behavior | Before | After |
| --- | --- | --- |
| Homepage route JS estimate | 16.6 kB | 15.8 kB |
| Homepage first-load JS estimate | 171 kB | 169 kB |
| Reveal engine | Full useAnimate + motion wrappers | Framer mini + native static markup |
| Headline entrance opacity | 0.35 → 1 | Always 1, restrained transform only |
| Optional video start | After hydration | After window load/idle, intersecting, visible tab, non-mobile, no reduced motion |
| Video preload | Desktop metadata | none |
| Offscreen signal animation | Continues | Paused |
| Visual media sizing | Aspect-ratio wrapper, flow children | Aspect-ratio wrapper, explicitly contained absolute children |
| Poster handling | Basic fallback | Lazy, async decoded, dimensions specified; load error falls back to SVG |

Bundle sizes are Next build estimates, not measured field LCP/CLS improvements. No new raster or video assets were introduced. The current inline SVG acts as a lightweight static fallback without a network request. Future poster assets should be appropriately compressed and sized when supplied; no nonexistent asset is referenced.

## Validation results

- Production build: PASS, 36 static pages generated. Type-check: PASS. Lint: attempted, blocked by pre-existing Next 14 / ESLint 10 legacy-option incompatibility.
- Exact original hero heading, paragraph, both live CTA labels/destinations, four metric values/labels, icons and commented estimator preserved.
- Production homepage inventory: 233/233 text entries, 64/64 links, 21/21 media entries, 8/8 sections preserved. 43 metadata entries checked with documented build-preload exclusions and generated-image origin normalization. 29/29 public assets byte-identical.
- Original content removed: **0**. Original text rewritten: **0**. Brand definitions modified: **0**. No new marketing copy or company claims. HeroFilm geometry and supporting labels from Phase 3 retained.
- Production HTML includes the hero and aspect-ratio reservation, and includes no video element. Text is not dependent on video or image readiness.
- Browser: original Explore Services CTA reaches /services (What We Build); original Let's Talk reaches /contact (Let's Build Something Epic). Desktop Home returns to /. Mobile Toggle menu opens navigation and About Us reaches /about (Building The Future Together). No submissions performed.
- Mobile 390px: hero scroll width 390px; film 348×348px before and after Pause/Resume. Offscreen visual is paused; on-screen Resume restores the signal animation. Desktop visual measured 382×382px. Previous Phase 5 coverage spans 320–1920px.
- Readability: original foreground/gradient colors retained; diagram remains separate from headline/paragraph/CTAs. No content is embedded in video.
- Reduced-motion conditions disable video and motion; source/CSS inspected. System preference was not toggled in the browser test. Real media decoding/loop quality remains untested because no real video was supplied. Layout sizing is verified, but no instrumented CLS/LCP benchmark was collected.
- Navigation emitted a pre-existing duplicate React key `/about` warning. Navigation source matches the protected original hash; tested routes work. Pre-existing non-hero page overflow remains. These are not reported as zero regressions or fixed.

## Scope and modified files

Phase 6 source snapshot comparison confirms only these source files changed this phase:

1. `frontend/src/components/sections/Hero.tsx` — smaller reveal API and native static markup.
2. `frontend/src/components/sections/HeroFilm.tsx` — loading/visibility gates and robust poster fallback.
3. `frontend/src/components/sections/HeroFilm.css` — reserved media containment.

Documentation changed this phase: `docs/homepage-reviewed-visual-changes.json` (reviewed Hero hash; original baseline untouched), and this report. HeroMotion.css was inspected but did not require changes. No dependencies, navigation, forms, APIs, theme files or unrelated section sources changed in Phase 6.

Module 01 working-tree files accumulated across earlier phases also include `HeroMotion.css`, `EngineeringLab.tsx`, `TechBackground.tsx`, hero rules in `frontend/src/app/homepage.css`, `frontend/src/app/page.tsx`, `frontend/scripts/check-homepage-preservation.py`, root `AGENTS.md`, and the content inventories/Phase 3–5 reports in `docs/`. The pre-existing uncommitted homepage stylesheet contains rules for other sections from earlier work; these were retained, not overwritten or expanded during Phases 3–6. Thus this report does not claim the entire accumulated working-tree diff is hero-only.

## Delivery

Local server runs at http://localhost:3000. Module 01 implementation is complete with the validation limitations above. No production deployment. Module 02 has not been started. Stop here and wait for user approval.

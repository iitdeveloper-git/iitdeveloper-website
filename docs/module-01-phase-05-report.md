# Phase 05 — Responsive experience

## Inspection and plan

Existing exact content, CTA destinations, media and brand definitions are recorded in `homepage-content-inventory.md` and `module-01-hero-inventory.md`. No content changes are planned. Inspected hero styles, HeroFilm and EngineeringLab. Existing Framer Motion and SVG are reused.

Change only hero-specific rules in homepage.css and HeroFilm.css, EngineeringLab's desktop scroll breakpoint, and this report. Preserve existing uncommitted work. Plan: maintain desktop editorial balance; stack through tablet landscape; full-width mobile CTAs; 44px minimum visual-control target; larger small-screen diagram labels and slower signal motion. No masking of overflow or removal of geometry/content.

## Delivered

- Desktop: preserved the two-column editorial relationship; bounded the visual to the centered content area on wide screens.
- Tablet (640–1199px): full-width headline, comfortable paragraph measure, visual in normal flow capped at 480px, no scroll parallax.
- Mobile: full-width CTAs, smaller minimum headline size for narrow devices, wrapping metric labels, visual capped at 400px, larger diagram labels, one slow 12-second signal animation. No additional libraries, assets or video downloads; all SVG geometry and labels retained.
- Pause/Resume target is at least 76×44px. At 320px the CTA targets are 280×56px. Existing focus styles and destinations remain unchanged.

## Validation

Browser widths: 320, 390, 768, 1024, 1199, 1200, 1440, 1920px. Hero scroll width matched each viewport. No heading/visual overlap at any tested width; stacked mode through 1199px and side-by-side mode from 1200px. Visual widths: 350px at 390, 480px on tablet, 360px at 1200, 420px at 1440/1920. Screenshots inspected at narrow mobile, tablet and desktop. Temporary viewport overrides reset.

Type-check passed. Production build passed (36 static pages). `git diff --check` passed. Lint attempted and remains blocked by the existing Next/ESLint unsupported-option mismatch.

Production content comparison passed: 233/233 text entries, 64/64 links, 21/21 media entries, 8/8 sections, 29/29 byte-identical public assets; 43 metadata entries checked with established preload/origin normalization. Existing reviewed source exceptions are unchanged. Original content removed: **0**. Original text rewritten: **0**. Brand definitions modified: **0**. No new website copy. No hero functionality regression observed in the scoped checks; external integrations and form submissions were not exercised.

Limitations: pre-existing page-wide mobile overflow outside the hero remains; no page-wide clipping was introduced. OS reduced-motion preferences and real-device performance were not re-tested in this phase. No claim of site-wide zero regressions.

Local server restarted at http://localhost:3000. No production deployment. Phase 05 is complete and stops here for review.

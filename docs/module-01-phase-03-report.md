# Module 01, Phase 03 — THE LIVING SYSTEM

Implemented on 2026-10-15. Scope: hero illustration and its canvas background only, plus validation documentation. Earlier uncommitted homepage work was retained.

## Implementation

- `HeroFilm.tsx` and `HeroFilm.css`: reusable SVG architectural composition, restrained signal movement, responsive aspect ratio, unique accessible SVG IDs. Original blueprint title, description, geometry, and three labels retained. Added CLOUD, AUTOMATION, PRODUCT supporting labels and connected structural geometry.
- `EngineeringLab.tsx`: extracted its existing SVG into HeroFilm and connected its existing Pause/Resume control. Original header, footer and control labels retained.
- `TechBackground.tsx`: retained the canvas, original RGB values, opacity and 50 nodes; arranged them into a fixed connected grid. Removed random particle movement and continuous animation-frame work. Redraws on resize with capped pixel density.
- Optional HeroFilm props: `webmSrc`, `mp4Src`, `posterSrc`, `paused`, `className`, `aspectRatio` (default 1). WebM source comes before MP4. Video uses muted autoplay, loop and playsInline. Mobile uses metadata-saving preload policy. Reduced-motion preference is checked before mounting video; poster or static SVG is the fallback. Playback errors/autoplay rejection fall back to poster or SVG.
- No suitable existing WebM/MP4 was found. No invented file references were added. Film-specific original labels currently remain in the SVG; when adding a real film, keep these labels available as accessible HTML alongside it. Seamless playback depends on supplying a correctly looped film.

## Preservation report

The original baseline remains unchanged. The preservation script recognizes exactly one reviewed visual source hash in `homepage-reviewed-visual-changes.json`; any further unreviewed change to that file fails validation.

| Original inventory | Preserved |
| --- | --- |
| Text entries | 233 / 233 |
| Links and destinations | 64 / 64 |
| Media entries | 21 / 21 |
| Metadata entries | 43 checked; build-only preloads excluded, generated image origin normalized |
| Homepage sections | 8 / 8 |
| Public assets | 29 / 29 byte-identical |
| Protected files | 127 byte-identical; 1 explicitly reviewed canvas presentation change |

Original text items removed: **0**. Original text items rewritten: **0**. Existing brand definitions modified: **0**. Hero copy, CTA destinations and statistics remain unchanged. New visual components and three supporting labels are additive. No functionality regression was observed in tested hero behavior; comprehensive integration coverage was not performed.

## Validation

- `npm run type-check`: passed.
- `npm run build`: passed (36 static pages generated). Build configuration skips type/lint, so these were run separately.
- `python3 frontend/scripts/check-homepage-preservation.py --html frontend/.next/server/app/index.html`: passed against production HTML.
- `npm run lint`: blocked by existing Next 14 / ESLint 10 compatibility error (unsupported legacy ESLint options); no dependency changes made.
- Browser: desktop 1280, tablet 768, mobile 390. Hero width matches viewport at tablet/mobile; film widths 518px and 348px. Diagram and labels fit; Pause changes CSS animation state to paused, Resume to running. Existing CTAs and metrics remain visible in the hero. No browser console errors observed.
- Reduced-motion fallback inspected in source/CSS; an OS preference toggle was not exercised. Actual WebM/MP4 playback and seamless loops cannot be verified without real supplied assets.
- Pre-existing page-wide mobile overflow outside the hero remains out of scope. Form submissions, analytics and external integrations were not exercised; their protected sources remain unchanged.

Local development server: http://localhost:3000. No production deployment. Phase 03 ends here, pending approval for the next module/phase.

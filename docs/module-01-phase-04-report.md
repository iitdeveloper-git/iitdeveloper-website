# Phase 04 — Motion design

## Before implementation

Exact original content and destinations remain recorded in `homepage-content-inventory.md` and `module-01-hero-inventory.md`. Hero headline, supporting sentence, both live CTAs (/contact and /services), four metrics, commented estimator, canvas and lab labels are preserved. Existing theme tokens and gradients remain untouched.

Inspected Hero.tsx, EngineeringLab.tsx, HeroFilm.tsx/CSS, homepage.css and shared animation variants. Framer Motion 11 is already available. Original hero uses a hidden parent stagger, repeated background glow animations and independent metric hover/reveal motion. Phase 04 will replace these with a restrained whole-block sequence and a small desktop-only scroll response; shared variants will remain unchanged. No pointer tilt is planned because it would compete with the diagram's precise alignment.

Files: Hero.tsx, EngineeringLab.tsx, new HeroMotion.css, reviewed visual hash ledger, this report. All existing uncommitted work is retained.

## Completed behavior

- Framer Motion reveals the headline as one block (700ms), paragraph 140ms later, CTAs 280ms later; the sequence ends at 980ms. Ease: [0.22, 1, 0.36, 1]. Translation is 16px for the heading and 10px for supporting blocks. No per-character animation.
- Server output is visible by default, including all metrics. Removed overlapping individual metric movement and repeating ambient glow animation; the original layers and palette remain.
- Retained the existing slow signal animation inside HeroFilm (6 seconds, 9 seconds on mobile), controlled by Pause/Resume.
- Desktop illustration follows native scroll with a damped spring and an offset bounded to +/-8px. No wheel/touch interception, pinning or scroll-jacking. Tablet/mobile use a stable illustration. Pause disables the scroll offset too.
- Hero-only reduced-motion rules disable CSS animations/transitions, reveal transforms and illustration offset. The reveal effect responds to changes in system preference. All text remains fully visible without JavaScript.

## Validation and preservation

- Type-check passed; production build passed (36 static pages).
- Production HTML content regression passed: 233/233 text entries, 64/64 links, 21/21 media entries, 8/8 sections. 43 metadata entries checked with existing preload/origin normalization. 29/29 asset hashes unchanged.
- Original content removed: 0. Original text rewritten: 0. Brand definitions changed: 0. New website copy: none. Two reviewed presentation hashes now exist (Phase 3 canvas and Phase 4 Hero); baseline remains unchanged.
- Separate HTML parser assertion confirmed all three reveal blocks lack hidden initial inline styles in production HTML.
- Browser checked at 1280px, 768px and 390px. Final opacity is 1 and transform is none for all three reveal blocks. Desktop lab offset changed from +0.48px to -2.50px after native scroll; tablet transform was none. Pause produced transform none and paused signal animation; Resume restored movement. Hero fits mobile/tablet width.
- Lint remains blocked by the existing Next 14 / ESLint 10 legacy-option incompatibility.
- Reduced-motion behavior was verified in source/CSS, not through an OS preference toggle. External forms/integrations were not exercised; their protected source remains unchanged. No claim of comprehensive zero regressions. Previously documented non-hero mobile overflow remains outside this phase.

Server remains at http://localhost:3000. No production deployment. Phase 04 is complete; awaiting approval before another phase.

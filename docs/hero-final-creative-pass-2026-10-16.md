# Final hero creative pass

Final composition: a broad two-line desktop H1 forms the top of an editorial plate. The inset reading column holds the unchanged paragraph, CTA links, and a two-by-two metric block. A larger, unboxed architectural assembly sits alongside the reading column beneath the headline. Compact drawing controls and added machined edge details reinforce the engineering identity. Mobile/tablet retain natural content flow, accessible controls and the original text.

Changes in this pass are restricted to HeroEditorial.css, EngineeringLab.tsx (control wrapper only), and EcosystemArchitecture.tsx (additive geometry only). Existing uncommitted work was retained; copies of these three files before this pass are in /private/tmp/iit-final-pass. Original content inventory remains in hero-reinvention-2026-10-15.md and homepage-content-baseline.json. No brand token, gradient, shared navigation, service section, route, integration or metadata edits.

Validation:
- Type-check and production build passed; 36 routes generated. Existing GitHub API DNS fallback warnings remain.
- git diff --check passed.
- Rendered content audit: all 233 baseline text items, links, media, metadata and eight sections retained.
- Two structured-data blocks parse successfully; metadata implementation was not edited.
- Exact single H1 verified in browser.
- Inspected 1440, 1024, 768, and 390px layouts; hero containment checks passed at 1024/390px.
- Keyboard layer toggle and pause state verified; all active scene animations pause.
- Reduced-motion rules remain in place; OS-level emulation was not performed.
- Lint remains blocked by the existing Next/ESLint incompatible options. No dependency changes made.

The 14-second origin sequence is retained. No additional media or dependencies. No deployment. Work stops at the hero for review.

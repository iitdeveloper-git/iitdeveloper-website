# Module 02 — The Services Gallery

The services section is now an editorial gallery rather than a repeated card grid. A sticky desktop index frames six scroll chapters, while each service receives its own exhibition format and original SVG engineering plate. Wide interface compositions suit development and workflows; portrait compositions suit agents and commerce; marketing uses an ascending data structure; graphic design gets a large closing composition. Every original service record, icon, category, description, tagline, emoji and destination remains in the rendered document.

## Audit and design decision

The original section was audited from the repository source, including its heading, description, six featured service records, icons, taglines, destination links, and closing 12-service CTA block. Existing Framer Motion support and scoped section CSS were reused; no animation dependency was added. The Kunal Rajelli reference could not be inspected reliably because browser navigation and screenshot capture failed.

The selected direction is a hybrid of A and C: desktop uses sticky, layered chapters with restrained scale and parallax; mobile and reduced-motion users receive normal document flow. This preserves the premium stacked-panel feel while keeping scroll length, keyboard access, and content readability under control.

The reference site at https://www.kunalrajelli.com/works could not be visually inspected: the web reader returned an access error, browser navigation timed out, and screenshot capture failed. The implementation therefore follows the requested scroll-gallery concept without copying reference assets or code.

Changed/created only for this module:
- frontend/src/components/sections/Services.tsx
- frontend/src/components/sections/ServiceArtwork.tsx
- frontend/src/components/sections/ServicesShowcase.css
- this record

Interaction: the active chapter in the desktop index follows the section scroll progress and a focus-point scroll listener; chapter links remain native anchors and keyboard accessible. Each artwork has restrained scroll-linked parallax on both axes. Reduced motion removes parallax, transitions, and sticky behavior. Mobile/tablet use natural vertical flow.

The gallery now closes with an "AFTER THE GALLERY" editorial rule, retaining the original 12-service statement and both original CTAs before the unchanged client section. On a 390px viewport the closing block has no internal horizontal overflow, both links remain 56px tall, and the next section begins cleanly after the block.

Performance pass: active chapter state now uses one IntersectionObserver instead of window/document scroll listeners. Scroll-linked transforms remain compositor-friendly CSS transforms, while the progress bar is driven by Framer Motion's existing section progress value. The introduction renders visible by default so the content remains usable without animation enhancement.

Validation:
- TypeScript passed.
- Production build passed; 36 routes generated. Existing GitHub API DNS fallback warnings remain.
- git diff --check passed.
- Rendered content parity passed: 233 baseline text items, original links, media, metadata, and eight sections retained.
- Original six service records match exactly against the pre-change source.
- Existing source hash comparison confirms only Services.tsx changed among pre-existing source files; hero, navigation, other sections, and service detail pages are unchanged.
- Desktop 1440px, tablet 768px, and mobile 390px inspected. Services section scroll width equals viewport width.
- Viewport matrix verified at 1440px, 1280px, 1024px, 768px, 390px, and 360px. Sticky chapters activate at 1200px and above; smaller layouts use static document flow with matching section/client widths.
- Sequence screenshots captured for desktop and mobile beginning/middle/end states in the session visualization directory.
- Desktop sticky index and active chapter state verified. Keyboard navigation to AI Workflows verified. Closing CTA links retain /services and /contact and are 56px tall.
- No new dependencies or production assets. No deployment performed.
- Existing `npm run lint` remains blocked by the repository's Next/ESLint option incompatibility.

Final validation: the rendered DOM contains all six original service titles, descriptions, taglines, icon nodes, and destination links; the original 12-service statement and both closing CTAs remain present. Brand token files have no diff, the showcase has no nested scrolling container or scroll-jacking handler, and the reduced-motion stylesheet removes transitions, animations, parallax, and sticky positioning.

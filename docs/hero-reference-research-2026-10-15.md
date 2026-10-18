# IITDeveloper hero — reference research

Research date: 15 October 2026. Scope: homepage hero only.

This research follows the initial implemented draft and must inform any further hero revision. No frontend implementation was changed during this research pass. Observations below distinguish rendered visual evidence from extracted content and proposed design decisions.

## Inspection coverage

| Reference | Evidence obtained | Limits |
| --- | --- | --- |
| [Instrument](https://www.instrument.com/) | Desktop hero and first scroll region; mobile hero at 390px; live accessibility tree; video pause interaction | No exhaustive cross-browser or performance audit |
| [Huge](https://www.hugeinc.com/) | Desktop opening and one scroll; extracted homepage content | Slow loading; next region rendered largely blank, so detailed scroll choreography and mobile behavior remain unverified |
| [Active Theory](https://activetheory.com/) | Attempted live visit; text fetch redirected to activetheory.net and returned a JavaScript requirement | Live browser blocked by network category filter; no visual or interaction claims made |
| [Locomotive](https://locomotive.ca/) | Extracted homepage content, navigation and project sequence | Live browser remained at security verification; typography, animation and responsive behavior unverified |
| [Lircle](https://lircle.co/) | Extracted content and live accessibility tree, including hero, menu and work links | Navigation initially timed out; page subsequently readable, but screenshot capture failed twice; visual/motion claims unverified |
| [Awwwards](https://www.awwwards.com/) | Live desktop homepage and featured presentation | Text-fetch timed out; featured site's own interactions were not inspected |

## Observations and transferable principles

### Instrument

Desktop pairs an extremely large, heavy wordmark with an almost full-width reel. Small navigation labels create a sharp scale contrast. The first scroll region shifts to a spacious agency statement with serif typography, then a ruled work index. Mobile recomposes the opening into a compact wordmark/menu, a shorter media area, statement and clear work CTA. Both play and pause controls are exposed; clicking pause changed the accessible control to play.

Principles: reserve scale for a few elements; let media have its own stage; give the statement breathing room; make mobile an intentional composition; provide direct control over motion.

### Huge

The observed opening places a large sculptural H against black, with minimal branding and contact access at the edges. One scroll reached a white region with a visible navigation header; content there was incompletely rendered during inspection. Extracted content exposes a showreel entry, positioning statement and pathways into work and solutions.

Principles: one recognizable visual subject can establish character; maintain an obvious route to contact; separate the visual introduction from deeper explanation. Exact animation timings or mechanisms cannot be inferred from these observations.

### Locomotive

Extracted content leads with agency identity and location, followed by featured projects, a concise agency explanation and further work/culture routes. Browser security verification prevented visual inspection.

Principle from information structure: introduce identity, then substantiate it with work. No specific motion, font, whitespace or layout recommendation is attributed to this unverified browser experience.

### Lircle

The accessible hero contains a project image, a single main proposition and two routes: selected work and starting a conversation. A discipline sequence and approach statement follow. The live tree also exposes a collapsible menu and work links. Screenshots were unavailable.

Principle from content structure: imagery, proposition and action should support the same business story. Hover behavior, horizontal-scroll mechanics, precise typography and cinematic treatments remain unverified.

### Awwwards

The inspected homepage gives its featured project an oversized title, compact attribution and a large preview. The preview depicts an atmospheric landscape with relatively quiet text. This is an editorial showcase; it is not evidence of the featured site's runtime behavior or a universal agency template.

Principle: create hierarchy between the editorial frame and the featured visual; use reference galleries to assess specificity and coherence rather than accumulate effects.

## Original IITDeveloper direction: “From a line to a living system”

This is a proposal derived from the research and the user's creative direction, not an observed reference implementation.

1. **Composition:** keep the exact existing H1 as the principal reading anchor. Give an original engineering scene a deliberate adjacent stage. Connect text and scene through alignment and a small number of technical rules; avoid presenting the scene as a floating monitoring dashboard.
2. **Typography:** establish three clear scales—headline, readable explanatory copy, quiet technical labels. Use editorial contrast selectively. Existing brand colors, text gradient, logo and theme definitions remain authoritative.
3. **Visual narrative:** evolve the current illustrative geometry from an initial line into interface, intelligence and infrastructure relationships. Preserve the original diagram and labels. Any transformation must communicate how parts connect, with no invented operational readings or achievements.
4. **Cinematic treatment:** use framing, negative space, paced assembly and a composed resting state. Video is optional, not a prerequisite. If an original film is added later, retain the existing illustration as a fallback and keep all required content as readable HTML. Never use another studio's film or artwork.
5. **Interaction:** preserve both original CTA labels and links. Keep the layer control and pause/resume control understandable with keyboard focus and explicit state. Motion should explain relationships or acknowledge input; avoid cursor gimmicks over essential copy.
6. **Scroll:** allow ordinary scrolling. A restrained change of scene framing can conclude within the hero; the existing metrics provide the final proof point. Preserve all later sections and their content. Avoid long pinned sequences that delay access to services.
7. **Responsive composition:** stack the original copy, actions, proof and illustration intentionally on small screens. Do not scale a desktop scene down until labels become unreadable. Touch users must receive the same information and controls without hover.
8. **Motion/accessibility/performance:** content must be visible without animation. Reduced motion uses a composed static state and immediate control responses. Pause offscreen media; defer optional heavy assets. Verify these behaviors instead of assuming that a visually simple scene is inexpensive.

## Implications for the existing draft

- Keep the editorial heading, original content, flat metric strip and accessible diagram controls.
- Strengthen the visual relationship between the headline and engineering scene; the current side-by-side diagram can feel detached from the promise.
- Make the illustration's motion tell a short, comprehensible engineering story. The current pulse and layer separation are useful interaction foundations but do not alone establish cinematic storytelling.
- Treat small technical labels and background rules as supporting elements. Increase their legibility or reduce their prominence through spacing and hierarchy without removing original information.
- Preserve the compact mobile reading order and explicit motion control demonstrated in the accessible reference, while retaining IITDeveloper's own palette and identity.

## Constraints carried into any further implementation

Only hero files and directly required styles/components may change. Preserve exact H1 punctuation, paragraph, service terminology, original CTAs and routes, four existing metrics, SVG/canvas/media meaning, accessible descriptions, SEO metadata and integrations. Retain all existing uncommitted work. Validate source and rendered content parity, one semantic H1, keyboard access, reduced motion, responsive behavior, type-check, build and available lint. No assets, code, branding or animation sequences from references are reused. No production deployment is authorized.

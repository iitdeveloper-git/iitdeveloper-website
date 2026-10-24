# Scene A — The Origin

Implemented in EcosystemArchitecture.tsx and HeroFilm.css only. Existing information, material palette, labels and controls retained.

A shared 14-second CSS timeline controls the assembly, fasteners, edge illumination, signal route, blueprint pulse and simulated camera drift. Origin is a compact engineered stack. Foundation aligns first, then routing, intelligence and canopy settle by 5.32 seconds. The assembly holds through 9.8 seconds and eases back to the identical origin pose at 14 seconds. Camera motion is limited to ±3 SVG units and ±1.5% scale. All transform/lighting endpoints match; flow dash offsets repeat by their full pattern lengths.

Separate layers disables automatic assembly/camera/fastener motion for a stable exploded view. Connect layers restarts that sequence. Pause freezes all nine animated elements. Existing offscreen, document visibility and reduced-motion safeguards remain. Reduced motion renders the complete static assembly; its CSS behavior was inspected, not tested by changing the OS preference.

Validation: TypeScript passed, production build passed (36 routes; existing GitHub fetch fallback warnings), original 233 text items/links/media/SEO metadata passed parity audit. Browser verified all nine animation durations are 14s/infinite, Pause freezes all, and Separate layers disables six automatic transform animations. Desktop and mobile states inspected; tablet containment checked. Existing lint command still fails on Next/ESLint incompatible options. No new dependencies or production deployment.

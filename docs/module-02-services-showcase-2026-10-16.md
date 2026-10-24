# Module 02 — Services showcase

## Reference inspection
Attempted https://www.kunalrajelli.com/works with both the web reader and in-app browser. Web reader could not access it. Browser navigation timed out; subsequent inspection returned only the page title, “Portfolio - Product Designer & Builder,” and screenshots failed. The reference's scrolling, transitions, imagery and typography could not be verified. No reference code, assets or branding copied.

## Implementation
An original editorial service atlas: six numbered chapters with distinct SVG engineering plates, a sticky desktop index, scroll-position progress and restrained ±18px illustration movement. Native chapter anchors support keyboard navigation and retain normal browser scrolling. All service descriptions and taglines remain visible in document flow. Tablet/mobile and short viewports use a non-sticky index. Reduced motion disables illustration transforms and sticky positioning. Existing category icons and ArrowRight icons retained. Closing CTAs are semantic links, replacing nested buttons without changing labels or destinations.

Files changed: frontend/src/components/sections/Services.tsx.
Files created: frontend/src/components/sections/ServiceArtwork.tsx and ServicesShowcase.css, plus this record.
No new dependencies, image downloads, video assets, palette or gradient definitions. The artwork is illustrative, not client work or performance evidence.

## Preservation and validation
- Original six service records below byte-match the redesigned component's data.
- Source-hash comparison confirms Services.tsx is the only pre-existing source file changed in this module. Hero and other modules unchanged.
- Production HTML audit passed all 233 original text items, original links, media, metadata and eight sections. Brand/theme/metadata source hashes unchanged.
- Type-check, production build (36 routes) and git diff --check passed.
- Existing build GitHub API DNS fallback warnings remain. Existing Next/ESLint option incompatibility blocks lint.
- Browser inspected desktop 1440px, tablet 768px, mobile 390px. Section scroll width equals viewport width after fixing retained background shapes on mobile.
- Sticky position verified at 120px. Active index follows scrolling; Enter on AI Workflows lands the chapter at approximately 112px below the viewport top. Closing CTA links are 56px tall, with original destinations.
- Reduced-motion implementation source-reviewed; OS preference was not changed. No production performance benchmark claimed.

Original section heading: Services That Actually Work
Original label: WHAT WE DO
Original introduction: We automate things… including your headaches. Full-stack development, AI solutions, and marketing that scales.
Original closing heading: We offer 12 services in total.
Original closing paragraph: From DevOps to Salesforce, B2B to SEO — explore everything we do.
Original CTA: View All 12 Services → /services
Original CTA: Book a Call → /contact

## Original service inventory
```tsx
const services = [
  {
    icon: Code,
    title: 'Website & App Development',
    description: 'Custom web and mobile apps built with modern frameworks. Fast, scalable, and conversion-focused.',
    tagline: '💻 We turn caffeine into code. Actually tested on real users.',
    category: 'Build',
    categoryColor: 'primary',
    href: '/services/website-development',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent agents that automate your workflows. Available 24/7, never need coffee breaks.',
    tagline: '🤖 Your new employee. Doesn\'t complain. Doesn\'t take vacations.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-agents',
  },
  {
    icon: Workflow,
    title: 'AI Workflows',
    description: 'Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines.',
    tagline: '🧠 Teaching AI to do your job. But don\'t worry, you\'re still needed.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-workflows',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Store',
    description: 'Custom Shopify stores built to convert. Theme design, payment setup, app integrations, and full launch support.',
    tagline: '🛍️ Your store live in weeks. Designed to sell from day one.',
    category: 'Commerce',
    categoryColor: 'primary',
    href: '/services/shopify-store',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that convert. PPC, social ads, and conversion optimization.',
    tagline: '📈 Stop burning money. Start burning competitors.',
    category: 'Grow',
    categoryColor: 'secondary',
    href: '/services/marketing',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identity, motion graphics, and multimedia design. Posters, banners, videos, and After Effects.',
    tagline: '🎨 Design so good, your competitors will think you hired someone expensive.',
    category: 'Design',
    categoryColor: 'secondary',
    href: '/services/graphic-design',
  },
];
```

Not deployed. Module stops here for review.

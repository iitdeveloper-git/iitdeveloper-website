export type CaseStudy = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  challenge: string;
  solution: string;
  stack: string[];
  status: 'Live' | 'In Development' | 'Product Lab';
  services: string[];
  outcome?: string;
  url?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'neurotrade-ai',
    title: 'NeuroTrade AI',
    label: 'IITDEVELOPER Product Lab',
    summary: 'An AI-assisted trading product explored as an internal product engineering initiative.',
    challenge: 'Bring market data, automation workflows, risk-aware controls, and explainable AI assistance into one product experience.',
    solution: 'A modular product architecture designed around observable workflows, controlled automation, and clear operational states.',
    stack: ['Next.js', 'TypeScript', 'Python', 'AI integrations'],
    status: 'In Development',
    services: ['AI Systems & Automation', 'SaaS & Software Development', 'Cloud & DevOps'],
  },
  {
    slug: 'generic-notification-service',
    title: 'Generic Notification Service',
    label: 'IITDEVELOPER Product Lab',
    summary: 'A reusable notification platform concept for event-driven email and application messaging.',
    challenge: 'Avoid rebuilding notification delivery, templates, preferences, and provider integrations for every product.',
    solution: 'A service-oriented foundation for reusable notification channels, delivery tracking, and integration-friendly APIs.',
    stack: ['TypeScript', 'APIs', 'PostgreSQL', 'Event-driven architecture'],
    status: 'Product Lab',
    services: ['SaaS & Software Development', 'Cloud & DevOps'],
  },
  {
    slug: 'vanshveda',
    title: 'VanshVeda',
    label: 'Client work',
    summary: 'A digital presence delivered for a verified brand represented in the existing project assets.',
    challenge: 'Create a clear, usable web presence aligned with the brand and its audience.',
    solution: 'Website design and implementation with responsive layouts and content-focused presentation.',
    stack: ['Web development', 'Responsive design', 'Content implementation'],
    status: 'Live',
    services: ['SaaS & Software Development'],
  },
  {
    slug: 'ghar-ka-dabba',
    title: 'Ghar Ka Dabba',
    label: 'Client work',
    summary: 'A customer-facing digital experience for a food-service brand represented in the existing project assets.',
    challenge: 'Present the offering clearly and make the service easy to understand on mobile and desktop.',
    solution: 'A responsive web experience focused on service discovery and straightforward customer journeys.',
    stack: ['Web development', 'Responsive UI', 'Brand implementation'],
    status: 'Live',
    services: ['SaaS & Software Development'],
  },
  {
    slug: 'legal-sujhav',
    title: 'Legal Sujhav',
    label: 'Client work',
    summary: 'A professional web presence for a legal-services brand represented in the existing project assets.',
    challenge: 'Organize service information in a credible and approachable format.',
    solution: 'A structured website experience designed to make legal-service information easier to navigate.',
    stack: ['Web development', 'Information architecture', 'Responsive UI'],
    status: 'Live',
    services: ['SaaS & Software Development', 'SEO, GEO & AI Visibility'],
  },
];


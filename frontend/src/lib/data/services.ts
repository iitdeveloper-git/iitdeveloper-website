/**
 * IITDEVELOPER — Four-Pillar Service Data
 * Single source of truth for all service information used across the site.
 */

import { Brain, Cloud, Code2, Search } from 'lucide-react';

export interface ServiceCapability {
  label: string;
}

export interface ServicePillar {
  /** URL slug e.g. "ai-automation" */
  slug: string;
  /** Full page path */
  href: string;
  /** Short icon label used in nav badges */
  category: string;
  /** Display title */
  title: string;
  /** One-sentence outcome statement */
  outcome: string;
  /** Short description for cards */
  description: string;
  /** Full description for service page */
  fullDescription: string;
  /** 3-4 capabilities shown on homepage cards */
  cardCapabilities: string[];
  /** Expanded capability list for the service page */
  capabilities: string[];
  /** CTA label */
  cta: string;
  /** Lucide icon component name */
  iconName: 'Brain' | 'Cloud' | 'Code2' | 'Search';
  /** Tailwind color class for accents */
  color: 'primary' | 'secondary';
}

export const servicePillars: ServicePillar[] = [
  {
    slug: 'ai-automation',
    href: '/services/ai-automation',
    category: 'AI',
    iconName: 'Brain',
    color: 'secondary',
    title: 'AI Systems & Intelligent Automation',
    outcome: 'Reduce repetitive work, improve response time, and turn organisational knowledge into usable AI-powered workflows.',
    description: 'Purpose-built AI agents, RAG systems, and workflow automation that solve real operational problems.',
    fullDescription: 'We design and deploy AI systems that integrate into your existing operations — from intelligent document processing and internal knowledge assistants to multi-agent orchestration and LLM-powered APIs. Every system is built for production: observable, maintainable, and measurable.',
    cta: 'Explore AI Solutions',
    cardCapabilities: [
      'AI agents and multi-agent systems',
      'RAG and knowledge base systems',
      'Business process automation',
      'LLM integration and evaluation',
    ],
    capabilities: [
      'AI agents and autonomous workflows',
      'Multi-agent orchestration systems',
      'Retrieval-Augmented Generation (RAG)',
      'Internal knowledge assistants',
      'Customer-support AI systems',
      'LLM API integrations (OpenAI, Anthropic, Gemini)',
      'Business process automation',
      'Document extraction and processing',
      'Human-in-the-loop workflow design',
      'AI evaluation and monitoring pipelines',
      'AI workflow orchestration (LangChain, LangGraph)',
      'Structured output and data extraction',
    ],
  },
  {
    slug: 'cloud-devops',
    href: '/services/cloud-devops',
    category: 'Cloud',
    iconName: 'Cloud',
    color: 'primary',
    title: 'Cloud, DevOps & Platform Engineering',
    outcome: 'Build secure, observable, and scalable platforms that let teams release faster and operate reliably.',
    description: 'Cloud architecture, CI/CD, infrastructure as code, and platform engineering for teams that need to move quickly without breaking production.',
    fullDescription: 'We help engineering teams and growing businesses design cloud infrastructure that is secure by default, cost-efficient, and built for continuous delivery. From zero to production-ready platform, or from a fragile monolith to a modern, observable deployment pipeline.',
    cta: 'Improve Your Infrastructure',
    cardCapabilities: [
      'CI/CD pipeline design and implementation',
      'Docker, Kubernetes, and containerisation',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Cloud cost optimisation and reliability',
    ],
    capabilities: [
      'Cloud architecture (AWS, GCP, Azure)',
      'CI/CD pipeline design and implementation',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Docker and Kubernetes deployments',
      'Platform engineering and developer experience',
      'Observability: logging, metrics, tracing',
      'Cloud migration planning and execution',
      'Deployment automation and GitOps',
      'Reliability engineering and SLO design',
      'Security hardening and compliance preparation',
      'Cloud cost analysis and optimisation',
      'MLOps and AI infrastructure',
    ],
  },
  {
    slug: 'software-development',
    href: '/services/software-development',
    category: 'Software',
    iconName: 'Code2',
    color: 'secondary',
    title: 'SaaS & Custom Software Development',
    outcome: 'Take a product from validated idea to secure, maintainable, production-ready software.',
    description: 'Full-stack web applications, SaaS platforms, APIs, and internal tools built with long-term maintainability in mind.',
    fullDescription: 'We build software that works in production — not just in demos. Whether you need a multi-tenant SaaS platform, a customer-facing web application, a robust API layer, or an internal tool that replaces a manual process, we deliver with architecture, testing, and documentation included.',
    cta: 'Build Your Product',
    cardCapabilities: [
      'SaaS platforms and web applications',
      'REST and GraphQL API development',
      'Multi-tenant architecture and auth',
      'Admin portals and internal tools',
    ],
    capabilities: [
      'SaaS platforms and multi-tenant architecture',
      'Custom web application development',
      'REST and GraphQL API design and development',
      'Backend systems and microservices',
      'Mobile-responsive web applications',
      'Admin portals and internal tools',
      'Authentication, authorisation, and RBAC',
      'Payment and third-party integrations',
      'Data dashboards and reporting',
      'Product modernisation and legacy migration',
      'Event-driven architecture',
      'Documentation and handoff',
    ],
  },
  {
    slug: 'seo-geo-ai-visibility',
    href: '/services/seo-geo-ai-visibility',
    category: 'Visibility',
    iconName: 'Search',
    color: 'primary',
    title: 'SEO, GEO & AI Search Visibility',
    outcome: 'Improve how search engines and AI-powered discovery systems understand, retrieve, and represent your brand.',
    description: 'Technical SEO, structured content, entity optimisation, and AI-search readiness — built on engineering fundamentals, not marketing hype.',
    fullDescription: 'Modern discoverability requires more than keyword targeting. We implement technical SEO foundations, structured data, information architecture, and content strategy designed for both traditional search engines and emerging AI-powered answer systems. We make no guarantees of rankings or AI citations — we build the technical and content foundations that support discoverability.',
    cta: 'Improve Search Visibility',
    cardCapabilities: [
      'Technical SEO audits and implementation',
      'Structured data and schema markup',
      'GEO and AEO content architecture',
      'Core Web Vitals and crawlability',
    ],
    capabilities: [
      'Technical SEO audits and remediation',
      'Crawlability and indexation analysis',
      'Information architecture design',
      'Structured data (JSON-LD, Schema.org)',
      'Entity and brand consistency optimisation',
      'Answer-oriented content architecture (AEO)',
      'Generative engine optimisation strategy (GEO)',
      'Topic cluster and pillar page development',
      'Core Web Vitals improvement',
      'Google Search Console setup and analysis',
      'Bing Webmaster Tools implementation',
      'Internal linking strategy',
      'Content refresh workflows',
      'AI-search visibility tracking',
    ],
  },
];

// ─── Legacy / Additional Services ────────────────────────────────────────────
// These remain available but are visually de-emphasised in the services page.
// Do not remove — these pages exist and may have search value.
export const additionalServices = [
  {
    slug: 'website-development',
    href: '/services/website-development',
    title: 'Website Development',
    description: 'Custom websites and web applications built with modern frameworks.',
  },
  {
    slug: 'app-development',
    href: '/services/app-development',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications using React Native and Flutter.',
  },
  {
    slug: 'shopify-store',
    href: '/services/shopify-store',
    title: 'Shopify Store Design',
    description: 'Custom Shopify stores designed to convert, with full launch support.',
  },
  {
    slug: 'ecommerce',
    href: '/services/ecommerce',
    title: 'Ecommerce Solutions',
    description: 'Full-stack ecommerce with payment gateways and marketplace integrations.',
  },
  {
    slug: 'graphic-design',
    href: '/services/graphic-design',
    title: 'Graphic & Brand Design',
    description: 'Visual identity, motion graphics, and multimedia design.',
  },
  {
    slug: 'marketing',
    href: '/services/marketing',
    title: 'Performance Marketing',
    description: 'Data-driven paid campaigns and conversion optimisation.',
  },
  {
    slug: 'seo-smm',
    href: '/services/seo-smm',
    title: 'SEO & Social Media',
    description: 'Organic search growth and social media management.',
  },
  {
    slug: 'b2b-promotion',
    href: '/services/b2b-promotion',
    title: 'B2B Lead Generation',
    description: 'End-to-end B2B growth: content, outreach, and analytics.',
  },
  {
    slug: 'salesforce',
    href: '/services/salesforce',
    title: 'Salesforce Solutions',
    description: 'Salesforce implementation, customisation, and integrations.',
  },
] as const;

export const serviceIcons = { Brain, Cloud, Code2, Search };

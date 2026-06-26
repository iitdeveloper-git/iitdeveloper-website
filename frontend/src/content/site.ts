import { Bot, Cloud, Code2, Search } from 'lucide-react';

export const siteConfig = {
  name: 'IITDEVELOPER',
  legalName: 'IITDEVELOPER',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iitdeveloper.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@iitdeveloper.com',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '/contact?intent=discovery-call',
  description:
    'AI, cloud and software engineering for startups, SMEs and digital businesses.',
  founded: 2020,
};

export const servicePillars = [
  {
    slug: 'ai-automation',
    icon: Bot,
    title: 'AI Systems & Intelligent Automation',
    shortTitle: 'AI Systems & Automation',
    description:
      'Reduce repetitive work, improve response time, and turn organizational knowledge into usable AI-powered workflows.',
    capabilities: ['AI agents and multi-agent workflows', 'RAG and knowledge assistants', 'Document processing', 'AI evaluation and monitoring'],
    cta: 'Explore AI Solutions',
  },
  {
    slug: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud, DevOps & Platform Engineering',
    shortTitle: 'Cloud & DevOps',
    description:
      'Build secure, observable, and scalable platforms that let teams release faster and operate reliably.',
    capabilities: ['Cloud architecture and migrations', 'CI/CD and Infrastructure as Code', 'Containers and Kubernetes', 'Observability and reliability'],
    cta: 'Improve Your Infrastructure',
  },
  {
    slug: 'software-development',
    icon: Code2,
    title: 'SaaS & Custom Software Development',
    shortTitle: 'SaaS & Software Development',
    description:
      'Take a product from validated idea to secure, maintainable, production-ready software.',
    capabilities: ['SaaS and business applications', 'APIs and backend systems', 'Admin portals and internal tools', 'Product modernization'],
    cta: 'Build Your Product',
  },
  {
    slug: 'seo-geo-ai-visibility',
    icon: Search,
    title: 'SEO, GEO & AI Search Visibility',
    shortTitle: 'SEO, GEO & AI Visibility',
    description:
      'Improve how search engines and AI-powered discovery systems understand, retrieve, and represent the brand.',
    capabilities: ['Technical SEO and indexing', 'Structured data and entity clarity', 'Answer-oriented content architecture', 'Core Web Vitals and measurement'],
    cta: 'Improve Search Visibility',
  },
] as const;

export const additionalCapabilities = [
  'Ecommerce and Shopify',
  'Mobile-ready applications',
  'Salesforce integrations',
  'Design systems and visual production',
  'Performance marketing support',
];

export const legacyRedirects: Record<string, string> = {
  '/services/ai-agents': '/services/ai-automation',
  '/services/ai-workflows': '/services/ai-automation',
  '/services/devops-cloud': '/services/cloud-devops',
  '/services/website-development': '/services/software-development',
  '/services/app-development': '/services/software-development',
  '/services/seo-smm': '/services/seo-geo-ai-visibility',
  '/case-studies': '/work',
  '/projects': '/work',
};


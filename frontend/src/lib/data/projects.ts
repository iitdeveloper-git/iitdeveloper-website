/**
 * IITDEVELOPER — Project / Case Study Data
 * 
 * Only include verified, real projects.
 * For confidential work: use anonymised descriptions with ONLY verified facts.
 * Never invent outcomes, metrics, or client quotes.
 * 
 * project_status options:
 *   'live'           — publicly deployed
 *   'in-development' — actively being built
 *   'internal'       — IITDEVELOPER Product Lab
 *   'completed'      — delivered but not publicly linked
 */

export type ProjectStatus = 'live' | 'in-development' | 'internal' | 'completed';

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud' | 'database' | 'other';
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Label shown when client is internal or confidential */
  clientLabel?: string;
  industry: string;
  projectType: string;
  /** One sentence summary */
  summary: string;
  /** Business problem this solved */
  challenge: string;
  /** How it was approached */
  approach: string;
  /** What was delivered */
  solution: string;
  /** Only include verified, factual outcomes. No invented metrics. */
  results: string[];
  technologies: Technology[];
  status: ProjectStatus;
  /** Services this project falls under */
  services: string[];
  /** Year completed or started */
  year: number;
  /** Whether to show on homepage featured section */
  featured: boolean;
  /** Cover image path (in /public) or null */
  coverImage: string | null;
  /** Live URL if public */
  liveUrl: string | null;
  /** GitHub URL if public */
  repoUrl: string | null;
}

export const projects: Project[] = [
  {
    slug: 'neurotrade-ai',
    title: 'NeuroTrade AI',
    client: 'IITDEVELOPER Product Lab',
    clientLabel: 'IITDEVELOPER Product Lab',
    industry: 'Fintech / AI',
    projectType: 'AI-Powered Trading Intelligence Platform',
    summary: 'An AI-powered trading intelligence platform combining market analysis, sentiment signals, and structured data pipelines.',
    challenge: 'Traders and analysts spend significant time aggregating market data from disparate sources before making decisions. Manual analysis of news, filings, and price signals is slow and inconsistent.',
    approach: 'Built a data ingestion pipeline that aggregates market feeds, news sources, and structured financial data. Applied LLM-based analysis for sentiment and signal extraction. Designed a clean interface for exploration and alerting.',
    solution: 'A web-based platform with real-time data ingestion, LLM-powered market signal analysis, structured output generation, and a dashboard for monitoring and exploration.',
    results: [
      'Designed and built end-to-end in a single sprint cycle as an internal product',
      'Demonstrated integration of structured financial data with LLM inference',
      'Established reusable patterns for AI-powered data pipeline architecture',
    ],
    technologies: [
      { name: 'Next.js', category: 'frontend' },
      { name: 'Python', category: 'backend' },
      { name: 'OpenAI API', category: 'ai' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'LangChain', category: 'ai' },
    ],
    status: 'internal',
    services: ['ai-automation', 'software-development'],
    year: 2024,
    featured: true,
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'generic-notification-service',
    title: 'Generic Notification Service',
    client: 'IITDEVELOPER Product Lab',
    clientLabel: 'IITDEVELOPER Product Lab',
    industry: 'Developer Infrastructure',
    projectType: 'Open-Source Microservice',
    summary: 'A provider-agnostic notification microservice supporting email, SMS, and push delivery through a unified API.',
    challenge: 'Most applications need multi-channel notifications (email, SMS, push) but each channel requires separate integrations, configuration management, and delivery logic. This creates redundant code across projects.',
    approach: 'Designed a provider-agnostic abstraction layer that normalises delivery across channels. Built a queue-backed dispatch system with retry logic, delivery tracking, and template rendering.',
    solution: 'A self-contained microservice with a REST API for dispatching notifications across email (SMTP / SendGrid), SMS (Twilio), and push channels. Includes webhook callbacks, delivery status tracking, and template management.',
    results: [
      'Reusable across multiple internal and client projects',
      'Reduces notification integration time to a single API call',
      'Supports independent provider configuration per channel',
    ],
    technologies: [
      { name: 'Node.js', category: 'backend' },
      { name: 'TypeScript', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Docker', category: 'cloud' },
    ],
    status: 'internal',
    services: ['software-development', 'cloud-devops'],
    year: 2024,
    featured: true,
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'vanshveda',
    title: 'VanshVeda',
    client: 'VanshVeda',
    industry: 'Family Heritage / SaaS',
    projectType: 'Web Application',
    summary: 'A digital platform for preserving and exploring family genealogy, heritage records, and ancestral histories.',
    challenge: 'Families struggle to document and share ancestral histories digitally in a structured, accessible format. Paper records are fragile and not easily searchable or shareable.',
    approach: 'Designed a structured data model for family trees and heritage records. Built a web interface for adding, editing, and navigating family connections. Implemented search and export capabilities.',
    solution: 'A web-based genealogy and heritage platform with family tree visualisation, record management, and sharing functionality.',
    results: [
      'Delivered a functional web platform for family heritage management',
      'Implemented structured tree visualisation with relationship mapping',
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
    ],
    status: 'completed',
    services: ['software-development'],
    year: 2023,
    featured: true,
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'ghar-ka-dabba',
    title: 'Ghar Ka Dabba',
    client: 'Ghar Ka Dabba',
    industry: 'Food & Delivery',
    projectType: 'Web Application',
    summary: 'An online ordering platform for home-cooked meal delivery — connecting home cooks with local customers.',
    challenge: 'Home cooks and tiffin services lacked a structured digital presence and ordering system, relying on WhatsApp and phone calls to manage orders.',
    approach: 'Built a catalogue-based ordering system with meal scheduling, delivery zone management, and order tracking. Designed for non-technical operators.',
    solution: 'A web platform with a customer-facing order flow, cook dashboard for menu and order management, and basic delivery management.',
    results: [
      'Delivered a functional ordering platform replacing manual phone/WhatsApp ordering',
      'Enabled the operator to manage daily orders through a structured digital system',
    ],
    technologies: [
      { name: 'Next.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
    ],
    status: 'completed',
    services: ['software-development'],
    year: 2022,
    featured: false,
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'legal-sujhav',
    title: 'Legal Sujhav',
    client: 'Legal Sujhav',
    industry: 'Legal Services',
    projectType: 'Web Application & Brand',
    summary: 'A digital platform connecting individuals with legal guidance and advisory services.',
    challenge: 'Accessing reliable legal guidance is expensive and inaccessible for many individuals, particularly for initial consultations and understanding options.',
    approach: 'Designed a platform for structured legal intake, matching users to relevant advisors, and enabling scheduled consultations.',
    solution: 'A web application with intake forms, advisor profiles, scheduling, and a content library for common legal questions.',
    results: [
      'Delivered a structured intake and advisory platform',
      'Established digital presence for a legal advisory service',
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
    ],
    status: 'completed',
    services: ['software-development'],
    year: 2023,
    featured: false,
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'iitdeveloper-website',
    title: 'IITDEVELOPER Agency Website',
    client: 'IITDEVELOPER',
    clientLabel: 'IITDEVELOPER Internal',
    industry: 'Agency / Technology',
    projectType: 'Next.js Web Application',
    summary: 'A production-ready agency website built with Next.js 14, Framer Motion, Three.js, and a full lead management backend.',
    challenge: 'Existing website needed a complete repositioning to communicate engineering-led services, AI expertise, and business credibility — while preserving the established visual identity.',
    approach: 'Preserved the existing design system while systematically rewriting all content, restructuring the service architecture into 4 pillars, implementing a full lead-capture backend with SMTP email, and adding production SEO and structured data.',
    solution: 'A modern agency website with Neon PostgreSQL lead storage, Nodemailer SMTP email delivery, production SEO, JSON-LD structured data, comprehensive redirects, and full documentation.',
    results: [
      'Repositioned from "general IT agency" to AI, Cloud & Software engineering specialist',
      'Implemented working contact form with database storage and email notifications',
      'Full technical SEO implementation including sitemap, robots, and structured data',
    ],
    technologies: [
      { name: 'Next.js 14', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Framer Motion', category: 'frontend' },
      { name: 'Three.js', category: 'frontend' },
      { name: 'Neon PostgreSQL', category: 'database' },
      { name: 'Nodemailer', category: 'backend' },
    ],
    status: 'live',
    services: ['software-development'],
    year: 2025,
    featured: false,
    coverImage: null,
    liveUrl: 'https://iitdeveloper.com',
    repoUrl: null,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Status label for display */
export function getStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    live: 'Live',
    'in-development': 'In Development',
    internal: 'IITDEVELOPER Product Lab',
    completed: 'Completed',
  };
  return labels[status];
}

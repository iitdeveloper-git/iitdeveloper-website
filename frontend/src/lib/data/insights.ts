/**
 * IITDEVELOPER — Insights / Articles Data
 * 
 * Each insight should be substantive, original, and professionally written.
 * Do not mass-generate thin articles.
 * Published/updated dates must be accurate.
 */

export interface InsightAuthor {
  name: string;
  role: string;
  bio: string;
}

export interface Insight {
  slug: string;
  title: string;
  summary: string;
  /** Full MDX/HTML content path or inline content */
  contentPath?: string;
  author: InsightAuthor;
  publishedAt: string;   // ISO date string
  updatedAt?: string;
  category: 'ai-automation' | 'cloud-devops' | 'software' | 'search-visibility';
  tags: string[];
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Whether to show on homepage insights preview */
  featured: boolean;
  /** Cover image in /public or null */
  coverImage: string | null;
  relatedServices: string[];
}

const iitdeveloperAuthor: InsightAuthor = {
  name: 'Ravikant Yadav',
  role: 'Founder, IITDEVELOPER',
  bio: 'Software engineer with experience across full-stack development, cloud platforms, DevOps, and AI systems. Writes about practical AI implementation, cloud engineering, and product development for growing businesses.',
};

export const insights: Insight[] = [
  {
    slug: 'geo-vs-seo-what-changes-in-ai-search',
    title: 'GEO vs SEO: What Actually Changes When AI Systems Answer Search Queries',
    summary: 'AI-powered search systems like Google AI Overviews, Perplexity, and ChatGPT retrieve and synthesise information differently from traditional search engines. This article explains what Generative Engine Optimisation (GEO) means in practice, what it shares with SEO, and what genuinely changes.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-01-15',
    category: 'search-visibility',
    tags: ['GEO', 'SEO', 'AI Search', 'AEO', 'Content Strategy'],
    readingTime: 8,
    featured: true,
    coverImage: null,
    relatedServices: ['seo-geo-ai-visibility'],
  },
  {
    slug: 'how-to-identify-ai-automation-use-case',
    title: 'How to Identify a Valuable AI Automation Use Case in Your Business',
    summary: 'Not every process should be automated, and not every automation needs AI. This guide provides a practical framework for identifying where AI-powered automation will genuinely reduce cost, improve speed, or increase consistency — and where it will not.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-02-03',
    category: 'ai-automation',
    tags: ['AI Automation', 'Business Process', 'AI Agents', 'ROI'],
    readingTime: 7,
    featured: true,
    coverImage: null,
    relatedServices: ['ai-automation'],
  },
  {
    slug: 'building-production-ready-rag-system',
    title: 'Building a Production-Ready RAG System: What Most Tutorials Miss',
    summary: 'Retrieval-Augmented Generation is straightforward to prototype but requires significant engineering to operate reliably in production. This article covers the key gaps between a demo RAG system and one that performs consistently under real conditions.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-03-10',
    category: 'ai-automation',
    tags: ['RAG', 'LLM', 'Vector Search', 'AI Engineering', 'Production AI'],
    readingTime: 10,
    featured: true,
    coverImage: null,
    relatedServices: ['ai-automation'],
  },
  {
    slug: 'when-should-a-startup-adopt-kubernetes',
    title: 'When Should a Startup Actually Adopt Kubernetes?',
    summary: 'Kubernetes is a powerful platform, but it introduces significant operational complexity. This article provides a practical framework for deciding when Kubernetes makes sense for a growing engineering team — and what to use before that point.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-04-01',
    category: 'cloud-devops',
    tags: ['Kubernetes', 'DevOps', 'Cloud', 'Platform Engineering', 'Startups'],
    readingTime: 8,
    featured: false,
    coverImage: null,
    relatedServices: ['cloud-devops'],
  },
  {
    slug: 'saas-architecture-multi-tenant-products',
    title: 'SaaS Architecture Decisions: Designing for Multi-Tenancy from the Start',
    summary: 'Multi-tenant architecture decisions made early in a SaaS product significantly affect security, performance, and cost at scale. This article covers the key models, their trade-offs, and what to consider before your first paying customer.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-04-22',
    category: 'software',
    tags: ['SaaS', 'Multi-tenancy', 'Architecture', 'Software Design'],
    readingTime: 9,
    featured: false,
    coverImage: null,
    relatedServices: ['software-development'],
  },
  {
    slug: 'structured-data-helps-search-engines',
    title: 'How Structured Data Helps Search Engines (and AI Systems) Understand Your Business',
    summary: 'Schema.org structured data is one of the most reliable ways to give search engines and AI systems clear, machine-readable information about your business, services, and content. This article explains what it does, how to implement it correctly, and what it cannot do.',
    author: iitdeveloperAuthor,
    publishedAt: '2025-05-15',
    category: 'search-visibility',
    tags: ['Structured Data', 'Schema.org', 'JSON-LD', 'SEO', 'Technical SEO'],
    readingTime: 7,
    featured: false,
    coverImage: null,
    relatedServices: ['seo-geo-ai-visibility'],
  },
];

export const featuredInsights = insights.filter((i) => i.featured);

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getInsightsByCategory(category: Insight['category']): Insight[] {
  return insights.filter((i) => i.category === category);
}

export const categoryLabels: Record<Insight['category'], string> = {
  'ai-automation': 'AI & Automation',
  'cloud-devops': 'Cloud & DevOps',
  'software': 'Software Development',
  'search-visibility': 'Search & AI Visibility',
};

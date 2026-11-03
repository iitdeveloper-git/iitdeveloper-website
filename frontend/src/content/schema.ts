/**
 * Canonical Type Definitions for IITDeveloper Shared Content Layer.
 * Single Source of Truth for both Human-Facing React UI and AI-Facing AgentContent.
 */

export interface FeatureItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  tier: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceContent {
  slug: string;
  /** Full descriptive title for SEO and Markdown headers */
  title: string;
  /** Short navigation / card title */
  shortTitle: string;
  /** SEO meta title */
  metaTitle: string;
  /** Primary description / summary */
  description: string;
  /** SEO meta description */
  metaDescription: string;
  /** Business category (Build, AI, Cloud, Grow, Commerce) */
  category: string;
  /** Hero pill badge text */
  badge: string;
  /** Hero H1 headline prefix */
  heroHeadline: string;
  /** Hero highlighted gradient phrase */
  heroHighlight: string;
  /** Hero supporting paragraph */
  heroSubtitle: string;
  /** Core capabilities / features */
  features: FeatureItem[];
  /** Supported technologies & frameworks */
  technologies: string[];
  /** Execution delivery process */
  processSteps: ProcessStep[];
  /** Optional pricing tiers */
  pricing?: PricingPlan[];
  /** Call to action headline */
  ctaHeadline?: string;
  /** Call to action subtitle */
  ctaSubtitle?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ValueItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface CaseStudyProject {
  title: string;
  client: string;
  category: string;
  description: string;
  url: string;
  displayUrl?: string;
  isInternal?: boolean;
  metrics: Array<{ label: string; value: string; change: string }>;
  tech: string[];
  timeline?: string;
  year?: string;
}

export interface SiteMeta {
  name: string;
  url: string;
  tagline: string;
  description: string;
  email: string;
  billingEmail: string;
  phone?: string;
  address: {
    city: string;
    region: string;
    country: string;
  };
  socials: Record<string, string>;
}


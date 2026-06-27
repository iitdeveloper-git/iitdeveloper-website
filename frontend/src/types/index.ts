// Common types used across the application

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: 'technical' | 'ai' | 'marketing';
  basePrice: number;
  features: string[];
}

export interface PricingEstimate {
  id: string;
  service: Service;
  selectedFeatures: string[];
  complexity: 'basic' | 'standard' | 'advanced' | 'enterprise';
  timeline: string;
  totalCost: number;
  breakdown: CostBreakdown[];
  createdAt: Date;
}

export interface CostBreakdown {
  item: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  publishedAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  image: string;
}

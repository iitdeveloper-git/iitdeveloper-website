export type ServiceCategory =
  | 'technical'   // Web, Mobile, Backend API
  | 'ai'          // AI Agents, AI Workflows, Chatbots, ML Models
  | 'ecommerce'   // Custom Ecommerce, Shopify
  | 'devops'      // DevOps, Cloud Infrastructure
  | 'marketing'   // SEO/SMM, Performance Marketing, Analytics
  | 'design'      // Graphic Design, Branding, Motion
  | 'crm'         // Salesforce Solutions
  | 'b2b'         // B2B Lead Generation & Promotion
  | 'consulting'; // Technical Consulting, Maintenance

export interface PricingTier {
  name: string;
  multiplier: number;
  description: string;
}

export interface ServiceOption {
  id: string;
  label: string;
  type: 'select' | 'number' | 'checkbox' | 'multiselect';
  options?: { value: string; label: string; priceModifier?: number }[];
  min?: number;
  max?: number;
  step?: number;
  priceModifier?: number;
  required?: boolean;
  default?: string | number | boolean;
}

export interface ServiceTemplate {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  basePrice: number;
  unit: 'project' | 'month' | 'hour' | 'user' | 'page';
  icon: string;
  options: ServiceOption[];
  estimatedDuration?: string;
}

export interface LineItemConfig {
  [optionId: string]: string | number | boolean | string[];
}

export interface LineItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  configuration: LineItemConfig;
  basePrice: number;
  totalPrice: number;
  unit: string;
  notes?: string;
}

export interface PricingEstimate {
  id: string;
  quotationNumber?: string; // Format: IIT-QT-YYYYMM-NNNN
  createdAt: Date;
  updatedAt: Date;
  lineItems: LineItem[];
  subtotal: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    reason?: string;
  };
  tax?: {
    rate: number;
    amount: number;
  };
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  validUntil?: Date;
  customerInfo?: {
    name: string;
    email: string;
    company?: string;
  };
}

// Database types for Services, Pricing, and Leads
// Auto-generated from schema - Migration 002

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Service {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  icon: string | null;
  image_url: string | null;
  color: string | null;
  base_price: number;
  price_unit: string;
  price_display: string | null;
  features: string[]; // JSONB array
  tech_stack: string[]; // JSONB array
  deliverables: string[]; // JSONB array
  timeline_estimate: string | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  is_configurable: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ServiceWithCategory extends Service {
  category_name: string | null;
  category_slug: string | null;
}

export type ServiceConfigInputType = 
  | 'select' 
  | 'number' 
  | 'boolean' 
  | 'text' 
  | 'multi-select';

export type PriceModifierType = 
  | 'multiplier' 
  | 'flat' 
  | 'percentage' 
  | 'none';

export interface ServiceConfigOption {
  value: string;
  label: string;
  priceModifier?: number;
  description?: string;
}

export interface ServiceConfiguration {
  id: string;
  service_id: string;
  name: string;
  key: string;
  description: string | null;
  input_type: ServiceConfigInputType;
  options: ServiceConfigOption[]; // JSONB array
  default_value: string | null;
  min_value: number | null;
  max_value: number | null;
  is_required: boolean;
  price_modifier_type: PriceModifierType;
  price_modifier: number;
  display_order: number;
  help_text: string | null;
  created_at: Date;
  updated_at: Date;
}

// ============================================================================
// PRICING TYPES
// ============================================================================

export type PricingRuleType = 
  | 'discount' 
  | 'markup' 
  | 'bundle' 
  | 'volume' 
  | 'seasonal';

export type PricingValueType = 
  | 'percentage' 
  | 'flat' 
  | 'multiplier';

export interface PricingRuleConditions {
  minTotal?: number;
  maxTotal?: number;
  serviceIds?: string[];
  minServiceCount?: number;
  customerSegment?: string;
  categoryIds?: string[];
  [key: string]: any; // Allow flexible conditions
}

export interface PricingRule {
  id: string;
  name: string;
  description: string | null;
  rule_type: PricingRuleType;
  conditions: PricingRuleConditions;
  value_type: PricingValueType;
  value: number;
  max_discount: number | null;
  valid_from: Date | null;
  valid_until: Date | null;
  priority: number;
  is_cumulative: boolean;
  is_active: boolean;
  usage_count: number;
  max_usage: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface PricingRuleApplication {
  id: string;
  estimate_id: string;
  pricing_rule_id: string | null;
  rule_name: string;
  rule_type: string;
  discount_amount: number;
  applied_at: Date;
}

// ============================================================================
// LEAD TYPES
// ============================================================================

export type LeadSource = 
  | 'contact-form' 
  | 'estimator' 
  | 'chat' 
  | 'referral' 
  | 'manual';

export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'qualified' 
  | 'proposal-sent' 
  | 'negotiation' 
  | 'won' 
  | 'lost' 
  | 'disqualified';

export type LeadQuality = 
  | 'hot' 
  | 'warm' 
  | 'cold' 
  | 'unknown';

export interface LeadData {
  services?: string[];
  complexity?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  [key: string]: any;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  message: string | null;
  source: LeadSource;
  source_url: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  assigned_at: Date | null;
  lead_score: number;
  lead_quality: LeadQuality;
  budget_range: string | null;
  estimated_value: number | null;
  timeline: string | null;
  estimate_id: string | null;
  converted_to_customer_id: string | null;
  lead_data: LeadData;
  tags: string[];
  last_contact_at: Date | null;
  converted_at: Date | null;
  lost_at: Date | null;
  lost_reason: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type LeadActivityType = 
  | 'note' 
  | 'call' 
  | 'email' 
  | 'meeting' 
  | 'status_change' 
  | 'assignment' 
  | 'score_change';

export interface LeadActivityMetadata {
  old_status?: string;
  new_status?: string;
  old_score?: number;
  new_score?: number;
  duration?: number; // For calls/meetings
  attachments?: string[];
  [key: string]: any;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  activity_type: LeadActivityType;
  title: string | null;
  description: string | null;
  metadata: LeadActivityMetadata;
  created_by: string | null;
  created_at: Date;
}

// ============================================================================
// VIEW TYPES
// ============================================================================

export interface LeadStats {
  total_leads: number;
  new_count: number;
  contacted_count: number;
  qualified_count: number;
  won_count: number;
  lost_count: number;
  hot_leads: number;
  warm_leads: number;
  average_score: number;
  total_estimated_value: number;
  won_value: number;
  unique_sources: number;
}

// ============================================================================
// CREATE/UPDATE TYPES
// ============================================================================

export interface CreateServiceCategory {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface UpdateServiceCategory {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface CreateService {
  category_id?: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  long_description?: string;
  icon?: string;
  image_url?: string;
  color?: string;
  base_price: number;
  price_unit?: string;
  price_display?: string;
  features?: string[];
  tech_stack?: string[];
  deliverables?: string[];
  timeline_estimate?: string;
  display_order?: number;
  is_featured?: boolean;
  is_active?: boolean;
  is_configurable?: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface UpdateService extends Partial<CreateService> {}

export interface CreateServiceConfiguration {
  service_id: string;
  name: string;
  key: string;
  description?: string;
  input_type?: ServiceConfigInputType;
  options?: ServiceConfigOption[];
  default_value?: string;
  min_value?: number;
  max_value?: number;
  is_required?: boolean;
  price_modifier_type?: PriceModifierType;
  price_modifier?: number;
  display_order?: number;
  help_text?: string;
}

export interface UpdateServiceConfiguration extends Partial<CreateServiceConfiguration> {}

export interface CreatePricingRule {
  name: string;
  description?: string;
  rule_type: PricingRuleType;
  conditions: PricingRuleConditions;
  value_type: PricingValueType;
  value: number;
  max_discount?: number;
  valid_from?: Date;
  valid_until?: Date;
  priority?: number;
  is_cumulative?: boolean;
  is_active?: boolean;
  max_usage?: number;
}

export interface UpdatePricingRule extends Partial<CreatePricingRule> {}

export interface CreateLead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  message?: string;
  source: LeadSource;
  source_url?: string;
  status?: LeadStatus;
  budget_range?: string;
  estimated_value?: number;
  timeline?: string;
  estimate_id?: string;
  lead_data?: LeadData;
  tags?: string[];
}

export interface UpdateLead {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  message?: string;
  status?: LeadStatus;
  assigned_to?: string;
  lead_score?: number;
  lead_quality?: LeadQuality;
  budget_range?: string;
  estimated_value?: number;
  timeline?: string;
  lead_data?: LeadData;
  tags?: string[];
  last_contact_at?: Date;
  lost_reason?: string;
}

export interface CreateLeadActivity {
  lead_id: string;
  activity_type: LeadActivityType;
  title?: string;
  description?: string;
  metadata?: LeadActivityMetadata;
  created_by?: string;
}

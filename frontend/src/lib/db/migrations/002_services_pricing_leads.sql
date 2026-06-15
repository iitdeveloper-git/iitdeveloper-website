-- Migration 002: Services, Pricing Rules, and Leads Management
-- PostgreSQL 15+
-- Description: Adds services catalog, dynamic pricing, and lead management

-- ============================================================================
-- SERVICE CATEGORIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100), -- lucide-react icon name
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_service_categories_order ON service_categories(display_order);

-- Trigger for service_categories updated_at
CREATE TRIGGER update_service_categories_updated_at 
  BEFORE UPDATE ON service_categories 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SERVICES CATALOG
-- ============================================================================

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  
  -- Basic info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  tagline VARCHAR(500),
  description TEXT,
  long_description TEXT,
  
  -- Visual
  icon VARCHAR(100), -- lucide-react icon name
  image_url TEXT,
  color VARCHAR(50), -- hex color for theming
  
  -- Pricing
  base_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  price_unit VARCHAR(50) DEFAULT 'project', -- 'project', 'hour', 'month', 'user'
  price_display VARCHAR(100), -- Custom display text like "Starting from $15,000"
  
  -- Features
  features JSONB DEFAULT '[]'::jsonb, -- Array of feature strings
  tech_stack JSONB DEFAULT '[]'::jsonb, -- Array of technologies used
  deliverables JSONB DEFAULT '[]'::jsonb, -- What's delivered
  timeline_estimate VARCHAR(100), -- e.g., "4-6 weeks"
  
  -- Metadata
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_configurable BOOLEAN NOT NULL DEFAULT true, -- Has configuration options
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_features_gin ON services USING GIN (features);
CREATE INDEX IF NOT EXISTS idx_services_deleted ON services(deleted_at) WHERE deleted_at IS NULL;

-- Trigger for services updated_at
CREATE TRIGGER update_services_updated_at 
  BEFORE UPDATE ON services 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SERVICE CONFIGURATIONS (Options for each service)
-- ============================================================================

CREATE TABLE IF NOT EXISTS service_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  
  -- Configuration details
  name VARCHAR(255) NOT NULL, -- e.g., "Complexity Level", "Number of Pages"
  key VARCHAR(100) NOT NULL, -- e.g., "complexity", "page_count"
  description TEXT,
  
  -- Input type
  input_type VARCHAR(50) NOT NULL DEFAULT 'select', -- 'select', 'number', 'boolean', 'text', 'multi-select'
  
  -- Options (for select/multi-select)
  options JSONB DEFAULT '[]'::jsonb, -- [{"value": "simple", "label": "Simple", "priceModifier": 0}]
  
  -- Validation
  default_value TEXT,
  min_value DECIMAL(10, 2),
  max_value DECIMAL(10, 2),
  is_required BOOLEAN NOT NULL DEFAULT false,
  
  -- Pricing impact
  price_modifier_type VARCHAR(20) DEFAULT 'multiplier', -- 'multiplier', 'flat', 'percentage', 'none'
  price_modifier DECIMAL(10, 4) DEFAULT 1.0,
  
  -- Display
  display_order INTEGER NOT NULL DEFAULT 0,
  help_text TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_configs_service ON service_configurations(service_id);
CREATE INDEX IF NOT EXISTS idx_service_configs_key ON service_configurations(key);
CREATE INDEX IF NOT EXISTS idx_service_configs_order ON service_configurations(display_order);

-- Trigger for service_configurations updated_at
CREATE TRIGGER update_service_configurations_updated_at 
  BEFORE UPDATE ON service_configurations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PRICING RULES (Dynamic pricing, discounts, bundles)
-- ============================================================================

CREATE TABLE IF NOT EXISTS pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Rule info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rule_type VARCHAR(50) NOT NULL, -- 'discount', 'markup', 'bundle', 'volume', 'seasonal'
  
  -- Conditions (JSONB for flexibility)
  conditions JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {"minTotal": 50000, "serviceIds": ["uuid1", "uuid2"], "customerSegment": "enterprise"}
  
  -- Value
  value_type VARCHAR(20) NOT NULL, -- 'percentage', 'flat', 'multiplier'
  value DECIMAL(10, 4) NOT NULL,
  max_discount DECIMAL(10, 2), -- Cap for percentage discounts
  
  -- Validity
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  
  -- Priority (higher = applied first)
  priority INTEGER NOT NULL DEFAULT 0,
  
  -- Rules
  is_cumulative BOOLEAN NOT NULL DEFAULT false, -- Can stack with other discounts
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  -- Usage tracking
  usage_count INTEGER NOT NULL DEFAULT 0,
  max_usage INTEGER, -- Limit number of uses
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pricing_rules_type ON pricing_rules(rule_type);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_active ON pricing_rules(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_pricing_rules_priority ON pricing_rules(priority DESC);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_validity ON pricing_rules(valid_from, valid_until);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_conditions_gin ON pricing_rules USING GIN (conditions);

-- Trigger for pricing_rules updated_at
CREATE TRIGGER update_pricing_rules_updated_at 
  BEFORE UPDATE ON pricing_rules 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- LEADS (Customer leads from contact forms, estimator, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Contact info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  job_title VARCHAR(255),
  
  -- Lead details
  message TEXT,
  source VARCHAR(50) NOT NULL, -- 'contact-form', 'estimator', 'chat', 'referral', 'manual'
  source_url TEXT, -- Page where lead came from
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'new', 
  -- 'new', 'contacted', 'qualified', 'proposal-sent', 'negotiation', 'won', 'lost', 'disqualified'
  
  -- Assignment
  assigned_to VARCHAR(255), -- User email or ID
  assigned_at TIMESTAMP,
  
  -- Lead scoring
  lead_score INTEGER DEFAULT 0, -- 0-100 score
  lead_quality VARCHAR(20) DEFAULT 'unknown', -- 'hot', 'warm', 'cold', 'unknown'
  
  -- Business info
  budget_range VARCHAR(50), -- e.g., "$10k-$25k", "$25k-$50k"
  estimated_value DECIMAL(10, 2),
  timeline VARCHAR(100), -- When they need the work done
  
  -- Related records
  estimate_id UUID REFERENCES estimates(id) ON DELETE SET NULL,
  converted_to_customer_id UUID, -- Future: link to customer table
  
  -- Additional data (flexible for various sources)
  lead_data JSONB DEFAULT '{}'::jsonb,
  -- Example: {"services": ["web-app", "mobile-app"], "complexity": "medium", "utm_source": "google"}
  
  -- Tags
  tags JSONB DEFAULT '[]'::jsonb, -- Array of tag strings
  
  -- Dates
  last_contact_at TIMESTAMP,
  converted_at TIMESTAMP,
  lost_at TIMESTAMP,
  lost_reason TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_estimate ON leads(estimate_id);
CREATE INDEX IF NOT EXISTS idx_leads_quality ON leads(lead_quality);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_deleted ON leads(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_data_gin ON leads USING GIN (lead_data);
CREATE INDEX IF NOT EXISTS idx_leads_tags_gin ON leads USING GIN (tags);

-- Trigger for leads updated_at
CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- LEAD ACTIVITIES (Activity log for leads)
-- ============================================================================

CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Activity details
  activity_type VARCHAR(50) NOT NULL, 
  -- 'note', 'call', 'email', 'meeting', 'status_change', 'assignment', 'score_change'
  
  title VARCHAR(255),
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- User info
  created_by VARCHAR(255), -- User email or ID
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_type ON lead_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created ON lead_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_activities_metadata_gin ON lead_activities USING GIN (metadata);

-- ============================================================================
-- PRICING RULE APPLICATIONS (Track which rules were applied)
-- ============================================================================

CREATE TABLE IF NOT EXISTS pricing_rule_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  pricing_rule_id UUID REFERENCES pricing_rules(id) ON DELETE SET NULL,
  
  -- Application details
  rule_name VARCHAR(255) NOT NULL, -- Store name in case rule is deleted
  rule_type VARCHAR(50) NOT NULL,
  discount_amount DECIMAL(10, 2) NOT NULL,
  
  applied_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pricing_applications_estimate ON pricing_rule_applications(estimate_id);
CREATE INDEX IF NOT EXISTS idx_pricing_applications_rule ON pricing_rule_applications(pricing_rule_id);

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Active services view
CREATE OR REPLACE VIEW active_services AS
SELECT s.*, c.name as category_name, c.slug as category_slug
FROM services s
LEFT JOIN service_categories c ON s.category_id = c.id
WHERE s.is_active = true AND s.deleted_at IS NULL
ORDER BY s.display_order, s.name;

-- Active leads view
CREATE OR REPLACE VIEW active_leads AS
SELECT * FROM leads WHERE deleted_at IS NULL;

-- Lead statistics view
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'new') as new_count,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted_count,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_count,
  COUNT(*) FILTER (WHERE status = 'won') as won_count,
  COUNT(*) FILTER (WHERE status = 'lost') as lost_count,
  COUNT(*) FILTER (WHERE lead_quality = 'hot') as hot_leads,
  COUNT(*) FILTER (WHERE lead_quality = 'warm') as warm_leads,
  AVG(lead_score) as average_score,
  SUM(estimated_value) as total_estimated_value,
  SUM(estimated_value) FILTER (WHERE status = 'won') as won_value,
  COUNT(DISTINCT source) as unique_sources
FROM active_leads;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to calculate lead score based on various factors
CREATE OR REPLACE FUNCTION calculate_lead_score(
  p_budget_range VARCHAR(50),
  p_timeline VARCHAR(100),
  p_message TEXT,
  p_company VARCHAR(255),
  p_source VARCHAR(50)
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Budget scoring
  CASE p_budget_range
    WHEN '$50k+' THEN score := score + 40;
    WHEN '$25k-$50k' THEN score := score + 30;
    WHEN '$10k-$25k' THEN score := score + 20;
    WHEN '$5k-$10k' THEN score := score + 10;
    ELSE score := score + 5;
  END CASE;
  
  -- Timeline scoring (urgent = higher score)
  IF p_timeline ILIKE '%urgent%' OR p_timeline ILIKE '%asap%' THEN
    score := score + 20;
  ELSIF p_timeline ILIKE '%1-2 weeks%' OR p_timeline ILIKE '%immediately%' THEN
    score := score + 15;
  ELSIF p_timeline ILIKE '%month%' THEN
    score := score + 10;
  END IF;
  
  -- Message quality (detailed message = higher intent)
  IF LENGTH(p_message) > 200 THEN
    score := score + 15;
  ELSIF LENGTH(p_message) > 100 THEN
    score := score + 10;
  ELSIF LENGTH(p_message) > 50 THEN
    score := score + 5;
  END IF;
  
  -- Company presence
  IF p_company IS NOT NULL AND LENGTH(p_company) > 0 THEN
    score := score + 10;
  END IF;
  
  -- Source quality
  CASE p_source
    WHEN 'estimator' THEN score := score + 15; -- High intent
    WHEN 'referral' THEN score := score + 10;
    WHEN 'contact-form' THEN score := score + 5;
    ELSE score := score + 0;
  END CASE;
  
  -- Cap at 100
  IF score > 100 THEN
    score := 100;
  END IF;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-assign lead quality based on score
CREATE OR REPLACE FUNCTION assign_lead_quality(p_score INTEGER)
RETURNS VARCHAR(20) AS $$
BEGIN
  IF p_score >= 70 THEN
    RETURN 'hot';
  ELSIF p_score >= 40 THEN
    RETURN 'warm';
  ELSE
    RETURN 'cold';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA (Sample services and categories)
-- ============================================================================

-- Insert service categories
INSERT INTO service_categories (name, slug, description, icon, display_order) VALUES
  ('Development', 'development', 'Custom software and application development', 'Code', 1),
  ('Design', 'design', 'UI/UX design and branding services', 'Palette', 2),
  ('Consulting', 'consulting', 'Technical consulting and strategy', 'MessageSquare', 3),
  ('Infrastructure', 'infrastructure', 'Cloud and DevOps services', 'Server', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample services (matches existing pricing estimator)
INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit, 
  features, is_featured, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'development'),
  'Web Application Development',
  'web-app',
  'Custom web apps built for scale',
  'Full-stack web application development with modern frameworks and best practices.',
  'Globe',
  15000,
  'project',
  '["Modern tech stack", "Responsive design", "API integration", "Database design", "Testing & QA", "Deployment"]'::jsonb,
  true,
  true,
  1
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_featured, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'development'),
  'Mobile App Development',
  'mobile-app',
  'Native and cross-platform mobile apps',
  'iOS and Android app development with React Native or native technologies.',
  'Smartphone',
  20000,
  'project',
  '["iOS & Android", "Cross-platform", "Native performance", "App Store deployment", "Push notifications"]'::jsonb,
  true,
  true,
  2
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'development'),
  'E-commerce Platform',
  'ecommerce',
  'Complete online store solutions',
  'Custom e-commerce platforms with payment integration, inventory management, and more.',
  'ShoppingCart',
  25000,
  'project',
  '["Payment gateway", "Inventory management", "Order tracking", "Admin dashboard", "Customer portal"]'::jsonb,
  true,
  3
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'development'),
  'API Development',
  'api',
  'RESTful and GraphQL APIs',
  'Scalable API development with comprehensive documentation and security.',
  'GitBranch',
  8000,
  'project',
  '["REST & GraphQL", "Authentication", "Rate limiting", "Documentation", "Monitoring"]'::jsonb,
  true,
  4
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'design'),
  'UI/UX Design',
  'uiux',
  'Beautiful and intuitive interfaces',
  'User interface and experience design with prototyping and user testing.',
  'Palette',
  5000,
  'project',
  '["User research", "Wireframing", "Prototyping", "Visual design", "Usability testing"]'::jsonb,
  true,
  5
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'consulting'),
  'Technical Consulting',
  'consulting',
  'Expert technical guidance',
  'Strategic technical consulting to help you make the right technology decisions.',
  'MessageSquare',
  150,
  'hour',
  '["Technology selection", "Architecture review", "Performance optimization", "Best practices"]'::jsonb,
  true,
  6
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (
  category_id, name, slug, tagline, description, icon, base_price, price_unit,
  features, is_active, display_order
)
SELECT 
  (SELECT id FROM service_categories WHERE slug = 'infrastructure'),
  'DevOps & Cloud',
  'devops',
  'Infrastructure automation and deployment',
  'CI/CD pipelines, cloud infrastructure, and DevOps best practices.',
  'Server',
  3000,
  'month',
  '["CI/CD setup", "Cloud infrastructure", "Monitoring", "Auto-scaling", "Security hardening"]'::jsonb,
  true,
  7
ON CONFLICT (slug) DO NOTHING;

-- Insert sample pricing rules
INSERT INTO pricing_rules (
  name, description, rule_type, conditions, value_type, value, is_active, priority
) VALUES
  (
    'Volume Discount - $50k+',
    'Automatic 10% discount for projects over $50,000',
    'discount',
    '{"minTotal": 50000}'::jsonb,
    'percentage',
    10,
    true,
    10
  ),
  (
    'Multi-Service Bundle',
    '15% discount when purchasing 3+ services',
    'bundle',
    '{"minServiceCount": 3}'::jsonb,
    'percentage',
    15,
    true,
    20
  ),
  (
    'Early Bird Special',
    'Limited time 20% discount (expires end of month)',
    'seasonal',
    '{}'::jsonb,
    'percentage',
    20,
    false, -- Set to true to activate
    5
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Add comment to track migration
COMMENT ON TABLE services IS 'Service catalog with pricing and configuration - Migration 002';
COMMENT ON TABLE leads IS 'Customer leads and lead management - Migration 002';
COMMENT ON TABLE pricing_rules IS 'Dynamic pricing rules and discounts - Migration 002';

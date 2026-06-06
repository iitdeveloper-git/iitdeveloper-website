-- Pricing Estimates Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Estimates table
CREATE TABLE IF NOT EXISTS estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Line items (stored as JSONB for flexibility)
  line_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  discount_type VARCHAR(20),
  discount_value DECIMAL(10, 2),
  discount_reason TEXT,
  tax_rate DECIMAL(5, 2),
  tax_amount DECIMAL(10, 2),
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
  
  -- Customer info
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_company VARCHAR(255),
  customer_phone VARCHAR(50),
  customer_message TEXT,
  
  -- Metadata
  valid_until TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMP,
  
  -- Soft delete
  deleted_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_estimates_po_number ON estimates(po_number);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimates_customer_email ON estimates(customer_email);
CREATE INDEX IF NOT EXISTS idx_estimates_created_at ON estimates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_estimates_deleted_at ON estimates(deleted_at) WHERE deleted_at IS NULL;

-- Line items JSONB indexes for querying
CREATE INDEX IF NOT EXISTS idx_estimates_line_items_gin ON estimates USING GIN (line_items);

-- Activity log table (for tracking changes)
CREATE TABLE IF NOT EXISTS estimate_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  
  -- Activity details
  activity_type VARCHAR(50) NOT NULL, -- 'created', 'updated', 'sent', 'approved', 'rejected', 'viewed'
  description TEXT,
  metadata JSONB,
  
  -- User info (optional, for future admin features)
  user_email VARCHAR(255),
  user_ip VARCHAR(45),
  user_agent TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_estimate_id ON estimate_activities(estimate_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON estimate_activities(created_at DESC);

-- Email log table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID REFERENCES estimates(id) ON DELETE SET NULL,
  
  -- Email details
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  email_type VARCHAR(50) NOT NULL, -- 'estimate_sent', 'estimate_approved', 'estimate_rejected'
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  
  -- External service
  external_id VARCHAR(255), -- ID from email service (e.g., Resend)
  error_message TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_logs_estimate_id ON email_logs(estimate_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for estimates table
CREATE TRIGGER update_estimates_updated_at 
  BEFORE UPDATE ON estimates 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate PO number
CREATE OR REPLACE FUNCTION generate_po_number()
RETURNS VARCHAR(50) AS $$
DECLARE
  year_month VARCHAR(6);
  random_suffix VARCHAR(4);
  new_po_number VARCHAR(50);
  attempts INT := 0;
BEGIN
  year_month := TO_CHAR(NOW(), 'YYYYMM');
  
  LOOP
    random_suffix := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    new_po_number := 'PO-' || year_month || '-' || random_suffix;
    
    -- Check if PO number already exists
    IF NOT EXISTS (SELECT 1 FROM estimates WHERE po_number = new_po_number) THEN
      RETURN new_po_number;
    END IF;
    
    attempts := attempts + 1;
    IF attempts > 100 THEN
      RAISE EXCEPTION 'Failed to generate unique PO number after 100 attempts';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- View for active estimates (not deleted)
CREATE OR REPLACE VIEW active_estimates AS
SELECT * FROM estimates WHERE deleted_at IS NULL;

-- View for estimate summary statistics
CREATE OR REPLACE VIEW estimate_stats AS
SELECT 
  COUNT(*) as total_estimates,
  COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
  COUNT(*) FILTER (WHERE status = 'sent') as sent_count,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected_count,
  SUM(total) as total_value,
  SUM(total) FILTER (WHERE status = 'approved') as approved_value,
  AVG(total) as average_value,
  COUNT(DISTINCT customer_email) as unique_customers
FROM active_estimates;

-- Sample data for testing (optional)
-- INSERT INTO estimates (po_number, line_items, subtotal, total, status, customer_email)
-- VALUES (
--   generate_po_number(),
--   '[{"id":"item-1","serviceId":"web-app","serviceName":"Web Application Development","quantity":1,"configuration":{"complexity":"simple"},"basePrice":15000,"totalPrice":15000,"unit":"project"}]'::jsonb,
--   15000,
--   15000,
--   'draft',
--   'test@example.com'
-- );

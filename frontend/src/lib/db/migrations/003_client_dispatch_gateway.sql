-- Migration 003: Client Dispatch Gateway — clients + client_leads
-- PostgreSQL 15+
-- Description: Universal event intake for all IITDeveloper client websites
-- Database: iitdeveloper_prod on core_postgres

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients registry
CREATE TABLE IF NOT EXISTS clients (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            VARCHAR(100)  UNIQUE NOT NULL,
  name            VARCHAR(255)  NOT NULL,
  logo_url        TEXT,
  brand_color     VARCHAR(20)   NOT NULL DEFAULT '#000000',
  notification_email  VARCHAR(255) NOT NULL,
  notification_phone  VARCHAR(30),
  allowed_origins TEXT[]        NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);

-- Client leads (universal: inquiry, booking, order, appointment, …)
CREATE TABLE IF NOT EXISTS client_leads (
  id                    UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id             UUID          NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  client_slug           VARCHAR(100)  NOT NULL,
  event_type            VARCHAR(100)  NOT NULL DEFAULT 'inquiry.received',
  category              VARCHAR(100),
  name                  VARCHAR(255)  NOT NULL,
  phone                 VARCHAR(30),
  email                 VARCHAR(255),
  message               TEXT,
  fields_json           JSONB         NOT NULL DEFAULT '[]',
  source_url            TEXT,
  user_agent            TEXT,
  ip_address            INET,
  notification_status   VARCHAR(20)   NOT NULL DEFAULT 'pending',
  notification_message_id TEXT,
  status                VARCHAR(30)   NOT NULL DEFAULT 'new',
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_leads_client_slug ON client_leads(client_slug);
CREATE INDEX IF NOT EXISTS idx_client_leads_created_at  ON client_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_client_leads_status      ON client_leads(status);
CREATE INDEX IF NOT EXISTS idx_client_leads_event_type  ON client_leads(event_type);
CREATE INDEX IF NOT EXISTS idx_client_leads_email       ON client_leads(email) WHERE email IS NOT NULL;

-- Seed: Knowledge King Education
INSERT INTO clients (slug, name, notification_email, notification_phone, brand_color, allowed_origins)
VALUES (
  'knowledgekingedu',
  'Knowledge King Education',
  'info.knowledgekingedu@gmail.com',
  '+917388591234',
  '#d97706',
  ARRAY['https://kke.iitdeveloper.com','http://localhost:3001','http://localhost:5173']
) ON CONFLICT (slug) DO NOTHING;

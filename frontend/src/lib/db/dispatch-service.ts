/**
 * dispatch-service.ts
 * Database operations for the universal /api/dispatch gateway.
 * Uses a SEPARATE pool pointing to iitdeveloper_prod on the VPS core_postgres.
 * Env var: IITD_DATABASE_URL
 */

import { Pool } from 'pg';

// ─── Separate pool for iitdeveloper_prod ──────────────────────────────────────
// We do NOT use the shared Neon pool (client.ts) — this DB is on VPS core_postgres.

let _iitdPool: Pool | null = null;

function getIitdPool(): Pool {
  if (!process.env.IITD_DATABASE_URL) {
    throw new Error('IITD_DATABASE_URL is not configured');
  }
  if (!_iitdPool) {
    _iitdPool = new Pool({
      connectionString: process.env.IITD_DATABASE_URL,
      ssl: false,           // VPS internal network — no SSL needed
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return _iitdPool;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DispatchField {
  label: string;
  value: string;
}

export interface ClientRecord {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  brand_color: string;
  notification_email: string;
  notification_phone: string | null;
  allowed_origins: string[];
}

export interface CreateLeadInput {
  client_id: string;
  client_slug: string;
  event_type: string;
  category?: string;
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  fields_json: DispatchField[];
  source_url?: string;
  user_agent?: string;
  ip_address?: string;
  notification_status?: string;
  notification_message_id?: string;
}

export interface LeadRecord {
  id: string;
  client_slug: string;
  event_type: string;
  name: string;
  phone: string | null;
  email: string | null;
  status: string;
  notification_status: string;
  created_at: string;
}

// ─── Client lookup ────────────────────────────────────────────────────────────

export async function getClientBySlug(slug: string): Promise<ClientRecord | null> {
  const pool = getIitdPool();
  const result = await pool.query<ClientRecord>(
    `SELECT id, slug, name, logo_url, brand_color, notification_email,
            notification_phone, allowed_origins
     FROM clients WHERE slug = $1 LIMIT 1`,
    [slug]
  );
  return result.rows[0] ?? null;
}

// ─── Lead persistence ──────────────────────────────────────────────────────────

export async function insertLead(input: CreateLeadInput): Promise<LeadRecord> {
  const pool = getIitdPool();
  const result = await pool.query<LeadRecord>(
    `INSERT INTO client_leads
       (client_id, client_slug, event_type, category, name, phone, email, message,
        fields_json, source_url, user_agent, ip_address,
        notification_status, notification_message_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,$11,
             CASE WHEN $12 = '' OR $12 IS NULL THEN NULL ELSE $12::inet END,
             $13,$14)
     RETURNING id, client_slug, event_type, name, phone, email, status,
               notification_status, created_at`,
    [
      input.client_id,
      input.client_slug,
      input.event_type,
      input.category        ?? null,
      input.name,
      input.phone           ?? null,
      input.email           ?? null,
      input.message         ?? null,
      JSON.stringify(input.fields_json),
      input.source_url      ?? null,
      input.user_agent      ?? null,
      input.ip_address      ?? null,
      input.notification_status    ?? 'pending',
      input.notification_message_id ?? null,
    ]
  );
  return result.rows[0];
}

// ─── Update notification status after Sendrin call ───────────────────────────

export async function updateLeadNotificationStatus(
  leadId: string,
  status: 'sent' | 'failed',
  messageId?: string
): Promise<void> {
  const pool = getIitdPool();
  await pool.query(
    `UPDATE client_leads
     SET notification_status = $1, notification_message_id = $2
     WHERE id = $3`,
    [status, messageId ?? null, leadId]
  );
}

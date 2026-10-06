/**
 * POST /api/dispatch
 *
 * Universal event intake gateway for all IITDeveloper client websites.
 * Every client (Knowledge King, PulsarIP, etc.) posts here.
 *
 * Flow:
 *   1. Validate payload + CORS origin against client's allowed_origins
 *   2. Persist the lead to iitdeveloper_prod.client_leads (PostgreSQL)
 *   3. Call Sendrin (GNS) POST /api/v1/notifications internally
 *   4. Return 202 Accepted
 *
 * API: POST https://api.iitdeveloper.com/api/dispatch
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  createRateLimitResponse,
  getRateLimitHeaders,
} from '@/lib/security/rate-limiter';
import { z } from 'zod';
import {
  getClientBySlug,
  insertLead,
  updateLeadNotificationStatus,
  type ClientRecord,
  type DispatchField,
} from '@/lib/db/dispatch-service';

// ─── Validation schema ─────────────────────────────────────────────────────────

const DispatchFieldSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().max(1000),
});

const DispatchSchema = z.object({
  /** client slug, e.g. "knowledgekingedu" */
  client_id: z.string().min(1, 'client_id is required').max(100),
  /** Sendrin event key, e.g. "inquiry.received" */
  event_type: z.string().default('inquiry.received').refine((v) => v.length <= 100),
  /** Optional sub-category, e.g. "admission", "appointment" */
  category: z.string().max(100).optional(),

  contact: z.object({
    name: z.string().min(1, 'contact.name is required').max(150),
    phone: z.string().max(50).optional(),
    email: z.string().email().max(150).optional().or(z.literal('')),
  }),

  notification: z.object({
    send_email: z.boolean().default(true),
    /** Override client default recipient */
    recipient_email: z.string().email().optional(),
    client_name: z.string().optional(),
    client_logo_url: z.string().url().optional(),
    brand_color: z.string().optional(),
    subject: z.string().optional(),
  }).optional(),

  /** Dynamic key-value pairs from any form */
  fields: z.array(DispatchFieldSchema).max(30).default([]),
  message: z.string().max(5000).optional(),

  metadata: z.object({
    source_url: z.string().optional(),
    user_agent: z.string().optional(),
    ip_address: z.string().optional(),
  }).optional(),
});

type DispatchPayload = z.infer<typeof DispatchSchema>;

// ─── CORS helper ───────────────────────────────────────────────────────────────

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key',
    'Access-Control-Max-Age': '86400',
  };
}

// ─── OPTIONS — preflight ───────────────────────────────────────────────────────

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '*';
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

// ─── POST /api/dispatch ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const requestOrigin = request.headers.get('origin') ?? '';

  // 0. Extract Client IP & Check Rate Limiting (15 requests / 60 seconds per IP)
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const rateLimit = checkRateLimit(clientIp, {
    windowMs: 60_000,
    maxRequests: 15,
    namespace: 'dispatch',
  });

  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit, corsHeaders(requestOrigin || '*'));
  }

  // 1. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // 2. Validate
  const parsed = DispatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: parsed.error.errors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 3. Load client config
  let client: ClientRecord | null;
  try {
    client = await getClientBySlug(data.client_id);
  } catch (err) {
    console.error('[dispatch] DB error loading client:', err);
    return NextResponse.json({ success: false, error: 'Service unavailable' }, { status: 503 });
  }

  if (!client) {
    return NextResponse.json(
      { success: false, error: `Unknown client_id: ${data.client_id}` },
      { status: 404 }
    );
  }

  // 4. CORS origin check (skip when no origin header = server-to-server call)
  if (requestOrigin) {
    const allowed = client.allowed_origins.includes(requestOrigin);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Origin not allowed for this client' },
        { status: 403 }
      );
    }
  }

  // 5. Persist lead
  const ip =
    data.metadata?.ip_address ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined;

  let lead: Awaited<ReturnType<typeof insertLead>>;
  try {
    lead = await insertLead({
      client_id: client.id,
      client_slug: client.slug,
      event_type: data.event_type,
      category: data.category,
      name: data.contact.name,
      phone: data.contact.phone,
      email: data.contact.email || undefined,
      message: data.message,
      fields_json: data.fields,
      source_url: data.metadata?.source_url || request.headers.get('referer') || undefined,
      user_agent: data.metadata?.user_agent || request.headers.get('user-agent') || undefined,
      ip_address: ip,
      notification_status: 'pending',
    });
  } catch (err) {
    console.error('[dispatch] DB error inserting lead:', err);
    return NextResponse.json({ success: false, error: 'Failed to persist lead' }, { status: 500 });
  }

  // 6. Fire Sendrin notification (non-blocking — failure logs but doesn't fail the 202)
  void fireNotification(lead.id, data, client);

  // 7. Respond immediately
  const responseOrigin = requestOrigin && client.allowed_origins.includes(requestOrigin)
    ? requestOrigin
    : (client.allowed_origins[0] ?? '*');

  return NextResponse.json(
    { success: true, lead_id: lead.id, status: 'dispatched' },
    {
      status: 202,
      headers: {
        ...corsHeaders(responseOrigin),
        ...getRateLimitHeaders(rateLimit),
      },
    }
  );
}

// ─── Internal: fire Sendrin /api/v1/notifications ────────────────────────────

async function fireNotification(
  leadId: string,
  data: DispatchPayload,
  client: ClientRecord
): Promise<void> {
  const apiKey = process.env.SENDRIN_INTERNAL_API_KEY;
  const baseUrl = process.env.SENDRIN_INTERNAL_URL ?? 'http://gns_api:5000';

  if (!apiKey) {
    console.warn(`[dispatch] SENDRIN_INTERNAL_API_KEY not set — skipping notification for lead ${leadId}`);
    return;
  }

  const recipientEmail = data.notification?.recipient_email ?? client.notification_email;
  const clientName     = data.notification?.client_name    ?? client.name;
  const brandColor     = data.notification?.brand_color    ?? client.brand_color;
  const logoUrl        = data.notification?.client_logo_url ?? client.logo_url ?? '';
  const subject        = data.notification?.subject ??
    `New ${data.category ?? 'Inquiry'} — ${data.contact.name}`;

  // Sendrin NotificationCreate payload (POST /api/v1/notifications)
  const sendrinPayload = {
    event_key: data.event_type,          // e.g. "inquiry.received"
    channel: 'email',
    recipient: { email: recipientEmail },
    data: {
      client_name:     clientName,
      client_logo_url: logoUrl,
      brand_color:     brandColor,
      subject,
      name:            data.contact.name,
      phone:           data.contact.phone  ?? 'N/A',
      email:           data.contact.email  ?? 'N/A',
      message:         data.message        ?? '',
      fields:          data.fields,
      category:        data.category       ?? '',
      lead_id:         leadId,
    },
  };

  const idempotencyKey = `iitd-dispatch-${leadId}`;

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/v1/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Authorization':  `Bearer ${apiKey}`,
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(sendrinPayload),
      // @ts-ignore — AbortSignal.timeout is Node 18+
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error(`[dispatch] Network error calling Sendrin for lead ${leadId}:`, err);
    await updateLeadNotificationStatus(leadId, 'failed').catch(() => {});
    return;
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'unknown');
    console.error(`[dispatch] Sendrin returned ${response.status} for lead ${leadId}: ${errorText}`);
    await updateLeadNotificationStatus(leadId, 'failed').catch(() => {});
    return;
  }

  const result = await response.json().catch(() => ({})) as { id?: string };
  await updateLeadNotificationStatus(leadId, 'sent', result.id).catch(() => {});
  console.log(`[dispatch] ✓ Notification queued for lead ${leadId}, sendrin_id=${result.id}`);
}

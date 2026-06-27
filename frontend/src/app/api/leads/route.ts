import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLead } from '@/lib/db/leads-service';
import { EmailService } from '@/lib/services/email-service';

export const runtime = 'edge';

const buckets = new Map<string, { count: number; resetAt: number }>();
const recentSubmissions = new Map<string, number>();

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().min(2).max(150),
  website: z.string().trim().url().max(300).optional().or(z.literal('')),
  service_interest: z.string().trim().min(2).max(150),
  budget_range: z.string().trim().min(2).max(100),
  timeline: z.string().trim().min(2).max(100),
  message: z.string().trim().min(30).max(5000),
  consent: z.literal('true'),
  website_confirm: z.string().max(0).optional().or(z.literal('')),
  source_url: z.string().max(500).optional(),
  landing_page: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
});

function clean(value: string) {
  return value.replace(/[<>]/g, '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

export async function GET() {
  return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (bucket && bucket.resetAt > now && bucket.count >= 5) {
    return NextResponse.json({ success: false, error: 'Too many submissions. Please try again later.' }, { status: 429 });
  }
  buckets.set(ip, bucket && bucket.resetAt > now ? { ...bucket, count: bucket.count + 1 } : { count: 1, resetAt: now + 15 * 60 * 1000 });

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, error: 'Please review the highlighted form fields.', details: parsed.error.flatten() }, { status: 400 });
    const data = parsed.data;
    if (data.website_confirm) return NextResponse.json({ success: true }, { status: 202 });

    const duplicateKey = `${data.email.toLowerCase()}:${data.message.slice(0, 80)}`;
    const previous = recentSubmissions.get(duplicateKey);
    if (previous && now - previous < 10 * 60 * 1000) {
      return NextResponse.json({ success: false, error: 'This enquiry was already submitted recently.' }, { status: 409 });
    }
    recentSubmissions.set(duplicateKey, now);

    const safe = {
      name: clean(data.name),
      email: data.email.toLowerCase(),
      phone: data.phone ? clean(data.phone) : undefined,
      company: clean(data.company),
      message: clean(data.message),
      service: clean(data.service_interest),
      budget: clean(data.budget_range),
    };

    const lead = await createLead({
      name: safe.name,
      email: safe.email,
      phone: safe.phone,
      company: safe.company,
      message: safe.message,
      source: 'contact-form',
      source_url: data.source_url || request.headers.get('referer') || undefined,
      budget_range: safe.budget,
      timeline: clean(data.timeline),
      lead_data: {
        service_interest: safe.service,
        website: data.website,
        consent: true,
        consent_recorded_at: new Date().toISOString(),
        landing_page: data.landing_page,
        referrer: data.referrer,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_term: data.utm_term,
        utm_content: data.utm_content,
        user_agent: request.headers.get('user-agent'),
      },
    });

    await Promise.allSettled([
      EmailService.sendContactConfirmation({ ...safe, message: safe.message }),
      EmailService.sendContactNotification({ ...safe, message: safe.message }),
    ]);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead submission failed', error);
    return NextResponse.json({ success: false, error: 'Unable to submit right now. Please email us directly.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createLead, getAllLeads } from '@/lib/db/leads-service';
import { EmailService } from '@/lib/services/email-service';
import { z } from 'zod';


// Validation schema for lead creation
const CreateLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  job_title: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default('contact-form'),
  source_url: z.string().optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  service_interest: z.string().optional(),
  tags: z.array(z.string()).optional(),
  lead_data: z.record(z.any()).optional(),
});

// GET /api/leads - Get all leads (protected route - add auth later)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const leads = await getAllLeads(includeDeleted);

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create new lead from contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = CreateLeadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Get source URL from referer or request
    const sourceUrl = data.source_url || request.headers.get('referer') || undefined;

    // Create lead in database
    const lead = await createLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      job_title: data.job_title,
      message: data.message,
      source: data.source as any, // Type cast since validation ensures correct value
      source_url: sourceUrl,
      budget_range: data.budget_range,
      timeline: data.timeline,
      tags: data.tags,
      lead_data: {
        ...data.lead_data,
        service_interest: data.service_interest,
        user_agent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      },
    });

    // Send confirmation and notification emails (don't wait for them)
    Promise.all([
      EmailService.sendContactConfirmation({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service_interest,
        budget: data.budget_range,
        message: data.message || '',
      }),
      EmailService.sendContactNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service_interest,
        budget: data.budget_range,
        message: data.message || '',
      }),
    ]).catch((error) => {
      console.error('Error sending emails:', error);
      // Don't fail the request if emails fail
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        data: {
          id: lead.id,
          email: lead.email,
          status: lead.status,
          lead_quality: lead.lead_quality,
          lead_score: lead.lead_score,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';
import { PricingService } from '@/lib/services/pricing-service';
import { createEstimateSchema } from '@/lib/validations/pricing';

// POST /api/estimates - Create new estimate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = createEstimateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    // Create estimate
    const estimate = await PricingService.createEstimate({
      lineItems: validation.data.lineItems,
      discount: validation.data.discount,
      tax: validation.data.tax,
      customerInfo: validation.data.customerInfo,
    });

    return NextResponse.json(estimate, { status: 201 });
  } catch (error) {
    console.error('Error creating estimate:', error);
    return NextResponse.json(
      {
        error: 'Failed to create estimate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET /api/estimates - List estimates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      status: searchParams.get('status') || undefined,
      customerEmail: searchParams.get('customerEmail') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    };

    const estimates = await PricingService.listEstimates(filters);

    return NextResponse.json({
      estimates,
      count: estimates.length,
      filters,
    });
  } catch (error) {
    console.error('Error listing estimates:', error);
    return NextResponse.json(
      {
        error: 'Failed to list estimates',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

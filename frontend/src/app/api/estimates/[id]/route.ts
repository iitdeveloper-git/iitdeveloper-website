import { NextRequest, NextResponse } from 'next/server';
import { PricingService } from '@/lib/services/pricing-service';
import { updateEstimateSchema } from '@/lib/validations/pricing';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// GET /api/estimates/[id] - Get single estimate
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const estimate = await PricingService.getEstimate(id);

    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    // Log view activity
    await PricingService.logActivity(id, 'viewed', 'Estimate viewed');

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Error fetching estimate:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch estimate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/estimates/[id] - Update estimate
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validation = updateEstimateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    // Update estimate
    const estimate = await PricingService.updateEstimate(id, {
      lineItems: validation.data.lineItems,
      discount: validation.data.discount,
      tax: validation.data.tax,
      status: validation.data.status,
      customerInfo: validation.data.customerInfo,
    });

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Error updating estimate:', error);
    
    if (error instanceof Error && error.message === 'Estimate not found') {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update estimate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/estimates/[id] - Delete estimate (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await PricingService.deleteEstimate(id);

    return NextResponse.json(
      { message: 'Estimate deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting estimate:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete estimate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

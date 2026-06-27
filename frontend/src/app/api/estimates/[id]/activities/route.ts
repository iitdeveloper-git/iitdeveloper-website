import { NextRequest, NextResponse } from 'next/server';
import { PricingService } from '@/lib/services/pricing-service';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// GET /api/estimates/[id]/activities - Get estimate activity log
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check if estimate exists
    const estimate = await PricingService.getEstimate(id);
    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    // Get activities
    const activities = await PricingService.getActivities(id);

    return NextResponse.json({
      estimateId: id,
      activities,
      count: activities.length,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch activities',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

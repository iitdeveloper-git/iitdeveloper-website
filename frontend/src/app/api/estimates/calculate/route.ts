import { NextRequest, NextResponse } from 'next/server';
import { PricingService } from '@/lib/services/pricing-service';
import { calculatePriceSchema } from '@/lib/validations/pricing';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// POST /api/estimates/calculate - Calculate price for a service configuration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = calculatePriceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { serviceId, configuration, quantity } = validation.data;

    // Calculate price
    const totalPrice = PricingService.calculateLineItemPrice(
      serviceId,
      configuration,
      quantity
    );

    return NextResponse.json({
      serviceId,
      configuration,
      quantity,
      totalPrice,
      pricePerUnit: totalPrice / quantity,
    });
  } catch (error) {
    console.error('Error calculating price:', error);
    
    if (error instanceof Error && error.message.includes('Service not found')) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to calculate price',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PricingService } from '@/lib/services/pricing-service';
import { EmailService } from '@/lib/services/email-service';
import { sendEstimateSchema } from '@/lib/validations/pricing';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// POST /api/estimates/send - Send estimate via email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = sendEstimateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { estimateId, customerInfo, message } = validation.data;

    // Get estimate
    const estimate = await PricingService.getEstimate(estimateId);
    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    // Update estimate with customer info
    const updatedEstimate = await PricingService.updateEstimate(estimateId, {
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        company: customerInfo.company,
        phone: customerInfo.phone,
        message: customerInfo.message,
      },
      status: 'sent',
    });

    // Send email
    const emailResult = await EmailService.sendEstimate(
      updatedEstimate,
      customerInfo.email,
      customerInfo.name,
      message
    );

    if (!emailResult.success) {
      return NextResponse.json(
        {
          error: 'Failed to send email',
          message: emailResult.error,
        },
        { status: 500 }
      );
    }

    // Log activity
    await PricingService.logActivity(
      estimateId,
      'sent',
      `Estimate sent to ${customerInfo.email}`,
      { emailSent: true }
    );

    return NextResponse.json({
      success: true,
      estimate: updatedEstimate,
    });
  } catch (error) {
    console.error('Error sending estimate:', error);
    return NextResponse.json(
      {
        error: 'Failed to send estimate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

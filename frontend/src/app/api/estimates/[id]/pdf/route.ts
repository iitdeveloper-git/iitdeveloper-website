import { NextRequest, NextResponse } from 'next/server';
import { generateEstimatePDF, generatePDFFilename } from '@/lib/services/pdf-service';
import { PricingService } from '@/lib/services/pricing-service';

// NOTE: PDF generation requires Node.js APIs (pdfkit), so we use Node.js runtime
// Remove this route or use a different PDF generation method for Edge Runtime
export const runtime = 'nodejs';

/**
 * GET /api/estimates/[id]/pdf
 * Generate and download estimate as PDF
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Estimate ID is required' },
        { status: 400 }
      );
    }

    // Fetch estimate from database
    const estimate = await PricingService.getEstimate(id);

    if (!estimate) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      );
    }

    // Generate PDF
    const pdfBuffer = await generateEstimatePDF(estimate);
    const filename = generatePDFFilename(estimate);

    // Log activity
    await PricingService.logActivity(id, 'downloaded', 'PDF downloaded', {
      format: 'pdf',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Return PDF with proper headers (convert Buffer to Uint8Array for Next.js)
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

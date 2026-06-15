import { NextRequest, NextResponse } from 'next/server';
import { serviceTemplates } from '@/lib/pricing-config';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// GET /api/services/[id] - Get single service details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = serviceTemplates.find((s) => s.id === params.id);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch service',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

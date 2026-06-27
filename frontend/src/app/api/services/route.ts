import { NextRequest, NextResponse } from 'next/server';
import { serviceTemplates } from '@/lib/pricing-config';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// GET /api/services - Get all available services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let services = serviceTemplates;

    // Filter by category if provided
    if (category) {
      services = services.filter((s) => s.category === category);
    }

    return NextResponse.json({
      services,
      count: services.length,
      categories: ['technical', 'ai', 'marketing', 'consulting'],
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch services',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

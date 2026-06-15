import { NextRequest, NextResponse } from 'next/server';
import { healthCheck } from '@/lib/db/client';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// GET /api/health - Health check endpoint
export async function GET(request: NextRequest) {
  try {
    const dbHealthy = await healthCheck();

    const health = {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'up' : 'down',
        api: 'up',
      },
      version: process.env.npm_package_version || '1.0.0',
    };

    const status = dbHealthy ? 200 : 503;

    return NextResponse.json(health, { status });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

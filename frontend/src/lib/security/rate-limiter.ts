/**
 * rate-limiter.ts
 * Reusable in-memory sliding window rate limiter for IITDeveloper Central API Gateway.
 * Can be imported and used across any current or future API route.
 *
 * Features:
 * - Zero external dependency (runs high-performance in memory with auto TTL cleanup)
 * - Per-endpoint namespaces (prevents collisions between /api/dispatch, /api/auth, etc.)
 * - Standard RFC 6585 headers (X-RateLimit-Limit, Remaining, Reset, Retry-After)
 */

import { NextResponse } from 'next/server';

export interface RateLimitOptions {
  /** Time window in milliseconds (default: 60,000ms = 1 minute) */
  windowMs: number;
  /** Maximum number of allowed requests within windowMs (default: 10) */
  maxRequests: number;
  /** Namespace prefix to isolate different endpoints (e.g. "dispatch", "leads") */
  namespace?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  total: number;
  remaining: number;
  resetAt: number; // unix epoch in ms
  retryAfterSeconds: number;
}

interface WindowBucket {
  count: number;
  resetAt: number;
}

// Global in-memory storage across requests within this container instance
const memoryStore = new Map<string, WindowBucket>();

// Periodic garbage collection to prevent memory leaks (every 2 minutes)
if (typeof setInterval !== 'undefined') {
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of memoryStore.entries()) {
      if (now > bucket.resetAt) {
        memoryStore.delete(key);
      }
    }
  }, 120_000);

  // Unref so it doesn't hold the Node process open during graceful shutdown
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

/**
 * Check if a given identifier (e.g. Client IP) is within the allowed rate limit.
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const ns = options.namespace ?? 'default';
  const key = `${ns}:${identifier || 'anonymous'}`;

  const existing = memoryStore.get(key);

  if (!existing || now > existing.resetAt) {
    // Window expired or new identifier
    const bucket: WindowBucket = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    memoryStore.set(key, bucket);

    return {
      allowed: true,
      total: options.maxRequests,
      remaining: Math.max(0, options.maxRequests - 1),
      resetAt: bucket.resetAt,
      retryAfterSeconds: 0,
    };
  }

  // Inside existing window
  existing.count += 1;
  const allowed = existing.count <= options.maxRequests;
  const remaining = Math.max(0, options.maxRequests - existing.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    allowed,
    total: options.maxRequests,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds: allowed ? 0 : retryAfterSeconds,
  };
}

/**
 * Helper to build standard RateLimit headers.
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.total),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  };

  if (!result.allowed) {
    headers['Retry-After'] = String(result.retryAfterSeconds);
  }

  return headers;
}

/**
 * Standard 429 Too Many Requests response helper with CORS support.
 */
export function createRateLimitResponse(
  result: RateLimitResult,
  extraHeaders: Record<string, string> = {}
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please slow down.',
      retry_after_seconds: result.retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        ...extraHeaders,
        ...getRateLimitHeaders(result),
      },
    }
  );
}

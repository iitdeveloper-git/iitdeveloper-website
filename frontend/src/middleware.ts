import { NextResponse, type NextRequest } from 'next/server';
import { shouldRewriteToMarkdown } from '@iitdeveloper/agent-content-nextjs/proxy';

export function middleware(request: NextRequest) {
  const decision = shouldRewriteToMarkdown(request);

  if (decision.rewrite && decision.rewritePath) {
    const url = request.nextUrl.clone();
    const target = new URL(decision.rewritePath, request.url);
    url.pathname = target.pathname;
    url.search = target.search;

    const response = NextResponse.rewrite(url);

    // If the representation of this URL varies by Accept header, mark Vary: Accept
    if (decision.shouldVaryAccept) {
      response.headers.set('Vary', 'Accept');
    }

    return response;
  }

  const response = NextResponse.next();
  if (decision.shouldVaryAccept) {
    response.headers.set('Vary', 'Accept');
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static chunks)
     * - _next/image (image optimization)
     * - favicon.ico
     * - api routes (direct API requests)
     * - common media files (.svg, .png, .jpg, .jpeg, .gif, .webp, .ico, .txt, .xml)
     */
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
    // Specifically also include .md URLs so they get rewritten
    '/(.*\\.md$)',
  ],
};


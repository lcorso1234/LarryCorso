import { NextRequest, NextResponse } from 'next/server';
import { getSecurityHeaders } from './lib/security-middleware';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Apply security headers to all responses
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Additional security for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Add extra security headers for admin pages
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
  }
  
  // Log suspicious patterns
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /burp/i,
    /owasp/i,
    /w3af/i,
    /acunetix/i,
    /nessus/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
    console.warn('Suspicious User-Agent detected:', userAgent, 'from IP:', ip);
    // In production, you might want to block these requests
    // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
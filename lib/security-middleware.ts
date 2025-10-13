import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// CSRF Token Management
class CSRFTokenManager {
  private static tokens = new Map<string, { token: string; expires: number }>();
  
  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  
  static createSession(sessionId: string): string {
    const token = this.generateToken();
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    this.tokens.set(sessionId, { token, expires });
    
    // Clean up expired tokens
    this.cleanupExpiredTokens();
    
    return token;
  }
  
  static validateToken(sessionId: string, token: string): boolean {
    const session = this.tokens.get(sessionId);
    
    if (!session || session.expires < Date.now()) {
      this.tokens.delete(sessionId);
      return false;
    }
    
    return session.token === token;
  }
  
  private static cleanupExpiredTokens() {
    const now = Date.now();
    for (const [sessionId, session] of this.tokens.entries()) {
      if (session.expires < now) {
        this.tokens.delete(sessionId);
      }
    }
  }
}

// Security headers configuration
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: 'unsafe-inline' and 'unsafe-eval' should be removed in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "child-src 'none'",
      "worker-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy
    'Permissions-Policy': [
      'accelerometer=()',
      'camera=()',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'payment=()',
      'usb=()'
    ].join(', '),
    
    // Strict Transport Security (HTTPS only)
    ...(process.env.NODE_ENV === 'production' ? {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    } : {}),
    
    // Cache control for sensitive pages
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };
}

// Apply security headers to response
export function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders();
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

// Generate session ID
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Get or create session ID from request
export function getSessionId(request: NextRequest): string {
  const sessionCookie = request.cookies.get('session-id');
  return sessionCookie?.value || generateSessionId();
}

// Create CSRF token for session
export function createCSRFToken(sessionId: string): string {
  return CSRFTokenManager.createSession(sessionId);
}

// Validate CSRF token
export function validateCSRFToken(sessionId: string, token: string): boolean {
  return CSRFTokenManager.validateToken(sessionId, token);
}

// Security middleware function
export function createSecurityMiddleware(options: {
  requireCSRF?: boolean;
  rateLimiter?: any;
} = {}) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Apply rate limiting if provided
    if (options.rateLimiter) {
      const clientId = getClientIdentifier(request);
      const rateLimit = options.rateLimiter.isAllowed(clientId);
      
      if (!rateLimit.allowed) {
        const response = NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
        
        response.headers.set('X-RateLimit-Limit', options.rateLimiter.maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', '0');
        response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
        
        return applySecurityHeaders(response);
      }
      
      // Add rate limit headers to successful responses
      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Limit', options.rateLimiter.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
    }
    
    // CSRF protection for state-changing operations
    if (options.requireCSRF && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const sessionId = getSessionId(request);
      const csrfToken = request.headers.get('X-CSRF-Token') || 
                       request.headers.get('csrf-token');
      
      if (!csrfToken || !validateCSRFToken(sessionId, csrfToken)) {
        return applySecurityHeaders(
          NextResponse.json(
            { error: 'Invalid CSRF token' },
            { status: 403 }
          )
        );
      }
    }
    
    return null; // Continue to next middleware/handler
  };
}

// Helper function to get client identifier (moved from rate-limiter.ts)
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
            request.headers.get('x-real-ip') || 
            'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  const identifier = `${ip}_${userAgent}`;
  return Buffer.from(identifier).toString('base64').slice(0, 32);
}
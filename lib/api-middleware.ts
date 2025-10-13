import { NextRequest, NextResponse } from 'next/server';
import { InputValidator, schemas } from '@/lib/input-validator';
import { applySecurityHeaders } from '@/lib/security-middleware';
import { apiRateLimiter, getClientIdentifier } from '@/lib/rate-limiter';

// Create a wrapper for API route handlers that includes security middleware
export function withSecurity(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>,
  options: {
    requireAuth?: boolean;
    rateLimit?: boolean;
    validateInput?: boolean;
    schema?: any;
    requireCSRF?: boolean;
  } = {}
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      // Apply rate limiting
      if (options.rateLimit !== false) {
        const clientId = getClientIdentifier(request);
        const rateLimit = apiRateLimiter.isAllowed(clientId);
        
        if (!rateLimit.allowed) {
          const response = NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
          
          response.headers.set('X-RateLimit-Limit', '100');
          response.headers.set('X-RateLimit-Remaining', '0');
          response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
          
          return applySecurityHeaders(response);
        }
      }

      // Validate input if schema provided
      if (options.validateInput && options.schema && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
        try {
          const body = await request.json();
          const validation = InputValidator.validateAndSanitizeObject(body, options.schema);
          
          if (!validation.isValid) {
            return applySecurityHeaders(
              NextResponse.json(
                { error: 'Invalid input', details: validation.errors },
                { status: 400 }
              )
            );
          }
          
          // Attach sanitized data to request for use in handler
          (request as any).validatedData = validation.sanitizedData;
        } catch (error) {
          return applySecurityHeaders(
            NextResponse.json(
              { error: 'Invalid JSON format' },
              { status: 400 }
            )
          );
        }
      }

      // Call the original handler
      const response = await handler(request, context);
      
      // Apply security headers to response
      return applySecurityHeaders(response);
      
    } catch (error) {
      console.error('Security middleware error:', error);
      return applySecurityHeaders(
        NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      );
    }
  };
}

// Middleware for API routes that require admin authentication
export function withAdminAuth(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return withSecurity(async (request: NextRequest, context?: any) => {
    // Import here to avoid circular dependency
    const { verifyAdminAuthFromRequest } = await import('@/lib/auth');
    
    if (!verifyAdminAuthFromRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return handler(request, context);
  }, { requireAuth: true });
}

// Specific wrappers for common use cases
export function withBlogPostValidation(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return withAdminAuth(
    withSecurity(handler, {
      validateInput: true,
      schema: schemas.blogPost
    })
  );
}

export function withPageValidation(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return withAdminAuth(
    withSecurity(handler, {
      validateInput: true,
      schema: schemas.page
    })
  );
}
import { NextRequest, NextResponse } from 'next/server';
import { loginRateLimiter, getClientIdentifier } from '@/lib/rate-limiter';
import { InputValidator, schemas } from '@/lib/input-validator';
import { SecureAuth } from '@/lib/secure-auth';
import { applySecurityHeaders } from '@/lib/security-middleware';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = loginRateLimiter.isAllowed(clientId);
    
    if (!rateLimit.allowed) {
      const response = NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
      
      response.headers.set('X-RateLimit-Limit', '5');
      response.headers.set('X-RateLimit-Remaining', '0');
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
      
      return applySecurityHeaders(response);
    }

    const body = await request.json();
    
    // Validate input
    const validation = InputValidator.validateAndSanitizeObject(body, schemas.login);
    
    if (!validation.isValid) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: 'Invalid input', details: validation.errors },
          { status: 400 }
        )
      );
    }

    const { password } = validation.sanitizedData;
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!adminPassword || !jwtSecret) {
      console.error('Missing environment variables: ADMIN_PASSWORD or JWT_SECRET');
      return applySecurityHeaders(
        NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        )
      );
    }
    
    // Use constant-time comparison to prevent timing attacks
    if (!SecureAuth.constantTimeCompare(password, adminPassword)) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      );
    }

    // Record successful login for rate limiting
    loginRateLimiter.recordSuccess(clientId);
    
    // Create enhanced JWT token
    const sessionId = SecureAuth.generateSessionToken();
    const token = SecureAuth.createJWTToken(
      { 
        admin: true, 
        sessionId,
        loginTime: Date.now(),
        clientId: clientId.substring(0, 8) // Partial client ID for tracking
      },
      jwtSecret,
      { expiresIn: '24h' }
    );
    
    // Set secure cookie
    const response = NextResponse.json({ 
      success: true,
      sessionId: sessionId.substring(0, 16) // Return partial session ID for client reference
    });
    
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    return applySecurityHeaders(response);
    
  } catch (error) {
    console.error('Login error:', error);
    return applySecurityHeaders(
      NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    );
  }
}
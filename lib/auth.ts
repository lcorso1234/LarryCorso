import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { SecureAuth } from './secure-auth';
import { apiRateLimiter, getClientIdentifier } from './rate-limiter';

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return false;
    }
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return false;
    }
    
    // Use enhanced token verification
    const decoded = SecureAuth.verifyJWTToken(token, jwtSecret);
    
    // Additional security checks
    if (!decoded.admin || !decoded.sessionId) {
      return false;
    }
    
    // Check if token is too old (additional security layer)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (decoded.loginTime && (Date.now() - decoded.loginTime) > maxAge) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth verification failed:', error);
    return false;
  }
}

export function verifyAdminAuthFromRequest(request: Request): boolean {
  try {
    // Apply rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = apiRateLimiter.isAllowed(clientId);
    
    if (!rateLimit.allowed) {
      return false;
    }

    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return false;
    
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(cookie => {
        const [key, value] = cookie.trim().split('=');
        return [key, value];
      })
    );
    
    const token = cookies['admin-token'];
    if (!token) return false;
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return false;
    
    // Use enhanced token verification
    const decoded = SecureAuth.verifyJWTToken(token, jwtSecret);
    
    // Additional security checks
    if (!decoded.admin || !decoded.sessionId) {
      return false;
    }
    
    // Check if token is too old (additional security layer)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (decoded.loginTime && (Date.now() - decoded.loginTime) > maxAge) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
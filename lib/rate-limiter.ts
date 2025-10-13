import NodeCache from 'node-cache';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private cache: NodeCache;
  private windowMs: number;
  private maxRequests: number;
  private skipSuccessfulRequests: boolean;

  constructor(options: {
    windowMs: number;
    maxRequests: number;
    skipSuccessfulRequests?: boolean;
  }) {
    this.cache = new NodeCache({ stdTTL: Math.ceil(options.windowMs / 1000) });
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.skipSuccessfulRequests = options.skipSuccessfulRequests || false;
  }

  isAllowed(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = `rate_limit_${identifier}`;
    
    let entry: RateLimitEntry | undefined = this.cache.get(key);
    
    if (!entry || now > entry.resetTime) {
      // Create new window
      entry = {
        count: 1,
        resetTime: now + this.windowMs
      };
      this.cache.set(key, entry, Math.ceil(this.windowMs / 1000));
      
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: entry.resetTime
      };
    }
    
    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime
      };
    }
    
    entry.count++;
    this.cache.set(key, entry, Math.ceil(this.windowMs / 1000));
    
    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  recordSuccess(identifier: string) {
    if (this.skipSuccessfulRequests) {
      const key = `rate_limit_${identifier}`;
      const entry: RateLimitEntry | undefined = this.cache.get(key);
      if (entry && entry.count > 0) {
        entry.count--;
        this.cache.set(key, entry, Math.ceil(this.windowMs / 1000));
      }
    }
  }
}

// Rate limiters for different endpoints
export const loginRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
  skipSuccessfulRequests: true
});

export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 API requests per 15 minutes
});

export const strictRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10 // 10 requests per minute for sensitive endpoints
});

// Get client identifier (IP + User-Agent for better uniqueness)
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
            request.headers.get('x-real-ip') || 
            'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Create a simple hash of IP + User-Agent
  const identifier = `${ip}_${userAgent}`;
  return Buffer.from(identifier).toString('base64').slice(0, 32);
}
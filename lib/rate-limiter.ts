// Permissive rate limiter used during deployment/debugging.
// This mirrors the public API of the original rate limiter but always allows
// requests to prevent accidental blocking in staging/production while
// troubleshooting. Keep this file Edge/runtime safe and dependency-free.

export type RateLimiterOptions = {
  windowSeconds?: number; // window in seconds
  maxRequests?: number; // max requests per window
};

// Small in-memory rate limiter suitable for single-process deployments and
// for gating behavior behind an environment variable (RATE_LIMITING).
// Default: RATE_LIMITING !== 'true' => permissive (no blocking).

class RateLimiter {
  private windowSeconds: number;
  private maxRequests: number;
  // Map<identifier, {count, resetAt}>
  private store: Map<string, { count: number; resetAt: number }> = new Map();

  constructor(options: RateLimiterOptions = {}) {
    this.windowSeconds = options.windowSeconds ?? 60;
    this.maxRequests = options.maxRequests ?? 60;
  }

  private isEnforced(): boolean {
    return process.env.RATE_LIMITING === 'true';
  }

  // Returns an object similar to previous implementations
  isAllowed(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    if (!this.isEnforced()) {
      return { allowed: true, remaining: this.maxRequests, resetTime: Date.now() + this.windowSeconds * 1000 };
    }

    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now >= entry.resetAt) {
      const resetAt = now + this.windowSeconds * 1000;
      this.store.set(identifier, { count: 1, resetAt });
      return { allowed: true, remaining: this.maxRequests - 1, resetTime: resetAt };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetTime: entry.resetAt };
    }

    entry.count++;
    this.store.set(identifier, entry);
    return { allowed: true, remaining: Math.max(0, this.maxRequests - entry.count), resetTime: entry.resetAt };
  }

  // Convenience boolean
  isLimited(identifier: string): boolean {
    if (!this.isEnforced()) return false;
    const res = this.isAllowed(identifier);
    return !res.allowed;
  }

  // Reset a specific identifier
  reset(identifier: string): void {
    this.store.delete(identifier);
  }

  // Decrease the recorded count for a successful action (e.g., successful login)
  // This mirrors the previous recordSuccess semantics used by login routes.
  recordSuccess(identifier: string): void {
    const entry = this.store.get(identifier);
    if (!entry) return;
    if (entry.count > 0) {
      entry.count = Math.max(0, entry.count - 1);
      this.store.set(identifier, entry);
    }
  }
}

export const defaultRateLimiter = new RateLimiter();

// Helper exported functions/instances expected by other modules
export function getClientIdentifier(request: Request | { headers: any }): string {
  try {
    const headers = (request as any).headers;
    const xff = headers.get ? headers.get('x-forwarded-for') : headers['x-forwarded-for'];
    const ip = (xff && String(xff).split(',')[0].trim()) || (headers.get && headers.get('x-real-ip')) || 'unknown';
    const ua = (headers.get && headers.get('user-agent')) || headers['user-agent'] || 'unknown';
    const raw = `${ip}_${ua}`;
    // Use Buffer when available (Node). Fallback to encodeURIComponent
    try {
      return Buffer.from(raw).toString('base64').slice(0, 64);
    } catch (e) {
      return encodeURIComponent(raw).slice(0, 64);
    }
  } catch (e) {
    return 'unknown-client';
  }
}

export const apiRateLimiter = new RateLimiter({ windowSeconds: 60, maxRequests: 120 });
export const loginRateLimiter = new RateLimiter({ windowSeconds: 300, maxRequests: 5 });

export default RateLimiter;
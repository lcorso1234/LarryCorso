import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class SecureAuth {
  private static readonly SALT_ROUNDS = 12;
  private static readonly JWT_EXPIRY = '24h';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';

  // Hash password with bcrypt
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  // Verify password against hash
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate secure random string
  static generateSecureRandom(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  // Create JWT token with enhanced security
  static createJWTToken(payload: any, secret: string, options: any = {}): string {
    const defaultOptions = {
      expiresIn: this.JWT_EXPIRY,
      issuer: 'larrycorso-admin',
      audience: 'larrycorso-admin',
      algorithm: 'HS256' as const,
      jwtid: this.generateSecureRandom(16),
      ...options
    };

    return jwt.sign(payload, secret, defaultOptions);
  }

  // Verify JWT token
  static verifyJWTToken(token: string, secret: string): any {
    try {
      return jwt.verify(token, secret, {
        issuer: 'larrycorso-admin',
        audience: 'larrycorso-admin',
        algorithms: ['HS256']
      });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Create refresh token
  static createRefreshToken(): string {
    return this.generateSecureRandom(64);
  }

  // Constant-time string comparison to prevent timing attacks
  static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  // Generate session token
  static generateSessionToken(): string {
    return this.generateSecureRandom(48);
  }

  // Hash session token for storage
  static hashSessionToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  // Validate password strength
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
    score: number;
  } {
    const errors: string[] = [];
    let score = 0;

    // Length check
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    } else if (password.length >= 12) {
      score += 2;
    } else {
      score += 1;
    }

    // Character variety checks
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    } else {
      score += 2;
    }

    // Common password patterns
    const commonPatterns = [
      /(.)\1{2,}/,  // Repeated characters
      /123456/,     // Sequential numbers
      /abcdef/,     // Sequential letters
      /password/i,  // Common words
      /admin/i,
      /user/i,
      /guest/i
    ];

    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        errors.push('Password contains common patterns and may be easily guessed');
        score = Math.max(0, score - 2);
        break;
      }
    }

    return {
      isValid: errors.length === 0 && score >= 4,
      errors,
      score: Math.min(10, score)
    };
  }

  // Generate API key
  static generateAPIKey(): string {
    const prefix = 'lc_';
    const key = this.generateSecureRandom(32);
    return `${prefix}${key}`;
  }

  // Validate API key format
  static validateAPIKeyFormat(apiKey: string): boolean {
    return /^lc_[a-f0-9]{64}$/.test(apiKey);
  }
}
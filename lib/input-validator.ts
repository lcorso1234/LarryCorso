import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';

// Initialize DOMPurify with JSDOM for server-side usage
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

export interface ValidationError {
  field: string;
  message: string;
}

export class InputValidator {
  static validateEmail(email: string): ValidationError | null {
    if (!email || !validator.isEmail(email)) {
      return { field: 'email', message: 'Invalid email format' };
    }
    return null;
  }

  static validatePassword(password: string): ValidationError | null {
    if (!password || password.length < 8) {
      return { field: 'password', message: 'Password must be at least 8 characters long' };
    }
    return null;
  }

  static validateString(value: string, fieldName: string, options: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    allowEmpty?: boolean;
  } = {}): ValidationError | null {
    const { minLength = 0, maxLength = 1000, required = true, allowEmpty = false } = options;

    if (required && (!value || value.trim() === '')) {
      return { field: fieldName, message: `${fieldName} is required` };
    }

    if (!allowEmpty && value && value.trim() === '') {
      return { field: fieldName, message: `${fieldName} cannot be empty` };
    }

    if (value && (value.length < minLength || value.length > maxLength)) {
      return { 
        field: fieldName, 
        message: `${fieldName} must be between ${minLength} and ${maxLength} characters` 
      };
    }

    return null;
  }

  static validateUrl(url: string, fieldName: string = 'url'): ValidationError | null {
    if (!url || !validator.isURL(url, { 
      protocols: ['http', 'https'],
      require_protocol: true
    })) {
      return { field: fieldName, message: 'Invalid URL format' };
    }
    return null;
  }

  static validateSlug(slug: string): ValidationError | null {
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return { 
        field: 'slug', 
        message: 'Slug must contain only lowercase letters, numbers, and hyphens' 
      };
    }
    return null;
  }

  static sanitizeHtml(html: string): string {
    return purify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });
  }

  static sanitizeString(str: string): string {
    if (!str) return '';
    return validator.escape(str.trim());
  }

  static validateAndSanitizeObject(obj: any, schema: Record<string, any>): {
    isValid: boolean;
    errors: ValidationError[];
    sanitizedData: Record<string, any>;
  } {
    const errors: ValidationError[] = [];
    const sanitizedData: Record<string, any> = {};

    for (const [key, rules] of Object.entries(schema)) {
      const value = obj[key];

      // Type validation
      if (rules.type === 'string') {
        const stringError = this.validateString(value, key, rules);
        if (stringError) {
          errors.push(stringError);
          continue;
        }
        sanitizedData[key] = rules.sanitize ? this.sanitizeString(value) : value;
      } else if (rules.type === 'email') {
        const emailError = this.validateEmail(value);
        if (emailError) {
          errors.push(emailError);
          continue;
        }
        sanitizedData[key] = value.toLowerCase().trim();
      } else if (rules.type === 'url') {
        const urlError = this.validateUrl(value, key);
        if (urlError) {
          errors.push(urlError);
          continue;
        }
        sanitizedData[key] = value;
      } else if (rules.type === 'html') {
        sanitizedData[key] = this.sanitizeHtml(value || '');
      } else if (rules.type === 'slug') {
        const slugError = this.validateSlug(value);
        if (slugError) {
          errors.push(slugError);
          continue;
        }
        sanitizedData[key] = value.toLowerCase();
      } else {
        sanitizedData[key] = value;
      }

      // Custom validation
      if (rules.validate && typeof rules.validate === 'function') {
        const customError = rules.validate(sanitizedData[key]);
        if (customError) {
          errors.push({ field: key, message: customError });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }
}

// Common validation schemas
export const schemas = {
  blogPost: {
    title: { 
      type: 'string', 
      minLength: 1, 
      maxLength: 200, 
      required: true, 
      sanitize: true 
    },
    content: { 
      type: 'html', 
      required: true 
    },
    excerpt: { 
      type: 'string', 
      maxLength: 500, 
      sanitize: true 
    },
    slug: { 
      type: 'slug', 
      required: true 
    },
    author: { 
      type: 'string', 
      maxLength: 100, 
      sanitize: true 
    }
  },
  page: {
    title: { 
      type: 'string', 
      minLength: 1, 
      maxLength: 200, 
      required: true, 
      sanitize: true 
    },
    content: { 
      type: 'html', 
      required: true 
    },
    slug: { 
      type: 'slug', 
      required: true 
    },
    metaDescription: { 
      type: 'string', 
      maxLength: 160, 
      sanitize: true 
    }
  },
  login: {
    password: { 
      type: 'string', 
      minLength: 8, 
      required: true 
    }
  }
};
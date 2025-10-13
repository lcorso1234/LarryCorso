import { useState, useEffect } from 'react';

// Frontend-Backend API Integration Service
export class APIService {
  private static baseURL = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Generic API request method with error handling
  private static async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  static async getHealth() {
    return this.request('/api/health');
  }

  // Connectivity test
  static async testConnectivity(data?: any) {
    if (data) {
      return this.request('/api/connect', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
    return this.request('/api/connect');
  }

  // Admin authentication
  static async adminLogin(password: string) {
    return this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  }

  // Verify admin session
  static async verifyAdmin(token: string) {
    return this.request('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Get pages data
  static async getPages() {
    return this.request('/api/admin/pages');
  }

  // Update pages data
  static async updatePages(pages: any[], token: string) {
    return this.request('/api/admin/pages', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pages }),
    });
  }

  // Get blog posts
  static async getBlogPosts() {
    return this.request('/api/admin/blog-posts');
  }

  // Update blog posts
  static async updateBlogPosts(posts: any[], token: string) {
    return this.request('/api/admin/blog-posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ posts }),
    });
  }

  // Get security logs
  static async getSecurityLogs(token: string) {
    return this.request('/api/admin/security', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Connection status check
  static async isConnected(): Promise<boolean> {
    try {
      await this.getHealth();
      return true;
    } catch {
      return false;
    }
  }

  // Frontend-specific utilities
  static async shareContent(title: string, text: string, url?: string) {
    const shareData = { title, text, url: url || window.location.href };
    
    try {
      // Log share attempt to backend
      await this.testConnectivity({
        action: 'share_content',
        data: shareData,
        timestamp: new Date().toISOString(),
      });

      // Use native sharing if available
      if (navigator.share) {
        await navigator.share(shareData);
        return { success: true, method: 'native' };
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${title}\n${text}\n${shareData.url}`);
        return { success: true, method: 'clipboard' };
      }
    } catch (error) {
      console.error('Share failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Real-time connection monitoring
  static async startConnectionMonitoring(callback: (connected: boolean) => void) {
    const checkConnection = async () => {
      const connected = await this.isConnected();
      callback(connected);
    };

    // Initial check
    await checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }
}

// React hook for API connection status
export function useAPIConnection() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stopMonitoring: (() => void) | null = null;

    const initMonitoring = async () => {
      try {
        stopMonitoring = await APIService.startConnectionMonitoring((isConnected) => {
          setConnected(isConnected);
          setLoading(false);
          setError(isConnected ? null : 'Backend connection lost');
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection monitoring failed');
        setLoading(false);
      }
    };

    initMonitoring();

    return () => {
      if (stopMonitoring) stopMonitoring();
    };
  }, []);

  return { connected, loading, error };
}

// Export for backwards compatibility
export const FrontendAPI = APIService;
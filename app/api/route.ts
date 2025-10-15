import { NextResponse } from 'next/server';

// Frontend API utility functions
export class FrontendAPI {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  static async getHealthStatus() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async testConnectivity(data?: Record<string, unknown>) {
    try {
      const response = await fetch(`${this.baseURL}/api/connect`, {
        method: data ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: data ? JSON.stringify(data) : undefined
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Connectivity test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async adminLogin(password: string) {
    try {
      const response = await fetch(`${this.baseURL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Admin login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export async function GET() {
  try {
    const apiInfo = {
      name: 'Larry Corso Portfolio API',
      version: '1.0.0',
      description: 'Frontend-Backend connectivity API for portfolio website',
      documentation: {
        health_check: 'GET /api/health - Server health status',
        connectivity_test: 'GET /api/connect - Test frontend-backend connection',
        echo_test: 'POST /api/connect - Echo test for POST requests',
        admin_login: 'POST /api/admin/login - Admin authentication',
        admin_verify: 'GET /api/admin/verify - Verify admin session'
      },
      usage_examples: {
        health_check: 'fetch("/api/health")',
        connectivity_test: 'fetch("/api/connect")',
        post_test: 'fetch("/api/connect", { method: "POST", body: JSON.stringify({test: "data"}) })',
        admin_login: 'fetch("/api/admin/login", { method: "POST", body: JSON.stringify({password: "your_password"}) })'
      },
      frontend_utilities: 'Use FrontendAPI class for easy integration',
      cors_enabled: true,
      security_features: [
        'Rate limiting',
        'Input validation',
        'CSRF protection',
        'Security headers',
        'Request logging'
      ]
    };

    const response = NextResponse.json(apiInfo, { status: 200 });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minute cache
    
    return response;
    
  } catch (error) {
    console.error('API info error:', error);
    
    return NextResponse.json({
      error: 'Failed to retrieve API information',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  
  return response;
}

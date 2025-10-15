import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();
    
    // Basic health check data
    const healthData = {
      status: 'connected',
      message: 'Backend API is running successfully',
      timestamp,
      uptime: `${Math.floor(uptime)} seconds`,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      endpoints: {
        health: '/api/health',
        admin_login: '/api/admin/login',
        admin_verify: '/api/admin/verify',
        admin_pages: '/api/admin/pages',
        admin_security: '/api/admin/security'
      },
      server_info: {
        port: process.env.PORT || '3000',
        host: 'localhost',
        protocol: 'http'
      }
    };

    // Add CORS headers for frontend connectivity
    const response = NextResponse.json(healthData, { status: 200 });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
    
  } catch (error) {
    console.error('Health check error:', error);
    
    const errorResponse = NextResponse.json({
      status: 'error',
      message: 'Backend API encountered an error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
    
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function OPTIONS(request: NextRequest) {
  // Handle CORS preflight requests
  const response = new NextResponse(null, { status: 200 });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}
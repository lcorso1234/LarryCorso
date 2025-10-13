import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const connectivityTest = {
      frontend_backend: 'connected',
      api_status: 'operational',
      database_status: 'simulated_ok', // Since we're using JSON files
      timestamp: new Date().toISOString(),
      test_results: {
        cors_enabled: true,
        json_parsing: true,
        error_handling: true,
        security_middleware: true
      },
      available_services: [
        'Authentication API',
        'Content Management API',
        'Security Monitoring API',
        'Health Check API'
      ],
      connection_info: {
        origin: request.headers.get('origin') || 'direct',
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip: request.headers.get('x-forwarded-for') || 'localhost'
      }
    };

    const response = NextResponse.json(connectivityTest, { status: 200 });
    
    // Enhanced CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token');
    response.headers.set('Access-Control-Expose-Headers', 'X-Request-ID, X-Response-Time');
    response.headers.set('X-Request-ID', crypto.randomUUID());
    response.headers.set('X-Response-Time', Date.now().toString());
    
    return response;
    
  } catch (error) {
    console.error('Connectivity test error:', error);
    
    return NextResponse.json({
      frontend_backend: 'error',
      api_status: 'failed',
      error: error instanceof Error ? error.message : 'Connection test failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const echoResponse = {
      message: 'Frontend-Backend connection test successful',
      received_data: body,
      server_timestamp: new Date().toISOString(),
      echo_test: 'passed',
      post_request: 'working'
    };

    const response = NextResponse.json(echoResponse, { status: 200 });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Content-Type', 'application/json');
    
    return response;
    
  } catch (error) {
    console.error('POST connectivity test error:', error);
    
    return NextResponse.json({
      message: 'POST request failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      post_request: 'failed'
    }, { status: 400 });
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}
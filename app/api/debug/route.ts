import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;
    
    return NextResponse.json({
      hasAdminPassword: !!adminPassword,
      hasJwtSecret: !!jwtSecret,
      adminPasswordLength: adminPassword?.length || 0,
      jwtSecretLength: jwtSecret?.length || 0,
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Debug error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/api-middleware';
import { securityLogger } from '@/lib/security-logger';

async function handler(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const severity = url.searchParams.get('severity') as 'low' | 'medium' | 'high' | 'critical' | null;
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 1000);

    let events;
    
    if (severity) {
      events = securityLogger.getEventsBySeverity(severity, limit);
    } else if (type) {
      events = securityLogger.getEvents(type, limit);
    } else {
      events = securityLogger.getEvents(undefined, limit);
    }

    const suspiciousActivity = securityLogger.getSuspiciousActivity();

    return NextResponse.json({
      events,
      suspiciousActivity,
      summary: {
        totalEvents: events.length,
        criticalEvents: events.filter(e => e.severity === 'critical').length,
        highSeverityEvents: events.filter(e => e.severity === 'high').length,
        recentEvents: events.filter(e => 
          Date.now() - e.timestamp.getTime() < 60 * 60 * 1000 // Last hour
        ).length
      }
    });
  } catch (error) {
    console.error('Security dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch security data' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
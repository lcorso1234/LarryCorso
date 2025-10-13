interface SecurityEvent {
  timestamp: Date;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  clientId: string;
  ip: string;
  userAgent: string;
  details: Record<string, any>;
  endpoint?: string;
  method?: string;
}

class SecurityLogger {
  private events: SecurityEvent[] = [];
  private maxEvents = 10000; // Keep last 10k events in memory
  
  // Log security event
  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date()
    };
    
    this.events.unshift(securityEvent);
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(0, this.maxEvents);
    }
    
    // Log to console based on severity
    this.logToConsole(securityEvent);
    
    // In production, you might want to send to external logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(securityEvent);
    }
  }
  
  private logToConsole(event: SecurityEvent): void {
    const logMessage = `[SECURITY] ${event.type} - ${event.severity.toUpperCase()} - ${event.clientId} - ${JSON.stringify(event.details)}`;
    
    switch (event.severity) {
      case 'critical':
        console.error(logMessage);
        break;
      case 'high':
        console.warn(logMessage);
        break;
      case 'medium':
        console.log(logMessage);
        break;
      case 'low':
        console.debug(logMessage);
        break;
    }
  }
  
  private sendToExternalService(event: SecurityEvent): void {
    // Implement external logging service integration here
    // Examples: Datadog, Splunk, ELK Stack, etc.
    
    // For now, we'll just log to a file or external endpoint
    // This is where you'd implement webhook or API calls to your monitoring service
  }
  
  // Get recent events by type
  getEvents(type?: string, limit = 100): SecurityEvent[] {
    let filteredEvents = this.events;
    
    if (type) {
      filteredEvents = this.events.filter(event => event.type === type);
    }
    
    return filteredEvents.slice(0, limit);
  }
  
  // Get events by severity
  getEventsBySeverity(severity: SecurityEvent['severity'], limit = 100): SecurityEvent[] {
    return this.events
      .filter(event => event.severity === severity)
      .slice(0, limit);
  }
  
  // Get suspicious activity summary
  getSuspiciousActivity(timeWindowMs = 24 * 60 * 60 * 1000): {
    clientId: string;
    eventCount: number;
    highSeverityCount: number;
    criticalSeverityCount: number;
    lastActivity: Date;
  }[] {
    const cutoff = new Date(Date.now() - timeWindowMs);
    const recentEvents = this.events.filter(event => event.timestamp > cutoff);
    
    const clientActivity = new Map<string, {
      eventCount: number;
      highSeverityCount: number;
      criticalSeverityCount: number;
      lastActivity: Date;
    }>();
    
    recentEvents.forEach(event => {
      const existing = clientActivity.get(event.clientId) || {
        eventCount: 0,
        highSeverityCount: 0,
        criticalSeverityCount: 0,
        lastActivity: event.timestamp
      };
      
      existing.eventCount++;
      if (event.severity === 'high') existing.highSeverityCount++;
      if (event.severity === 'critical') existing.criticalSeverityCount++;
      if (event.timestamp > existing.lastActivity) {
        existing.lastActivity = event.timestamp;
      }
      
      clientActivity.set(event.clientId, existing);
    });
    
    return Array.from(clientActivity.entries())
      .map(([clientId, stats]) => ({ clientId, ...stats }))
      .sort((a, b) => b.criticalSeverityCount - a.criticalSeverityCount || b.highSeverityCount - a.highSeverityCount);
  }
}

// Singleton instance
export const securityLogger = new SecurityLogger();

// Helper functions for common security events
export const SecurityEvents = {
  // Authentication events
  loginAttempt: (clientId: string, ip: string, userAgent: string, success: boolean) => {
    securityLogger.log({
      type: 'login_attempt',
      severity: success ? 'low' : 'medium',
      clientId,
      ip,
      userAgent,
      details: { success }
    });
  },
  
  loginFailure: (clientId: string, ip: string, userAgent: string, reason: string) => {
    securityLogger.log({
      type: 'login_failure',
      severity: 'high',
      clientId,
      ip,
      userAgent,
      details: { reason }
    });
  },
  
  rateLimitExceeded: (clientId: string, ip: string, userAgent: string, endpoint: string, method: string) => {
    securityLogger.log({
      type: 'rate_limit_exceeded',
      severity: 'medium',
      clientId,
      ip,
      userAgent,
      endpoint,
      method,
      details: { message: 'Rate limit exceeded' }
    });
  },
  
  invalidInput: (clientId: string, ip: string, userAgent: string, endpoint: string, errors: any[]) => {
    securityLogger.log({
      type: 'invalid_input',
      severity: 'low',
      clientId,
      ip,
      userAgent,
      endpoint,
      details: { errors }
    });
  },
  
  unauthorizedAccess: (clientId: string, ip: string, userAgent: string, endpoint: string, method: string) => {
    securityLogger.log({
      type: 'unauthorized_access',
      severity: 'high',
      clientId,
      ip,
      userAgent,
      endpoint,
      method,
      details: { message: 'Unauthorized access attempt' }
    });
  },
  
  suspiciousActivity: (clientId: string, ip: string, userAgent: string, details: Record<string, any>) => {
    securityLogger.log({
      type: 'suspicious_activity',
      severity: 'critical',
      clientId,
      ip,
      userAgent,
      details
    });
  },
  
  sqlInjectionAttempt: (clientId: string, ip: string, userAgent: string, endpoint: string, payload: string) => {
    securityLogger.log({
      type: 'sql_injection_attempt',
      severity: 'critical',
      clientId,
      ip,
      userAgent,
      endpoint,
      details: { payload: payload.substring(0, 100) } // Truncate for logging
    });
  },
  
  xssAttempt: (clientId: string, ip: string, userAgent: string, endpoint: string, payload: string) => {
    securityLogger.log({
      type: 'xss_attempt',
      severity: 'critical',
      clientId,
      ip,
      userAgent,
      endpoint,
      details: { payload: payload.substring(0, 100) } // Truncate for logging
    });
  }
};
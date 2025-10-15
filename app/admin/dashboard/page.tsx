'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { APIService } from '@/lib/api-service';

interface PageSummary {
  title?: string;
  name?: string;
  [key: string]: unknown;
}

interface SecurityLogEntry {
  event?: string;
  action?: string;
  message?: string;
  [key: string]: unknown;
}

interface AdminData {
  pages?: Record<string, PageSummary>;
  securityLogs?: SecurityLogEntry[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({});
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Check API connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await APIService.getHealth();
        setConnectionStatus('connected');
      } catch {
        setConnectionStatus('disconnected');
      }
    };
    
    checkConnection();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const response = await APIService.adminLogin(password);
      
      if (response.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', response.token);
        await loadAdminData(response.token);
      } else {
        setAuthError(response.message || 'Login failed');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async (token: string) => {
    try {
        const [pagesResponse, securityLogsResponse] = await Promise.all([
          APIService.getPages().catch(() => null),
          APIService.getSecurityLogs(token).catch(() => null),
        ]);

        const extractPages = (input: unknown): Record<string, PageSummary> => {
          const source =
            input && typeof input === 'object' && !Array.isArray(input) && 'pages' in input
              ? (input as { pages?: unknown }).pages
              : input;
          if (!source || typeof source !== 'object') {
            return {};
          }
          if (Array.isArray(source)) {
            return source.reduce<Record<string, PageSummary>>((acc, value, index) => {
              if (value && typeof value === 'object') {
                acc[String(index)] = value as PageSummary;
              }
              return acc;
            }, {});
          }
          return Object.entries(source as Record<string, unknown>).reduce<Record<string, PageSummary>>(
            (acc, [key, value]) => {
              if (value && typeof value === 'object') {
                acc[key] = value as PageSummary;
              }
              return acc;
            },
            {}
          );
        };

        const extractLogs = (input: unknown): SecurityLogEntry[] => {
          const source =
            input && typeof input === 'object' && !Array.isArray(input) && 'logs' in input
              ? (input as { logs?: unknown }).logs
              : input;
          if (!Array.isArray(source)) {
            return [];
          }
          return source.filter((log): log is SecurityLogEntry => !!log && typeof log === 'object');
        };

        const pagesData = extractPages(pagesResponse);
        const securityLogData = extractLogs(securityLogsResponse);

        console.log('Loaded admin data:', { pages: pagesData, securityLogs: securityLogData });
        setAdminData({
          pages: pagesData,
          securityLogs: securityLogData,
        });
    } catch (error) {
      console.error('Failed to load admin data:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminData({});
    localStorage.removeItem('adminToken');
    setPassword('');
  };

  if (connectionStatus === 'checking') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-xl">Checking API connection...</div>
      </div>
    );
  }

  if (connectionStatus === 'disconnected') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-gray-900 border border-red-500 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">API Connection Failed</h2>
          <p className="text-gray-300 text-center mb-4">
            Unable to connect to the backend API. Please ensure the server is running.
          </p>
          <div className="text-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-mono text-white"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-gray-900 border border-green-500 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-400 mb-2">🔐 Admin Dashboard</h1>
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-green-400 font-mono text-sm">API CONNECTED</span>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 font-mono mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black border border-gray-600 rounded text-green-400 font-mono focus:border-green-400 focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-400 bg-red-900/20 p-2 rounded font-mono text-sm">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-3 rounded font-mono text-white transition-colors"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300 underline font-mono">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-4 bg-gray-900 border border-green-500 rounded-lg">
          <h1 className="text-3xl font-bold text-green-400">🚀 Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-green-400 font-mono text-sm">API CONNECTED</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-mono text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pages Data */}
          <div className="p-4 bg-gray-900 border border-blue-500 rounded-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">📄 Pages Data</h2>
            {adminData.pages && typeof adminData.pages === 'object' ? (
              <div className="space-y-2">
                <p className="text-gray-300">Total Pages: {Object.keys(adminData.pages).length}</p>
                <div className="max-h-32 overflow-y-auto text-sm text-gray-400">
                  {Object.values(adminData.pages).map((page, index) => (
                    <div key={index} className="border-b border-gray-700 pb-1">
                      {page.title || page.name || `Page ${index + 1}`}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No pages data available</p>
            )}
          </div>

          {/* Blog Posts */}

          {/* Security Logs */}
          <div className="p-4 bg-gray-900 border border-red-500 rounded-lg">
            <h2 className="text-xl font-bold text-red-400 mb-4">🛡️ Security Logs</h2>
            {adminData.securityLogs && Array.isArray(adminData.securityLogs) ? (
              <div className="space-y-2">
                <p className="text-gray-300">Recent Events: {adminData.securityLogs.length}</p>
                <div className="max-h-32 overflow-y-auto text-sm text-gray-400">
                  {adminData.securityLogs.map((log, index) => (
                    <div key={index} className="border-b border-gray-700 pb-1">
                      {log.event || log.action || `Event ${index + 1}`}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No security logs available</p>
            )}
          </div>
        </div>

        {/* API Test Section */}
        <div className="mt-8 p-4 bg-gray-900 border border-yellow-500 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">🔧 API Test Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/api-test"
              className="p-3 bg-black border border-green-500 rounded text-center text-green-400 hover:bg-green-500 hover:text-black transition-colors"
            >
              Full API Tester
            </Link>
            <Link
              href="/api/health"
              target="_blank"
              className="p-3 bg-black border border-blue-500 rounded text-center text-blue-400 hover:bg-blue-500 hover:text-black transition-colors"
            >
              Health Check
            </Link>
            <Link
              href="/api/connect"
              target="_blank"
              className="p-3 bg-black border border-purple-500 rounded text-center text-purple-400 hover:bg-purple-500 hover:text-black transition-colors"
            >
              Connectivity Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

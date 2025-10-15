'use client';

import { useState, useEffect } from 'react';

interface ServerMeta {
  status?: string;
  environment?: string;
  uptime?: string;
  server_info?: {
    port?: number;
    host?: string;
  };
  endpoints?: Record<string, string>;
  [key: string]: unknown;
}

interface HealthResponse extends ServerMeta {
  message?: string;
}

interface ConnectivityResponse {
  message?: string;
  frontend_backend?: string;
  api_status?: string;
  [key: string]: unknown;
}

interface PostTestResponse {
  message?: string;
  echo_test?: string;
  post_request?: string;
  [key: string]: unknown;
}

interface TestResults {
  health?: {
    status?: string;
    message?: string;
  };
  connectivity?: {
    frontend_backend?: string;
    api_status?: string;
    message?: string;
  };
  postTest?: {
    echo_test?: string;
    post_request?: string;
    message?: string;
  };
}

interface ConnectionStatus {
  connected: boolean;
  loading: boolean;
  error: string | null;
  lastCheck: string | null;
  serverInfo: ServerMeta | null;
}

export default function APIConnectionTester() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    loading: false,
    error: null,
    lastCheck: null,
    serverInfo: null
  });

  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const testConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Test health endpoint
      const healthResponse = await fetch('/api/health');
      const healthData = (await healthResponse.json()) as HealthResponse;
      
      if (!healthResponse.ok) {
        throw new Error(healthData.message || 'Health check failed');
      }

      // Test connectivity endpoint
      const connectResponse = await fetch('/api/connect');
      const connectData = (await connectResponse.json()) as ConnectivityResponse;
      
      if (!connectResponse.ok) {
        throw new Error(connectData.message || 'Connectivity test failed');
      }

      // Test POST request
      const postResponse = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'frontend-backend-connection', timestamp: new Date().toISOString() })
      });
      const postData = (await postResponse.json()) as PostTestResponse;

      setStatus({
        connected: true,
        loading: false,
        error: null,
        lastCheck: new Date().toISOString(),
        serverInfo: healthData
      });

      setTestResults({
        health: {
          status: healthData.status,
          message: healthData.message
        },
        connectivity: {
          frontend_backend: connectData.frontend_backend,
          api_status: connectData.api_status,
          message: connectData.message
        },
        postTest: {
          echo_test: postData.echo_test,
          post_request: postData.post_request,
          message: postData.message
        }
      });

    } catch (error) {
      setStatus({
        connected: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Connection failed',
        lastCheck: new Date().toISOString(),
        serverInfo: null
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-green-400 font-mono rounded-lg border border-green-500">
      <h2 className="text-2xl font-bold mb-6 text-center">🔗 Frontend-Backend API Connection Tester</h2>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 border border-gray-700 rounded">
        <h3 className="text-lg font-semibold mb-3">Connection Status</h3>
        <div className="flex items-center gap-4 mb-2">
          <span className={`w-3 h-3 rounded-full ${status.connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-semibold">
            {status.loading ? 'Testing...' : status.connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {status.error && (
          <div className="text-red-400 bg-red-900/20 p-2 rounded mt-2">
            Error: {status.error}
          </div>
        )}
        {status.lastCheck && (
          <div className="text-gray-400 text-sm mt-2">
            Last checked: {new Date(status.lastCheck).toLocaleString()}
          </div>
        )}
      </div>

      {/* Test Button */}
      <div className="mb-6 text-center">
        <button
          onClick={testConnection}
          disabled={status.loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded font-semibold transition-colors"
        >
          {status.loading ? 'Testing Connection...' : 'Test Connection'}
        </button>
      </div>

      {/* Server Information */}
      {status.serverInfo && (
        <div className="mb-6 p-4 border border-gray-700 rounded">
          <h3 className="text-lg font-semibold mb-3">Server Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Status:</span> {status.serverInfo.status}
            </div>
            <div>
              <span className="text-gray-400">Environment:</span> {status.serverInfo.environment}
            </div>
            <div>
              <span className="text-gray-400">Uptime:</span> {status.serverInfo.uptime}
            </div>
            <div>
              <span className="text-gray-400">Port:</span> {status.serverInfo.server_info?.port}
            </div>
          </div>
        </div>
      )}

      {/* Available Endpoints */}
      {status.serverInfo?.endpoints && (
        <div className="mb-6 p-4 border border-gray-700 rounded">
          <h3 className="text-lg font-semibold mb-3">Available API Endpoints</h3>
          <div className="grid gap-2 text-sm">
            {Object.entries(status.serverInfo.endpoints).map(([name, path]) => (
              <div key={name} className="flex justify-between">
                <span className="text-gray-400">{name}:</span>
                <span className="text-blue-400">{path as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults && (
        <div className="p-4 border border-gray-700 rounded">
          <h3 className="text-lg font-semibold mb-3">Test Results</h3>
          <div className="space-y-4">
            
            {/* Health Check */}
            <div>
              <h4 className="text-green-300 font-semibold">✅ Health Check</h4>
              <div className="text-sm text-gray-300 ml-4">
                Status: {testResults.health?.status} | 
                Message: {testResults.health?.message}
              </div>
            </div>

            {/* Connectivity Test */}
            <div>
              <h4 className="text-green-300 font-semibold">✅ Connectivity Test</h4>
              <div className="text-sm text-gray-300 ml-4">
                Frontend-Backend: {testResults.connectivity?.frontend_backend} | 
                API Status: {testResults.connectivity?.api_status}
              </div>
            </div>

            {/* POST Test */}
            <div>
              <h4 className="text-green-300 font-semibold">✅ POST Request Test</h4>
              <div className="text-sm text-gray-300 ml-4">
                Echo Test: {testResults.postTest?.echo_test} | 
                POST Request: {testResults.postTest?.post_request}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Examples */}
      <div className="mt-6 p-4 border border-gray-700 rounded">
        <h3 className="text-lg font-semibold mb-3">Usage Examples</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-400">Health Check:</span>
            <code className="ml-2 bg-gray-800 px-2 py-1 rounded">fetch(&apos;/api/health&apos;)</code>
          </div>
          <div>
            <span className="text-gray-400">Connectivity Test:</span>
            <code className="ml-2 bg-gray-800 px-2 py-1 rounded">fetch(&apos;/api/connect&apos;)</code>
          </div>
          <div>
            <span className="text-gray-400">Admin Login:</span>
            <code className="ml-2 bg-gray-800 px-2 py-1 rounded">fetch(&apos;/api/admin/login&apos;, {'{'}method: &apos;POST&apos;, body: JSON.stringify({'{'}password: &apos;pwd&apos;{'}'}){'}'}) </code>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface ConnectionStatus {
  connected: boolean;
  loading: boolean;
  error: string | null;
  lastCheck: string | null;
  serverInfo?: any;
}

export default function APIConnectionTester() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-yellow-300 font-mono rounded-lg border border-yellow-500">
      <h2 className="text-2xl font-bold mb-4 text-center">🔗 API & Backend Removed</h2>
      <p className="text-sm text-gray-300 mb-4">
        The backend API has been removed from this repository. All server endpoints and admin APIs were archived into the backups folder.
      </p>
      <div className="p-4 bg-gray-800 rounded border border-gray-700">
        <p className="text-sm text-gray-300">If you need to re-enable the backend, restore the backups in <code className="bg-black px-1">backups/backup-2025-10-14_0001/</code> and re-create any required environment variables.</p>
      </div>
    </div>
  );
}
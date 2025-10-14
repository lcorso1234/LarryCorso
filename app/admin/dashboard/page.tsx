 'use client';

import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto p-6 bg-gray-900 border border-yellow-500 rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Admin Features Disabled</h2>
        <p className="text-gray-300 text-center mb-4">
          The backend and API endpoints have been removed from this deployment. All server-backed admin features are disabled.
        </p>
        <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-2">
          <li>To restore admin functionality, restore the server-side files from backups located in <code className="text-xs">/backups/backup-2025-10-14_0001/</code>.</li>
          <li>Admin pages that previously required the API will now show this message.</li>
        </ul>
        <div className="text-center">
          <a href="/" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-mono text-white">Return to Website</a>
        </div>
      </div>
    </div>
  );
}
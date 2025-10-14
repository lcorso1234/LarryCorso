'use client';

import React from 'react';

export default function AdminPages() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto p-6 bg-gray-900 border border-yellow-500 rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Admin Pages Disabled</h2>
        <p className="text-gray-300 text-center mb-4">Admin page management is disabled because the backend has been removed.</p>
        <div className="text-center">
          <a href="/admin" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-mono text-white">Back to Admin</a>
        </div>
      </div>
    </div>
  );
}
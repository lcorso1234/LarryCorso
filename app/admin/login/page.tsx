'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    'use client';

    import React from 'react';

    export default function AdminLogin() {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md mx-auto p-6 bg-gray-900 border border-yellow-500 rounded-lg">
            <h1 className="text-2xl font-bold text-yellow-400 mb-4">Admin Login — Disabled</h1>
            <p className="text-gray-300 mb-4">The backend has been removed from this deployment. Admin login is disabled.</p>
            <div className="text-center">
              <a href="/admin" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-mono text-white">Back to Admin</a>
            </div>
          </div>
        </div>
      );
    }
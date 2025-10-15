import Link from "next/link";
import APIConnectionTester from '@/components/APIConnectionTester';

export default function APITestPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🚀 API Connection Test Center
          </h1>
          <p className="text-gray-400 text-lg">
            Test and verify frontend-backend API connectivity
          </p>
        </div>
        
        <APIConnectionTester />
        
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

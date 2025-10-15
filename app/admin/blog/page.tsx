"use client";

import Link from 'next/link';

export default function AdminBlog() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Blog (removed)</h1>
      <p className="text-gray-400 mt-2">The blog admin UI has been removed. Use the Pages section to manage site content.</p>
      <div className="mt-6">
        <Link href="/admin/pages" className="text-blue-500">Go to Pages</Link>
      </div>
    </div>
  );
}
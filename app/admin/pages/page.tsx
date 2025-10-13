'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data.pages || []);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/pages?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPages(pages.filter(p => p.id !== id));
      } else {
        alert('Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Failed to delete page');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading pages...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pages</h1>
          <p className="text-gray-400">
            Manage all your website pages. Create, edit, and publish content.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium"
        >
          Create New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-4">No pages yet</h3>
          <p className="text-gray-400 mb-6">
            Get started by creating your first page.
          </p>
          <Link
            href="/admin/pages/new"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium"
          >
            Create Page
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">
                    Slug
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">
                    Last Updated
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{page.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">/{page.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          page.published
                            ? 'bg-green-900 text-green-200'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {page.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 text-sm">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/pages/edit/${page.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </Link>
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          disabled={deleting === page.id}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm"
                        >
                          {deleting === page.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
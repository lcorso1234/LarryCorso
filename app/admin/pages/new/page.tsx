'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          published,
        }),
      });

      if (response.ok) {
        router.push('/admin/pages');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create page');
      }
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/pages"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Pages
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Page</h1>
            <p className="text-gray-400">Add a new page to your website</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter page title"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This will be used as the page title and to generate the URL slug
                  </p>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your page content here... (HTML supported)"
                    rows={20}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    You can use HTML tags for formatting. The content will be rendered as-is on the frontend.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Publishing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={published}
                          onChange={(e) => setPublished(e.target.checked)}
                          className="rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-900"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Publish immediately
                        </span>
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        Uncheck to save as draft
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black px-4 py-2 rounded-md font-medium"
                    >
                      {saving ? 'Creating...' : 'Create Page'}
                    </button>
                    <Link
                      href="/admin/pages"
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium text-center"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
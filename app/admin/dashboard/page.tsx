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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [pages, setPages] = useState<Page[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pagesResponse, blogResponse] = await Promise.all([
        fetch('/api/admin/pages'),
        fetch('/api/admin/blog-posts')
      ]);

      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json();
        setPages(pagesData.pages || []);
      }

      if (blogResponse.ok) {
        const blogData = await blogResponse.json();
        setBlogPosts(blogData.posts || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Content Management</h1>
        <p className="text-gray-400">
          Manage your website pages and blog posts from this dashboard.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">Total Pages</h3>
          <p className="text-3xl font-bold text-yellow-400">{pages.length}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">Blog Posts</h3>
          <p className="text-3xl font-bold text-yellow-400">{blogPosts.length}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">Published</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {pages.filter(p => p.published).length + blogPosts.filter(p => p.published).length}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href="/admin/pages/new"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-medium"
        >
          Create New Page
        </Link>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
        >
          Create Blog Post
        </Link>
      </div>

      {/* Pages Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Pages</h2>
          <Link
            href="/admin/pages"
            className="text-yellow-400 hover:text-yellow-500"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.slice(0, 6).map((page) => (
            <div
              key={page.id}
              className="bg-gray-900 p-6 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{page.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    page.published
                      ? 'bg-green-900 text-green-200'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {page.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </p>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Blog Posts</h2>
          <Link
            href="/admin/blog"
            className="text-yellow-400 hover:text-yellow-500"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 6).map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 p-6 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{post.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-900 text-green-200'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                {post.youtubeUrl && (
                  <span className="bg-red-900 text-red-200 px-2 py-1 rounded text-xs">
                    Video
                  </span>
                )}
                {post.spotifyUrl && (
                  <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs">
                    Podcast
                  </span>
                )}
                {post.images.length > 0 && (
                  <span className="bg-purple-900 text-purple-200 px-2 py-1 rounded text-xs">
                    {post.images.length} Image{post.images.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Last updated: {new Date(post.updatedAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
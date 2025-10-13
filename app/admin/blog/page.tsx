'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
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
      const response = await fetch(`/api/admin/blog-posts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-gray-400">
            Create and manage blog posts with videos, podcasts, and art galleries.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
        >
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-4">No blog posts yet</h3>
          <p className="text-gray-400 mb-6">
            Get started by creating your first blog post.
          </p>
          <Link
            href="/admin/blog/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Create Post
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
                    Content Type
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
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{post.title}</div>
                      <div className="text-gray-400 text-sm">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
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
                        {post.content && (
                          <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">
                            Text
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          post.published
                            ? 'bg-green-900 text-green-200'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 text-sm">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm"
                        >
                          {deleting === post.id ? 'Deleting...' : 'Delete'}
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
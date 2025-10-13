'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractSpotifyEpisodeId = (url: string): string | null => {
    const regex = /spotify\.com\/episode\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          return data.url;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name}: ${error}`);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null) as string[];
      setImages([...images, ...validUrls]);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          youtubeUrl: youtubeUrl.trim() || undefined,
          spotifyUrl: spotifyUrl.trim() || undefined,
          images,
          published,
        }),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create blog post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/blog"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Blog
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Blog Post</h1>
            <p className="text-gray-400">Add a new blog post with multimedia content</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog post title"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                    Text Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content here... (HTML supported)"
                    rows={12}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    You can use HTML tags for rich formatting.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      id="youtubeUrl"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {youtubeUrl && extractYouTubeVideoId(youtubeUrl) && (
                      <div className="mt-2 p-2 bg-gray-800 rounded">
                        <p className="text-xs text-green-400 mb-2">Preview:</p>
                        <div className="aspect-video bg-black rounded">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(youtubeUrl)}`}
                            title="YouTube preview"
                            frameBorder="0"
                            allowFullScreen
                            className="rounded"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="spotifyUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Spotify Podcast URL
                    </label>
                    <input
                      type="url"
                      id="spotifyUrl"
                      value={spotifyUrl}
                      onChange={(e) => setSpotifyUrl(e.target.value)}
                      placeholder="https://open.spotify.com/episode/..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {spotifyUrl && extractSpotifyEpisodeId(spotifyUrl) && (
                      <div className="mt-2 p-2 bg-gray-800 rounded">
                        <p className="text-xs text-green-400 mb-2">Preview:</p>
                        <iframe
                          src={`https://open.spotify.com/embed/episode/${extractSpotifyEpisodeId(spotifyUrl)}?utm_source=generator`}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Art Gallery (Images)
                  </label>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {uploading && (
                        <p className="text-xs text-blue-400 mt-1">Uploading images...</p>
                      )}
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded border border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                          className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
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

                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-white mb-2">Content Summary</h4>
                  <div className="space-y-2 text-xs text-gray-400">
                    <div>Text: {content.length > 0 ? '✓' : '○'}</div>
                    <div>Video: {youtubeUrl ? '✓' : '○'}</div>
                    <div>Podcast: {spotifyUrl ? '✓' : '○'}</div>
                    <div>Images: {images.length} uploaded</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md font-medium"
                    >
                      {saving ? 'Creating...' : 'Create Post'}
                    </button>
                    <Link
                      href="/admin/blog"
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
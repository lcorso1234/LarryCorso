import { getBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts
    .filter(post => post.published)
    .map(post => ({
      slug: post.slug,
    }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug && p.published);

  if (!post) {
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-gray-300 bg-clip-text text-transparent">
          {post.title}
        </h1>
        
        <div className="space-y-12">
          {/* Text Content */}
          {post.content && (
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* YouTube Video */}
          {post.youtubeUrl && extractYouTubeVideoId(post.youtubeUrl) && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400">Video</h2>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(post.youtubeUrl)}`}
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
          )}

          {/* Spotify Podcast */}
          {post.spotifyUrl && extractSpotifyEpisodeId(post.spotifyUrl) && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400">Podcast</h2>
              <div className="bg-gray-900 rounded-lg p-4">
                <iframe
                  src={`https://open.spotify.com/embed/episode/${extractSpotifyEpisodeId(post.spotifyUrl)}?utm_source=generator`}
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded"
                ></iframe>
              </div>
            </div>
          )}

          {/* Art Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-400">Art Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.images.map((imageUrl, index) => (
                  <div key={index} className="group cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={`Art ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg border border-gray-700 group-hover:border-purple-500 transition-colors"
                      onClick={() => window.open(imageUrl, '_blank')}
                    />
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Click on any image to view it in full size
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Published: {new Date(post.createdAt).toLocaleDateString()}
            {post.updatedAt !== post.createdAt && (
              <> • Updated: {new Date(post.updatedAt).toLocaleDateString()}</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
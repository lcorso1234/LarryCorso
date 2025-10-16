'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ScrollAnimation from '@/components/ScrollAnimation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'podcast' | 'video' | 'art';
  date: string;
  duration?: string;
  thumbnail?: string;
  tags: string[];
  artDescription?: string; // Added for art pieces
  spotifyUrl?: string; // Added for Spotify podcast links
  imageUrl?: string; // Added for art images
  videoUrl?: string; // Added for embedded videos
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 'spotify-episode-1',
    title: 'Recreate the American Dream',
    excerpt: 'We can do this the easy way or the fun way.',
    category: 'podcast',
    date: '2024-10-15',
    duration: 'Listen on Spotify',
    tags: ['American Dream', 'Revolution', 'Change', 'Featured'],
    spotifyUrl: 'https://open.spotify.com/episode/7xmltZAOVTZatg5ButnbPE?si=V_w91XyrSW-7mBMDDJmMEw'
  },
  {
    id: 'little-man-knows-best',
    title: 'How It All Began',
    excerpt: 'When the smallest voice in the room carries the biggest truth...',
    category: 'art',
    date: '2024-10-15',
    tags: ['Wisdom', 'Digital Art', 'Truth', 'Revolution'],
    imageUrl: '/little-man-knows-best.jpg',
    artDescription: 'Sometimes the person who knows best is the one nobody listens to. Here stands our psychedelic prophet, small but mighty, surrounded by all the "important" people with their serious faces and formal poses. While they debate politics and power in their fancy clothes and elaborate ruffs, our little friend sees right through it all with those glowing, all-knowing eyes. This piece is about the wisdom that comes from being underestimated, overlooked, dismissed. The big men with their weapons and authority think they control the room, but the real power belongs to the one who refuses to play their game. Those wild colors radiating from his being represent the electric truth that conventional wisdom fears - the knowledge that comes from existing outside the system, from seeing the world with fresh eyes unclouded by tradition and expectation. The little man knows best because he hasn\'t been trained to forget what actually matters. While everyone else performs importance, he embodies authenticity. His very presence asks the question: What if the answers we seek aren\'t in the history books or the boardrooms, but in the minds of those brave enough to remain beautifully, brilliantly different?'
  },
  {
    id: 'party-amidst-peaceful',
    title: 'Run Run Run',
    excerpt: 'When digital joy crashes the most solemn historical gathering in American mythology...',
    category: 'art',
    date: '2024-10-15',
    tags: ['Historical', 'Digital Art', 'Liberation', 'Joy'],
    imageUrl: '/party-amidst-peaceful.jpg',
    artDescription: 'Here stands the liberator - not in the form you expected, but in the purest form of all: unbridled joy. This tiny pink rebel has crashed the first Thanksgiving, that carefully constructed American myth of peace and gratitude, and brought something the history books forgot to mention - actual celebration. While everyone else performs their roles in this sanitized version of history, our little friend just... parties. Because sometimes the most revolutionary act is refusing to be serious about things that were never as serious as we pretend they were. This piece asks the uncomfortable questions: What if the real liberators aren\'t the ones who write the history books? What if freedom looks like a cartoon character who doesn\'t give a damn about your solemn traditions? What if the most authentic moment in this entire scene is the one thing that doesn\'t belong? The Pilgrims and Native Americans in their formal poses represent all the ways we\'ve been taught to remember history - static, sanitized, safe. But life is messy and joyful and ridiculous, and sometimes it takes a pink digital anarchist to remind us that the best parties happen when you stop asking permission to exist.'
  },
  {
    id: 'hiding-amidst-boring',
    title: 'Z',
    excerpt: 'When digital rebellion infiltrates the most sophisticated classical art salon...',
    category: 'art',
    date: '2024-10-15',
    tags: ['Digital Art', 'Classical', 'Rebellion', 'Hidden'],
    imageUrl: '/hiding-amidst-boring.jpg',
    artDescription: 'Sometimes the most radical act is simply existing where you don\'t belong. In this piece, a tiny digital rebel has snuck into the most proper, most sophisticated art salon of the 18th century. While everyone else discusses serious matters in their powdered wigs and formal attire, our little friend just... exists. Unapologetically modern. Unapologetically colorful. Unapologetically alive in a room full of people playing by rules that were never meant for them. This is about finding your tribe by refusing to hide who you are, even when - especially when - you\'re surrounded by everything society says you should be instead. The classical figures represent all the "proper" ways we\'re supposed to behave, dress, think, create. But look closer and you\'ll find the magic hiding in plain sight. Sometimes the most beautiful thing in the room is the thing that doesn\'t belong there at all. It\'s a reminder that every space needs its rebels, its color, its refusal to take itself too seriously.'
  },
  {
    id: 'beauty-mask-typography',
    title: 'Beauty Wears A Mask',
    excerpt: 'Nothing is as it seems - vibrant typography that reveals the hidden truths behind aesthetic facades...',
    category: 'art',
    date: '2024-10-15',
    tags: ['Typography', 'Digital Art', 'Philosophy', 'Truth'],
    imageUrl: '/beauty-mask-art.jpg',
    artDescription: 'Beauty wears a mask and nothing is as it seems. This piece strips away the pretense to reveal what lies beneath our polished surfaces. The flowing typography dances across darkness, each letter a revelation, each color a different facet of truth we\'re afraid to show. The word "Beauty" flows like liquid silk, but look closer - the other words whisper secrets about authenticity, about the masks we all wear to hide our real selves. This isn\'t just art; it\'s a mirror reflecting the beautiful mess of being human. The vibrant blues, passionate reds, and electric cyans don\'t just look pretty - they scream the truth that beauty isn\'t about perfection, it\'s about having the courage to show your scars alongside your strengths. In a world obsessed with filters and facades, this piece dares to ask: what if the most beautiful thing about you is exactly what you\'re trying to hide?'
  },
  {
    id: 'astronaut-classical',
    title: 'Meagre Company 1678',
    excerpt: 'When a modern astronaut crashes the most formal portrait session in Dutch history...',
    category: 'art',
    date: '2024-10-15',
    tags: ['Digital Art', 'Classical', 'Time Travel', 'Humor'],
    imageUrl: '/astronaut-classical.jpg',
    artDescription: 'This piece embodies the number one rule: PLAY! I took a stuffy, formal Dutch Golden Age group portrait and dropped a space explorer right into the middle of their serious gathering. The astronaut stands there casually waving while these 17th-century gentlemen in their elaborate ruffs and formal poses look on. It\'s about breaking the rules of time, space, and artistic convention. Why should art be confined to one era? Why can\'t past and future dance together? This is what happens when you refuse to color inside the lines of history - you create something that makes people smile and question everything they thought they knew about "proper" art. The contrast between the astronaut\'s modern suit and the merchants\' period clothing creates a visual conversation across centuries, proving that creativity knows no boundaries when you remember to play.'
  },
  {
    id: '2',
    title: 'The Earth Homes Revolution: Curved Architecture for Global Peace',
    excerpt: 'Deep dive into why curved edges in architecture could literally end wars and create harmony on Earth...',
    category: 'podcast',
    date: '2024-10-12',
    duration: '38:21',
    tags: ['Earth Homes', 'Architecture', 'Peace', 'Design']
  },
  {
    id: '3',
    title: 'The Cheshire Cat Website',
    excerpt: 'This got its name from a roommate in a psych ward who had a tattoo on his arm of the Cheshire cat from Alice in Wonderland.',
    category: 'video',
    date: '2024-10-10',
    duration: '22:15',
    tags: ['Website', 'Story', 'Alice in Wonderland', 'Personal'],
    videoUrl: 'https://www.youtube.com/embed/dluvgCj8Pm8?si=5CXU7s47MDVtXd__'
  },
  {
    id: '4',
    title: 'The easy way or the fun way',
    excerpt: 'Sometimes the choice is simple - but which path will you take?',
    category: 'video',
    date: '2024-10-08',
    duration: '0:60',
    tags: ['Choice', 'Philosophy', 'Life', 'Decision'],
    videoUrl: 'https://www.youtube.com/embed/WqQWSbDBNww'
  },
  {
    id: '4b',
    title: 'Still Choose Love',
    excerpt: 'In a world that tries to harden us, sometimes the most radical act is to keep choosing love.',
    category: 'video',
    date: '2024-10-08',
    duration: '0:60',
    tags: ['Love', 'Choice', 'Hope', 'Philosophy'],
    videoUrl: 'https://www.youtube.com/embed/7l-miL_SGvE'
  },
  {
    id: '4c',
    title: 'Ground yourself',
    excerpt: 'In the chaos of modern life, finding your center is not a luxury - it\'s a necessity.',
    category: 'video',
    date: '2024-10-08',
    duration: '0:60',
    tags: ['Grounding', 'Mindfulness', 'Self-Care', 'Balance'],
    videoUrl: 'https://www.youtube.com/embed/FAXi2PbUi-U'
  },
  {
    id: '4d',
    title: 'Animal Shelter Revolution: Design for Healing',
    excerpt: 'Visual tour of the badass animal sanctuary that actually gives a damn, showing the healing environments in action...',
    category: 'video',
    date: '2024-10-08',
    duration: '15:44',
    tags: ['Animals', 'Shelter', 'Design', 'Compassion']
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('podcast');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string} | null>(null);
  const postsPerPage = 3;

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Filter posts based on category and search
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesCategory = post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const categories = [
    { id: 'all', name: 'All Content', icon: '🌟' },
    { id: 'podcast', name: 'Podcasts', icon: '🎙️' },
    { id: 'video', name: 'Videos', icon: '🎥' },
    { id: 'art', name: 'Art & Design', icon: '🎨' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'podcast': return 'text-green-400 border-green-400';
      case 'video': return 'text-red-400 border-red-400';
      case 'art': return 'text-purple-400 border-purple-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            {/* Retro Neon Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-green-400/10 to-yellow-400/10 rounded-lg"></div>
            
            {/* Neon Border Effect */}
            <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.5),inset_0_0_20px_rgba(0,255,255,0.1)]"></div>
            <div className="absolute inset-2 rounded-lg border border-pink-400/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]"></div>
            
            {/* Image */}
            <Image
              src={selectedImage.url}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="relative z-10 max-w-full max-h-[80vh] object-contain rounded-lg"
              unoptimized
            />
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/70 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center text-xl font-bold rounded-full shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            >
              ×
            </button>
            
            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/80 border border-cyan-400/50 p-4 rounded backdrop-blur-sm">
              <h3 className="text-cyan-400 font-bold text-lg">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: 'radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px), radial-gradient(circle at 75% 75%, magenta 1px, transparent 1px)',
               backgroundSize: '100px 100px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <Navigation theme="blue" leftIcon="🦇" />

      {/* Main Content */}
      <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-8 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                MEDIA HUB
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-gray-300 mb-8 sm:mb-12 px-2">
              🎙️ Podcasts • 📺 Videos • 🎨 Art - Choose Your Experience
            </p>

            {/* Category Selection Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 px-2">
              <button
                onClick={() => {
                  setSelectedCategory('podcast');
                  setCurrentPage(1);
                }}
                className={`px-6 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold border-2 transition-all duration-300 ${
                  selectedCategory === 'podcast'
                    ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.8)]'
                    : 'bg-transparent text-cyan-400 border-cyan-400/50 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                }`}
              >
                🎙️ PODCASTS
              </button>
              
              <button
                onClick={() => {
                  setSelectedCategory('video');
                  setCurrentPage(1);
                }}
                className={`px-6 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold border-2 transition-all duration-300 ${
                  selectedCategory === 'video'
                    ? 'bg-purple-500 text-white border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]'
                    : 'bg-transparent text-purple-400 border-purple-400/50 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                }`}
              >
                📺 VIDEOS
              </button>
              
              <button
                onClick={() => {
                  setSelectedCategory('art');
                  setCurrentPage(1);
                }}
                className={`px-6 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold border-2 transition-all duration-300 ${
                  selectedCategory === 'art'
                    ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.8)]'
                    : 'bg-transparent text-pink-400 border-pink-400/50 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                }`}
              >
                🎨 ART
              </button>
            </div>
          </div>

          {/* Section Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
              Latest {selectedCategory === 'podcast' ? 'Podcasts' : selectedCategory === 'video' ? 'Videos' : 'Art'}
            </h2>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-cyan-400 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  ←
                </button>
                
                <span className="text-cyan-400 font-bold text-sm sm:text-base">
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-cyan-400 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
            {currentPosts.map((post, index) => (
              <div key={post.id} className="group">
                <div className={`bg-black/50 border-2 p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] ${
                  selectedCategory === 'podcast' ? 'border-cyan-400/30 hover:border-cyan-400' :
                  selectedCategory === 'video' ? 'border-purple-400/30 hover:border-purple-400' :
                  'border-pink-400/30 hover:border-pink-400'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                    selectedCategory === 'podcast' ? 'text-cyan-400' :
                    selectedCategory === 'video' ? 'text-purple-400' :
                    'text-pink-400'
                  }`}>
                    {post.title}
                  </h3>

                  {/* Art Image */}
                  {post.category === 'art' && post.imageUrl && (
                    <div className="mb-3 sm:mb-4 cursor-pointer group/image">
                      <div 
                        className="relative overflow-hidden rounded border border-pink-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        onClick={() => setSelectedImage({url: post.imageUrl!, title: post.title})}
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover/image:from-cyan-500/20 group-hover/image:to-pink-500/20 transition-all duration-300 z-10 flex items-center justify-center">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/70 px-4 py-2 rounded border border-cyan-400 text-cyan-400 font-bold">
                            Click to Expand 🔍
                          </div>
                        </div>
                        
                        <Image 
                          src={post.imageUrl} 
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-48 sm:h-64 object-cover group-hover/image:scale-105 transition-transform duration-300"
                          unoptimized
                          onError={(e) => {
                            console.log('Image failed to load:', post.imageUrl);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Video Embed */}
                  {post.category === 'video' && post.videoUrl && (
                    <div className="mb-3 sm:mb-4">
                      <div className="relative aspect-video rounded border border-purple-400/30 overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={post.videoUrl}
                          title={post.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin" 
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Debug info for art posts */}
                  {post.category === 'art' && (
                    <div className="text-xs text-gray-500 mb-2">
                      Image URL: {post.imageUrl || 'No image URL'} | Category: {post.category}
                    </div>
                  )}
                  
                  <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    {post.excerpt}
                  </p>

                  {/* Art Description */}
                  {post.category === 'art' && post.artDescription && (
                    <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-pink-500/10 border border-pink-400/30">
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {post.artDescription}
                      </p>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-gray-400">📅 {post.date}</span>
                      {post.duration && (
                        <span className={`text-xs sm:text-sm ${
                          selectedCategory === 'podcast' ? 'text-cyan-400' :
                          selectedCategory === 'video' ? 'text-purple-400' :
                          'text-pink-400'
                        }`}>
                          🕒 {post.duration}
                        </span>
                      )}
                    </div>
                    
                    {post.spotifyUrl ? (
                      <a 
                        href={post.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-green-600 border border-green-500 text-white hover:bg-green-500 hover:border-green-400 transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        🎵 <span className="hidden sm:inline">Listen on </span>Spotify
                      </a>
                    ) : (
                      <button className="px-3 sm:px-4 py-2 bg-black/50 border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm">
                        Page not found
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">No Content Found</h3>
              <p className="text-gray-400 text-sm sm:text-base">No {selectedCategory} content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
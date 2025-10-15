'use client';
import { useState } from 'react';
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
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mental Health Matching Through Authentic Content',
    excerpt: 'How I solved the therapist-client mismatch problem using genuine self-expression instead of clinical questionnaires...',
    category: 'podcast',
    date: '2024-10-15',
    duration: '45:32',
    tags: ['Mental Health', 'Innovation', 'Therapy', 'Authenticity']
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
    title: 'Nano Technology in Healthcare: The Molecular Revolution',
    excerpt: 'Exploring how nano-engineering will transform medicine at the cellular level, featuring live lab demonstrations...',
    category: 'video',
    date: '2024-10-10',
    duration: '22:15',
    tags: ['Nano Technology', 'Healthcare', 'Innovation', 'Medicine']
  },
  {
    id: '4',
    title: 'Animal Shelter Revolution: Design for Healing',
    excerpt: 'Visual tour of the badass animal sanctuary that actually gives a damn, showing the healing environments in action...',
    category: 'video',
    date: '2024-10-08',
    duration: '15:44',
    tags: ['Animals', 'Shelter', 'Design', 'Compassion']
  },
  {
    id: '5',
    title: 'The Penguin Cafe: Visual Identity & Brand Story',
    excerpt: 'Complete brand development for the revolutionary home restaurant concept...',
    category: 'art',
    date: '2024-10-05',
    tags: ['Branding', 'Restaurant', 'Culture', 'Design'],
    artDescription: 'This brand identity captures the essence of spontaneity and cultural celebration. The logo features warm, welcoming curves that mirror the Earth Homes philosophy - no harsh edges, only flowing connections. The color palette draws from spices and warmth, creating an identity that feels like home regardless of whose kitchen you\'re in. Each visual element tells the story of families sharing their heritage through food, transforming strangers into friends around dinner tables across the world.'
  },
  {
    id: '6',
    title: 'Building Communities for Outcasts: Hope Through Design',
    excerpt: 'How we\'re building safe havens where society\'s forgotten can finally heal and thrive...',
    category: 'podcast',
    date: '2024-10-03',
    duration: '52:18',
    tags: ['Community', 'Healing', 'Social Impact', 'Recovery']
  },
  {
    id: '7',
    title: 'Bebo Platform: Authentic Commerce Revolution',
    excerpt: 'Behind the scenes look at building the anti-Amazon marketplace for genuine creators and entrepreneurs...',
    category: 'video',
    date: '2024-10-01',
    duration: '28:33',
    tags: ['E-commerce', 'Entrepreneurship', 'Authenticity', 'Business']
  },
  {
    id: '8',
    title: 'Freedom Music: Album Art for Liberation',
    excerpt: 'Visual concepts for music that plants seeds of freedom in young minds...',
    category: 'art',
    date: '2024-09-28',
    tags: ['Music', 'Freedom', 'Children', 'Liberation'],
    artDescription: 'These album covers break every rule of children\'s music design. Instead of cartoons and primary colors, I created mystical landscapes that spark curiosity and wonder. Each piece represents a different aspect of freedom - wild animals roaming free, children dancing in moonlight, trees growing through concrete. The typography flows like music itself, never confined to rigid boxes. This is art that refuses to talk down to children, instead treating them as the wise souls they are before society teaches them to doubt their magic.'
  },
  {
    id: '9',
    title: 'Movie Industry Truth: Authentic Cinema Revolution',
    excerpt: 'Why Hollywood is broken and how we\'re building cinema that actually matters...',
    category: 'video',
    date: '2024-09-25',
    duration: '19:27',
    tags: ['Film', 'Hollywood', 'Authenticity', 'Revolution']
  },
  {
    id: '10',
    title: 'Earth Homes Architecture: Blueprints for Harmony',
    excerpt: 'Visual exploration of curved architecture designed to create global peace...',
    category: 'art',
    date: '2024-09-22',
    tags: ['Architecture', 'Peace', 'Design', 'Harmony'],
    artDescription: 'These architectural renderings challenge everything we think we know about building design. Every line flows like water, every space breathes like a living organism. I\'ve spent months studying how sharp edges create psychological tension - in our homes, our hearts, our world. These Earth Homes eliminate that violence through organic curves that mirror nature\'s perfect patterns. The technical drawings show not just how to build these structures, but how to build a more peaceful world, one curved wall at a time.'
  },
  // Additional Podcast Content
  {
    id: '11',
    title: 'ReLEAF: Revolutionary Forest Restoration Technology',
    excerpt: 'How advanced AI and biotechnology can restore entire forests in record time...',
    category: 'podcast',
    date: '2024-09-20',
    duration: '41:12',
    tags: ['Environment', 'AI', 'Biotechnology', 'Forests']
  },
  {
    id: '12',
    title: 'Global Travel Revolution: Beyond Mass Tourism',
    excerpt: 'Creating authentic travel experiences that actually benefit local communities...',
    category: 'podcast',
    date: '2024-09-18',
    duration: '36:45',
    tags: ['Travel', 'Community', 'Culture', 'Authenticity']
  },
  {
    id: '13',
    title: 'Educational System Rebellion: Learning Without Limits',
    excerpt: 'Why traditional education is failing and how we can revolutionize learning...',
    category: 'podcast',
    date: '2024-09-15',
    duration: '48:33',
    tags: ['Education', 'Innovation', 'Learning', 'Revolution']
  },
  {
    id: '14',
    title: 'Clothing Revolution: Fashion That Heals the Planet',
    excerpt: 'Sustainable fashion that doesn\'t compromise on style or ethics...',
    category: 'podcast',
    date: '2024-09-12',
    duration: '33:21',
    tags: ['Fashion', 'Sustainability', 'Ethics', 'Environment']
  },
  // Additional Video Content
  {
    id: '15',
    title: 'Gaming for Good: Virtual Worlds, Real Impact',
    excerpt: 'How gaming technology can solve real-world problems and create positive change...',
    category: 'video',
    date: '2024-09-10',
    duration: '25:18',
    tags: ['Gaming', 'Technology', 'Social Impact', 'Innovation']
  },
  {
    id: '16',
    title: 'Relic Collection: Preserving Human Stories',
    excerpt: 'Documentary tour through the collection that preserves forgotten histories...',
    category: 'video',
    date: '2024-09-08',
    duration: '31:44',
    tags: ['History', 'Culture', 'Preservation', 'Stories']
  },
  {
    id: '17',
    title: 'Brand Strategy: Authentic Identity in Fake World',
    excerpt: 'Live brand development session showing how authentic brands cut through the noise...',
    category: 'video',
    date: '2024-09-05',
    duration: '18:52',
    tags: ['Branding', 'Strategy', 'Authenticity', 'Marketing']
  },
  {
    id: '18',
    title: 'Nano Technology Lab Tour: The Future is Tiny',
    excerpt: 'Behind-the-scenes look at cutting-edge nano research facilities...',
    category: 'video',
    date: '2024-09-03',
    duration: '27:16',
    tags: ['Nano Technology', 'Science', 'Research', 'Innovation']
  },
  // Additional Art Content
  {
    id: '19',
    title: 'Mental Health Visual Identity: Healing Through Design',
    excerpt: 'Brand identity for the therapeutic matching platform that prioritizes authentic connection...',
    category: 'art',
    date: '2024-09-01',
    tags: ['Mental Health', 'Branding', 'Therapy', 'Healing'],
    artDescription: 'This visual identity breaks every rule of mental health branding. Instead of sterile blues and corporate safety, I created a warm, organic system that feels like a trusted friend. The logo breathes with gentle curves, the typography flows like conversation, and the color palette draws from nature\'s most calming moments - sunset oranges, forest greens, ocean blues. Every element communicates that healing happens through human connection, not clinical distance.'
  },
  {
    id: '20',
    title: 'Gaming Universe: Visual Design for Virtual Worlds',
    excerpt: 'Complete visual system for gaming platforms that prioritize player wellbeing...',
    category: 'art',
    date: '2024-08-29',
    tags: ['Gaming', 'UI/UX', 'Virtual Reality', 'Design'],
    artDescription: 'Gaming design that refuses to exploit addiction patterns. Every interface element is designed to enhance the gaming experience while respecting players\' time and mental health. The visual language draws from nature and organic forms, creating virtual spaces that feel like sanctuaries rather than casinos. Color schemes shift based on play time, gently encouraging healthy breaks, while achievement systems celebrate progress over grinding.'
  },
  {
    id: '21',
    title: 'Educational Revolution: Visual Learning Systems',
    excerpt: 'Design concepts for learning platforms that adapt to every student\'s unique potential...',
    category: 'art',
    date: '2024-08-26',
    tags: ['Education', 'Learning', 'UI/UX', 'Innovation'],
    artDescription: 'Educational design that treats every student as a genius waiting to be discovered. The interface morphs and adapts, presenting information in dozens of different ways until it clicks for each individual learner. Visual metaphors replace rigid categories, allowing knowledge to flow and connect naturally. The color psychology supports different learning states - energizing oranges for active exploration, calming blues for deep focus, inspiring purples for creative synthesis.'
  },
  {
    id: '22',
    title: 'Travel Platform: Cultural Bridge Visual Identity',
    excerpt: 'Brand design for authentic travel experiences that celebrate local communities...',
    category: 'art',
    date: '2024-08-24',
    tags: ['Travel', 'Culture', 'Community', 'Branding'],
    artDescription: 'This travel brand identity celebrates the beauty of cultural exchange without exploitation. The visual system draws inspiration from traditional patterns and colors from around the world, creating a unified language that honors diversity. Typography flows like ancient scripts, photos are framed like windows into other worlds, and the overall aesthetic feels like a passport to authentic human connection rather than tourist consumption.'
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('podcast');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 3;

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
      <div className="relative z-10 py-20 px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                MEDIA HUB
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              🎙️ Podcasts • 📺 Videos • 🎨 Art - Choose Your Experience
            </p>

            {/* Category Selection Buttons */}
            <div className="flex justify-center gap-6 mb-16">
              <button
                onClick={() => {
                  setSelectedCategory('podcast');
                  setCurrentPage(1);
                }}
                className={`px-12 py-4 text-xl font-bold border-2 transition-all duration-300 ${
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
                className={`px-12 py-4 text-xl font-bold border-2 transition-all duration-300 ${
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
                className={`px-12 py-4 text-xl font-bold border-2 transition-all duration-300 ${
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-400">
              Latest {selectedCategory === 'podcast' ? 'Podcasts' : selectedCategory === 'video' ? 'Videos' : 'Art'}
            </h2>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 border-2 border-cyan-400 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center"
                >
                  ←
                </button>
                
                <span className="text-cyan-400 font-bold">
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 border-2 border-cyan-400 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <div key={post.id} className="group">
                <div className={`bg-black/50 border-2 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] ${
                  selectedCategory === 'podcast' ? 'border-cyan-400/30 hover:border-cyan-400' :
                  selectedCategory === 'video' ? 'border-purple-400/30 hover:border-purple-400' :
                  'border-pink-400/30 hover:border-pink-400'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 ${
                    selectedCategory === 'podcast' ? 'text-cyan-400' :
                    selectedCategory === 'video' ? 'text-purple-400' :
                    'text-pink-400'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Art Description */}
                  {post.category === 'art' && post.artDescription && (
                    <div className="mb-4 p-4 bg-pink-500/10 border border-pink-400/30">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {post.artDescription}
                      </p>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">📅 {post.date}</span>
                      {post.duration && (
                        <span className={`text-sm ${
                          selectedCategory === 'podcast' ? 'text-cyan-400' :
                          selectedCategory === 'video' ? 'text-purple-400' :
                          'text-pink-400'
                        }`}>
                          🕒 {post.duration}
                        </span>
                      )}
                    </div>
                    
                    <button className="px-4 py-2 bg-black/50 border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-300">
                      Page not found
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">No Content Found</h3>
              <p className="text-gray-400">No {selectedCategory} content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
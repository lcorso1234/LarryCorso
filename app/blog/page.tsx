'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

// Sample data - replace with your actual content
const podcastsData = [
  {
    title: "The Future of Tech",
    description: "Exploring emerging technologies and their impact on society",
    embedUrl: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
    duration: "45 min",
    date: "Oct 10, 2025"
  },
  {
    title: "Digital Transformation",
    description: "How businesses are adapting to the digital age",
    embedUrl: "https://open.spotify.com/embed/episode/1A8zX9KwQg7YtL3V5R2Bnm",
    duration: "38 min",
    date: "Oct 5, 2025"
  },
  {
    title: "AI and Ethics",
    description: "Discussing the ethical implications of artificial intelligence",
    embedUrl: "https://open.spotify.com/embed/episode/7Hj2Qp9LkM3nC8vE1R4Ft5",
    duration: "52 min",
    date: "Sep 28, 2025"
  },
  {
    title: "Startup Stories",
    description: "Success stories from emerging entrepreneurs",
    embedUrl: "https://open.spotify.com/embed/episode/9Kf4Ws2Nm6pL8rT3Q1Yv7B",
    duration: "41 min",
    date: "Sep 20, 2025"
  },
  {
    title: "Remote Work Revolution",
    description: "The changing landscape of work and productivity",
    embedUrl: "https://open.spotify.com/embed/episode/2Mx7Tp5Qr9sU6wY4E8Hj1N",
    duration: "35 min",
    date: "Sep 15, 2025"
  },
  {
    title: "Cybersecurity Insights",
    description: "Protecting yourself in the digital world",
    embedUrl: "https://open.spotify.com/embed/episode/5Nq8Vr1Ws4dL7pM2K9Ft6X",
    duration: "47 min",
    date: "Sep 8, 2025"
  }
];

const videosData = [
  {
    title: "Building the Future",
    description: "A deep dive into modern web development practices",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:34",
    date: "Oct 8, 2025"
  },
  {
    title: "Design Principles",
    description: "Creating beautiful and functional user interfaces",
    embedUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
    duration: "8:45",
    date: "Oct 3, 2025"
  },
  {
    title: "Code Review Best Practices",
    description: "How to give and receive effective code feedback",
    embedUrl: "https://www.youtube.com/embed/sTeoEFzVNSc",
    duration: "15:22",
    date: "Sep 25, 2025"
  },
  {
    title: "Performance Optimization",
    description: "Making your websites lightning fast",
    embedUrl: "https://www.youtube.com/embed/L72fhGm1tfE",
    duration: "18:07",
    date: "Sep 18, 2025"
  }
];

const artData = [
  {
    title: "Digital Dreams",
    description: "A surreal exploration of consciousness merging with technology. This piece represents the liminal space between human intuition and digital precision, where pixels become poetry and code transforms into canvas.",
    imageUrl: "/art/digital-dreams.jpg",
    medium: "Digital Art",
    date: "Oct 12, 2025"
  },
  {
    title: "Neon Horizons",
    description: "Cyberpunk aesthetics meet natural landscapes in this vibrant composition. The contrast between organic curves and geometric patterns reflects our eternal dance between nature and technology.",
    imageUrl: "/art/neon-horizons.jpg",
    medium: "Mixed Media",
    date: "Oct 6, 2025"
  },
  {
    title: "Code as Canvas",
    description: "When programming becomes art - this piece visualizes the beauty hidden in algorithms and data structures. Each line of code transforms into flowing ribbons of light, revealing the poetry in programming.",
    imageUrl: "/art/code-canvas.jpg",
    medium: "Generative Art",
    date: "Sep 29, 2025"
  },
  {
    title: "Cosmic Interface",
    description: "UI design meets space exploration in this stellar composition. Buttons become planets, menus transform into constellations, and user flows map the pathways between stars.",
    imageUrl: "/art/cosmic-interface.jpg",
    medium: "Digital Illustration",
    date: "Sep 22, 2025"
  },
  {
    title: "Binary Blossoms",
    description: "Where technology blooms - this piece reimagines flowers through the lens of digital growth. Each petal is a data point, every stem a connection, creating gardens that exist only in the realm of ones and zeros.",
    imageUrl: "/art/binary-blossoms.jpg",
    medium: "3D Rendering",
    date: "Sep 15, 2025"
  },
  {
    title: "Pixel Prophecy",
    description: "A prophetic vision of our digital future rendered in pure pixel art. This retro-futuristic piece channels the aesthetics of early computing while imagining possibilities that stretch beyond our current horizon.",
    imageUrl: "/art/pixel-prophecy.jpg",
    medium: "Pixel Art",
    date: "Sep 8, 2025"
  }
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState<'podcasts' | 'videos' | 'art'>('podcasts');
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentArtPage, setCurrentArtPage] = useState(0);
  const itemsPerPage = 3;

  const handleTabChange = (tab: 'podcasts' | 'videos' | 'art') => {
    setActiveTab(tab);
  };

  const changePage = (type: 'podcasts' | 'videos' | 'art', direction: number) => {
    if (type === 'podcasts') {
      const maxPage = Math.ceil(podcastsData.length / itemsPerPage) - 1;
      setCurrentPodcastPage(prev => Math.max(0, Math.min(maxPage, prev + direction)));
    } else if (type === 'videos') {
      const maxPage = Math.ceil(videosData.length / itemsPerPage) - 1;
      setCurrentVideoPage(prev => Math.max(0, Math.min(maxPage, prev + direction)));
    } else {
      const maxPage = Math.ceil(artData.length / itemsPerPage) - 1;
      setCurrentArtPage(prev => Math.max(0, Math.min(maxPage, prev + direction)));
    }
  };

  const renderPodcasts = () => {
    const start = currentPodcastPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = podcastsData.slice(start, end);
    
    return pageData.map((podcast, index) => (
      <div key={index} className="bg-black border-2 border-cyan-400/50 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all duration-300">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">{podcast.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{podcast.description}</p>
          <div className="flex justify-between text-xs text-gray-400">
            <span>🎙️ {podcast.duration}</span>
            <span>📅 {podcast.date}</span>
          </div>
        </div>
        <div className="aspect-video bg-gray-900 rounded border border-cyan-400/30">
          <iframe 
            src={podcast.embedUrl} 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="encrypted-media" 
            className="rounded w-full"
          />
        </div>
      </div>
    ));
  };

  const renderVideos = () => {
    const start = currentVideoPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = videosData.slice(start, end);
    
    return pageData.map((video, index) => (
      <div key={index} className="bg-black border-2 border-purple-400/50 rounded-lg p-6 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all duration-300">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-purple-400 mb-2">{video.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{video.description}</p>
          <div className="flex justify-between text-xs text-gray-400">
            <span>📺 {video.duration}</span>
            <span>📅 {video.date}</span>
          </div>
        </div>
        <div className="aspect-video bg-gray-900 rounded border border-purple-400/30">
          <iframe 
            src={video.embedUrl} 
            width="100%" 
            height="315" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className="w-full h-full rounded"
          />
        </div>
      </div>
    ));
  };

  const renderArt = () => {
    const start = currentArtPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = artData.slice(start, end);
    
    return pageData.map((art, index) => (
      <div key={index} className="bg-black border-2 border-pink-400/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(255,20,147,0.3)] hover:shadow-[0_0_30px_rgba(255,20,147,0.6)] transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 aspect-square lg:aspect-auto">
            <div className="w-full h-64 lg:h-full bg-gradient-to-br from-pink-500/20 via-purple-600/30 to-blue-500/20 flex items-center justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-pink-400/30">
              <div className="text-center text-pink-400/60">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-400/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-sm font-mono">{art.title}</p>
                <p className="text-xs mt-1">{art.medium}</p>
              </div>
            </div>
          </div>
          
          {/* Text Section */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-center">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-pink-400 mb-3">{art.title}</h3>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>🎨 {art.medium}</span>
                <span>📅 {art.date}</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">{art.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  const getPaginationInfo = (type: 'podcasts' | 'videos' | 'art') => {
    if (type === 'podcasts') {
      const maxPage = Math.ceil(podcastsData.length / itemsPerPage);
      return {
        current: currentPodcastPage + 1,
        total: maxPage,
        isFirstPage: currentPodcastPage === 0,
        isLastPage: currentPodcastPage === maxPage - 1
      };
    } else if (type === 'videos') {
      const maxPage = Math.ceil(videosData.length / itemsPerPage);
      return {
        current: currentVideoPage + 1,
        total: maxPage,
        isFirstPage: currentVideoPage === 0,
        isLastPage: currentVideoPage === maxPage - 1
      };
    } else {
      const maxPage = Math.ceil(artData.length / itemsPerPage);
      return {
        current: currentArtPage + 1,
        total: maxPage,
        isFirstPage: currentArtPage === 0,
        isLastPage: currentArtPage === maxPage - 1
      };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-20 pb-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
              MEDIA HUB
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            🎙️ Podcasts • 📺 Videos • 🎨 Art - Choose Your Experience
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              className={`px-8 py-4 border-2 transition-all duration-300 font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.5)] ${
                activeTab === 'podcasts' 
                  ? 'border-cyan-400 bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,1)]'
                  : 'border-cyan-400 text-cyan-400 bg-black hover:bg-cyan-400 hover:text-black'
              }`}
              onClick={() => handleTabChange('podcasts')}
            >
              🎙️ Podcasts
            </button>
            <button 
              className={`px-8 py-4 border-2 transition-all duration-300 font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(147,51,234,0.5)] ${
                activeTab === 'videos' 
                  ? 'border-purple-400 bg-purple-400 text-black shadow-[0_0_20px_rgba(147,51,234,1)]'
                  : 'border-purple-400 text-purple-400 bg-black hover:bg-purple-400 hover:text-black'
              }`}
              onClick={() => handleTabChange('videos')}
            >
              📺 Videos
            </button>
            <button 
              className={`px-8 py-4 border-2 transition-all duration-300 font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(255,20,147,0.5)] ${
                activeTab === 'art' 
                  ? 'border-pink-400 bg-pink-400 text-black shadow-[0_0_20px_rgba(255,20,147,1)]'
                  : 'border-pink-400 text-pink-400 bg-black hover:bg-pink-400 hover:text-black'
              }`}
              onClick={() => handleTabChange('art')}
            >
              🎨 Art
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8">
        <div className="max-w-6xl mx-auto">
          {/* Podcasts Section */}
          {activeTab === 'podcasts' && (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-cyan-400">Latest Podcasts</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    className={`p-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('podcasts').isFirstPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('podcasts', -1)}
                    disabled={getPaginationInfo('podcasts').isFirstPage}
                  >
                    ←
                  </button>
                  <span className="text-cyan-400 font-mono">
                    {getPaginationInfo('podcasts').current} / {getPaginationInfo('podcasts').total}
                  </span>
                  <button 
                    className={`p-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('podcasts').isLastPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('podcasts', 1)}
                    disabled={getPaginationInfo('podcasts').isLastPage}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderPodcasts()}
              </div>
            </>
          )}

          {/* Videos Section */}
          {activeTab === 'videos' && (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-purple-400">Latest Videos</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    className={`p-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('videos').isFirstPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('videos', -1)}
                    disabled={getPaginationInfo('videos').isFirstPage}
                  >
                    ←
                  </button>
                  <span className="text-purple-400 font-mono">
                    {getPaginationInfo('videos').current} / {getPaginationInfo('videos').total}
                  </span>
                  <button 
                    className={`p-3 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('videos').isLastPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('videos', 1)}
                    disabled={getPaginationInfo('videos').isLastPage}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {renderVideos()}
              </div>
            </>
          )}

          {/* Art Section */}
          {activeTab === 'art' && (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-pink-400">Digital Art Gallery</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    className={`p-3 border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('art').isFirstPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('art', -1)}
                    disabled={getPaginationInfo('art').isFirstPage}
                  >
                    ←
                  </button>
                  <span className="text-pink-400 font-mono">
                    {getPaginationInfo('art').current} / {getPaginationInfo('art').total}
                  </span>
                  <button 
                    className={`p-3 border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 ${
                      getPaginationInfo('art').isLastPage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => changePage('art', 1)}
                    disabled={getPaginationInfo('art').isLastPage}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="space-y-8">
                {renderArt()}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom spacing for fixed menu */}
      <div className="h-32"></div>

      {/* Navigation */}
      <Navigation theme="green" />
    </div>
  );
}
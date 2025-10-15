'use client';
import { useState } from 'react';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import EnhancedButton from '@/components/EnhancedButton';

export default function Portfolio() {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 opacity-30 pulse-slow" 
             style={{
               backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Laser Beam Effects */}
      <div className="absolute top-0 left-1/6 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-blue-400 opacity-60 pulse-slow stagger-1"></div>
      <div className="absolute top-0 right-1/5 w-1 h-full bg-gradient-to-b from-cyan-400 via-transparent to-purple-400 opacity-60 pulse-slow stagger-2"></div>
      <div className="absolute top-1/5 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-transparent to-cyan-400 opacity-60 pulse-slow stagger-3"></div>

      {/* Main Content */}
      <div className="relative z-10 py-20 px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollAnimation animation="slideInDown" delay={0.2}>
            <div className="text-center mb-16">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 gpu-accelerated">
                <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent pulse-fast drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]">
                  MY PORTFOLIO
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                WHERE VISION MEETS REALITY
              </p>
            </div>
          </ScrollAnimation>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Project 1 */}
            <ScrollAnimation animation="fadeInUp" delay={0.4}>
              <div className="group bg-black/50 border border-purple-400/30 overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] gpu-accelerated mobile-touch">
                <div className="h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-400 mx-auto mb-4 transform rotate-45 group-hover:rotate-90 transition-transform duration-300 gpu-accelerated"></div>
                    <p className="text-purple-400 font-bold">E-COMMERCE REVOLUTION</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-purple-400 mb-3">Digital Storefront</h3>
                  <p className="text-gray-300 mb-4">Transformed a traditional retail business into a cyber-punk digital empire. Sales increased 400%.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">Next.js</span>
                    <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Tailwind</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Node.js</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Project 2 */}
            <ScrollAnimation animation="fadeInUp" delay={0.6}>
              <div className="group bg-black/50 border border-blue-400/30 overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] gpu-accelerated mobile-touch">
                <div className="h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-400 mx-auto mb-4 rounded-full group-hover:scale-110 transition-transform duration-300 gpu-accelerated"></div>
                    <p className="text-blue-400 font-bold">HEALTHCARE INNOVATION</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-blue-400 mb-3">Medical Portal</h3>
                  <p className="text-gray-300 mb-4">Created a futuristic patient management system that saved lives through better data visualization.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">React</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Python</span>
                    <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Project 3 */}
            <ScrollAnimation animation="fadeInUp" delay={0.8}>
              <div className="group bg-black/50 border border-cyan-400/30 overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] gpu-accelerated mobile-touch">
                <div className="h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-400 mx-auto mb-4 transform -rotate-45 group-hover:rotate-45 transition-transform duration-300 gpu-accelerated"></div>
                    <p className="text-cyan-400 font-bold">CREATIVE AGENCY</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-cyan-400 mb-3">Art Collective</h3>
                  <p className="text-gray-300 mb-4">Built a digital gallery that became the epicenter of the underground art movement.</p>
                  <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">Vue.js</span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-sm border border-purple-400/50">WebGL</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">Three.js</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group bg-black/50 border border-pink-400/30 overflow-hidden hover:border-pink-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              <div className="h-64 bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-400 mx-auto mb-4 rounded-lg group-hover:rotate-180 transition-transform duration-300"></div>
                  <p className="text-pink-400 font-bold">TECH STARTUP</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-pink-400 mb-3">SaaS Platform</h3>
                <p className="text-gray-300 mb-4">Launched a B2B platform that disrupted an entire industry. Now valued at $50M.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-pink-400/20 text-pink-400 text-sm border border-pink-400/50">TypeScript</span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">AWS</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Redis</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="group bg-black/50 border border-green-400/30 overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <div className="h-64 bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400 mx-auto mb-4 rounded-full group-hover:pulse transition-all duration-300"></div>
                  <p className="text-green-400 font-bold">ENVIRONMENTAL IMPACT</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-green-400 mb-3">Climate App</h3>
                <p className="text-gray-300 mb-4">Created a carbon tracking platform that helped 100K+ users reduce their environmental footprint.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm border border-green-400/50">Svelte</span>
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">GraphQL</span>
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-sm border border-blue-400/50">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="group bg-black/50 border border-yellow-400/30 overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
              <div className="h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 mx-auto mb-4 rounded-sm group-hover:rounded-full transition-all duration-300"></div>
                  <p className="text-yellow-400 font-bold">EDUCATION PLATFORM</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-yellow-400 mb-3">Learning Hub</h3>
                <p className="text-gray-300 mb-4">Built an interactive learning platform that revolutionized online education for 50K+ students.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm border border-yellow-400/50">Angular</span>
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 text-sm border border-orange-400/50">Firebase</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 text-sm border border-red-400/50">Docker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-purple-400">MY ARSENAL</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-black/50 border border-cyan-400/50 p-4 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300">
                <p className="text-cyan-400 font-bold">React</p>
              </div>
              <div className="bg-black/50 border border-blue-400/50 p-4 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                <p className="text-blue-400 font-bold">Next.js</p>
              </div>
              <div className="bg-black/50 border border-purple-400/50 p-4 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                <p className="text-purple-400 font-bold">TypeScript</p>
              </div>
              <div className="bg-black/50 border border-green-400/50 p-4 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300">
                <p className="text-green-400 font-bold">Node.js</p>
              </div>
              <div className="bg-black/50 border border-pink-400/50 p-4 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
                <p className="text-pink-400 font-bold">Python</p>
              </div>
              <div className="bg-black/50 border border-orange-400/50 p-4 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all duration-300">
                <p className="text-orange-400 font-bold">AWS</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <ScrollAnimation animation="scaleIn" delay={0.8}>
            <div className="text-center py-16">
              <h3 className="text-4xl sm:text-5xl font-black mb-8">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  READY TO CREATE SOMETHING LEGENDARY?
                </span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <EnhancedButton 
                  href="/connect" 
                  variant="primary"
                  className="bg-gradient-to-r from-purple-400 to-blue-500 border-purple-400 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transform hover:scale-105"
                >
                  START A PROJECT
                </EnhancedButton>
                <EnhancedButton 
                  href="/manifesto" 
                  variant="secondary"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transform hover:scale-105"
                >
                  READ MY MANIFESTO
                </EnhancedButton>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Retro Tron Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-50">
        <div className="bg-black border-2 border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.6)] mx-auto mb-2 max-w-5xl relative overflow-hidden">
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(147, 51, 234) 1px, transparent 1px),
                linear-gradient(90deg, rgb(147, 51, 234) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border-2 border-purple-400 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 border-2 border-purple-400 rounded-full flex items-center justify-center bg-black shadow-[0_0_15px_rgba(147,51,234,0.8)]">
                <div className="text-purple-400 font-bold text-xs">PORT</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="px-6 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,1)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,1)]"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-purple-400 text-black bg-purple-400 transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(147,51,234,0.5)]"
              >
                Portfolio
              </Link>
              {/* Blog removed */}
              <Link
                href="/connect"
                className="px-6 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,1)]"
              >
                Connect
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                href="/manifesto"
                className="h-12 w-12 border-2 border-blue-400 bg-black flex items-center justify-center hover:bg-blue-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:shadow-[0_0_25px_rgba(59,130,246,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/connect"
                className="h-12 w-12 border-2 border-cyan-400 bg-black flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.8)] hover:shadow-[0_0_25px_rgba(6,182,212,1)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* User Profile Popup */}
      {showUserPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-black border border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.5)] max-w-md w-full relative">
            <button 
              onClick={() => setShowUserPopup(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.8)]">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-purple-400 mb-2">PORTFOLIO MODE</h3>
                <p className="text-gray-300">Technical Showcase</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">⚡</span>
                  </div>
                  <span className="text-white">Full-Stack Developer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">🎯</span>
                  </div>
                  <span className="text-white">UI/UX Designer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
                    <span className="text-black font-bold text-sm">🚀</span>
                  </div>
                  <span className="text-white">Digital Innovator</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link
                  href="/connect"
                  className="flex-1 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-black text-center hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300"
                >
                  HIRE ME
                </Link>
                <Link
                  href="/manifesto"
                  className="flex-1 py-3 border border-purple-400 text-purple-400 font-black text-center hover:bg-purple-400 hover:text-black transition-all duration-300"
                >
                  MY STORY
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Showcase Popup */}
      {showAnnouncementPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-black border border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] max-w-lg w-full relative">
            <button 
              onClick={() => setShowAnnouncementPopup(false)}
              className="absolute top-4 right-4 text-cyan-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.8)] animate-pulse">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    SKILLS ARSENAL
                  </span>
                </h3>
              </div>
              
              <div className="space-y-4 mb-6 text-center">
                <p className="text-xl font-bold text-cyan-400">
                  🛠️ TECHNICAL MASTERY
                </p>
                <p className="text-white leading-relaxed">
                  From <span className="text-purple-400 font-bold">React & Next.js</span> to 
                  <span className="text-cyan-400 font-bold"> Node.js & Python</span>, 
                  every project showcases cutting-edge expertise.
                </p>
                <p className="text-gray-300 text-sm">
                  Mode: <span className="text-cyan-400 font-bold">ALWAYS LEARNING</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <Link
                  href="/connect"
                  className="block w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-center hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all duration-300"
                >
                  START PROJECT
                </Link>
                <Link href="/" className="block w-full py-3 border border-cyan-400 text-cyan-400 font-black text-center hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  BACK TO VISION
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { APIService, useAPIConnection } from '@/lib/api-service';

interface NavigationProps {
  theme: 'pink' | 'yellow' | 'blue' | 'green' | 'purple';
  leftIcon?: string;
}

const themeColors = {
  pink: {
    border: 'border-pink-400',
    text: 'text-pink-400',
    glow: 'shadow-[0_0_30px_rgba(255,20,147,0.6)]',
    buttonGlow: 'shadow-[0_0_10px_rgba(255,20,147,0.5)]',
    buttonHoverGlow: 'hover:shadow-[0_0_20px_rgba(255,20,147,1)]',
    scanLine: 'via-pink-400',
    leftIconBorder: 'border-pink-400',
    leftIconGlow: 'shadow-[0_0_15px_rgba(255,20,147,0.8)]',
    leftIconText: 'text-pink-400',
    rightIcon1Border: 'border-red-400',
    rightIcon1Text: 'text-red-400',
    rightIcon1Glow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]',
    rightIcon1HoverGlow: 'hover:shadow-[0_0_25px_rgba(239,68,68,1)]',
    rightIcon2Border: 'border-purple-400',
    rightIcon2Text: 'text-purple-400',
    rightIcon2Glow: 'shadow-[0_0_15px_rgba(147,51,234,0.8)]',
    rightIcon2HoverGlow: 'hover:shadow-[0_0_25px_rgba(147,51,234,1)]',
  },
  yellow: {
    border: 'border-yellow-400',
    text: 'text-yellow-400',
    glow: 'shadow-[0_0_30px_rgba(250,204,21,0.6)]',
    buttonGlow: 'shadow-[0_0_10px_rgba(250,204,21,0.5)]',
    buttonHoverGlow: 'hover:shadow-[0_0_20px_rgba(250,204,21,1)]',
    scanLine: 'via-yellow-400',
    leftIconBorder: 'border-yellow-400',
    leftIconGlow: 'shadow-[0_0_15px_rgba(250,204,21,0.8)]',
    leftIconText: 'text-yellow-400',
    rightIcon1Border: 'border-orange-400',
    rightIcon1Text: 'text-orange-400',
    rightIcon1Glow: 'shadow-[0_0_15px_rgba(251,146,60,0.8)]',
    rightIcon1HoverGlow: 'hover:shadow-[0_0_25px_rgba(251,146,60,1)]',
    rightIcon2Border: 'border-red-400',
    rightIcon2Text: 'text-red-400',
    rightIcon2Glow: 'shadow-[0_0_15px_rgba(248,113,113,0.8)]',
    rightIcon2HoverGlow: 'hover:shadow-[0_0_25px_rgba(248,113,113,1)]',
  },
  blue: {
    border: 'border-blue-400',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_30px_rgba(96,165,250,0.6)]',
    buttonGlow: 'shadow-[0_0_10px_rgba(96,165,250,0.5)]',
    buttonHoverGlow: 'hover:shadow-[0_0_20px_rgba(96,165,250,1)]',
    scanLine: 'via-blue-400',
    leftIconBorder: 'border-blue-400',
    leftIconGlow: 'shadow-[0_0_15px_rgba(96,165,250,0.8)]',
    leftIconText: 'text-blue-400',
    rightIcon1Border: 'border-cyan-400',
    rightIcon1Text: 'text-cyan-400',
    rightIcon1Glow: 'shadow-[0_0_15px_rgba(34,211,238,0.8)]',
    rightIcon1HoverGlow: 'hover:shadow-[0_0_25px_rgba(34,211,238,1)]',
    rightIcon2Border: 'border-purple-400',
    rightIcon2Text: 'text-purple-400',
    rightIcon2Glow: 'shadow-[0_0_15px_rgba(147,51,234,0.8)]',
    rightIcon2HoverGlow: 'hover:shadow-[0_0_25px_rgba(147,51,234,1)]',
  },
  green: {
    border: 'border-green-400',
    text: 'text-green-400',
    glow: 'shadow-[0_0_30px_rgba(74,222,128,0.6)]',
    buttonGlow: 'shadow-[0_0_10px_rgba(74,222,128,0.5)]',
    buttonHoverGlow: 'hover:shadow-[0_0_20px_rgba(74,222,128,1)]',
    scanLine: 'via-green-400',
    leftIconBorder: 'border-green-400',
    leftIconGlow: 'shadow-[0_0_15px_rgba(74,222,128,0.8)]',
    leftIconText: 'text-green-400',
    rightIcon1Border: 'border-yellow-400',
    rightIcon1Text: 'text-yellow-400',
    rightIcon1Glow: 'shadow-[0_0_15px_rgba(250,204,21,0.8)]',
    rightIcon1HoverGlow: 'hover:shadow-[0_0_25px_rgba(250,204,21,1)]',
    rightIcon2Border: 'border-blue-400',
    rightIcon2Text: 'text-blue-400',
    rightIcon2Glow: 'shadow-[0_0_15px_rgba(96,165,250,0.8)]',
    rightIcon2HoverGlow: 'hover:shadow-[0_0_25px_rgba(96,165,250,1)]',
  },
  purple: {
    border: 'border-purple-400',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(147,51,234,0.6)]',
    buttonGlow: 'shadow-[0_0_10px_rgba(147,51,234,0.5)]',
    buttonHoverGlow: 'hover:shadow-[0_0_20px_rgba(147,51,234,1)]',
    scanLine: 'via-purple-400',
    leftIconBorder: 'border-purple-400',
    leftIconGlow: 'shadow-[0_0_15px_rgba(147,51,234,0.8)]',
    leftIconText: 'text-purple-400',
    rightIcon1Border: 'border-pink-400',
    rightIcon1Text: 'text-pink-400',
    rightIcon1Glow: 'shadow-[0_0_15px_rgba(255,20,147,0.8)]',
    rightIcon1HoverGlow: 'hover:shadow-[0_0_25px_rgba(255,20,147,1)]',
    rightIcon2Border: 'border-orange-400',
    rightIcon2Text: 'text-orange-400',
    rightIcon2Glow: 'shadow-[0_0_15px_rgba(251,146,60,0.8)]',
    rightIcon2HoverGlow: 'hover:shadow-[0_0_25px_rgba(251,146,60,1)]',
  },
};

const leftIconText = {
  pink: 'LOVE',
  yellow: 'LARRY',
  blue: 'TECH',
  green: 'BLOG',
  purple: 'SOUL',
};

export default function Navigation({ theme, leftIcon }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { connected: isApiConnected, loading: apiLoading } = useAPIConnection();
  const colors = themeColors[theme];

  // Share functionality with API integration
  const handleShare = async () => {
    try {
      const result = await APIService.shareContent(
        'Larry Corso - Digital Creator & Developer',
        'Check out Larry Corso\'s portfolio and blog about tech, creativity, and digital innovation.',
        window.location.origin
      );

      if (result.success) {
        if (result.method === 'native') {
          // Native share was used (mobile devices) - no additional feedback needed
          console.log('Content shared via native share API');
        } else if (result.method === 'clipboard') {
          // Fallback to clipboard - show user feedback
          alert('Website URL copied to clipboard!');
        }
      } else {
        // If API service fails, try direct native share as final fallback
        if (navigator.share) {
          await navigator.share({
            title: 'Larry Corso - Digital Creator & Developer',
            text: 'Check out Larry Corso\'s portfolio and blog about tech, creativity, and digital innovation.',
            url: window.location.origin
          });
        } else {
          // Final fallback to clipboard
          await navigator.clipboard.writeText(window.location.origin);
          alert('Website URL copied to clipboard!');
        }
      }
    } catch (error) {
      console.log('Sharing failed:', error);
      // Final fallback for any errors
      try {
        await navigator.clipboard.writeText(window.location.origin);
        alert('Website URL copied to clipboard!');
      } catch (clipboardError) {
        console.log('Clipboard access failed:', clipboardError);
        // Show a more helpful message for mobile users
        alert('Unable to share. Please copy this URL manually: ' + window.location.origin);
      }
    }
  };

  // Security/Shield functionality with API connection status
  const handleSecurity = async () => {
    try {
      // Log security check to backend
      await APIService.testConnectivity({
        action: 'security_check',
        page: pathname,
        timestamp: new Date().toISOString(),
        api_connected: isApiConnected
      });
      
      window.location.href = '/manifesto';
    } catch (error) {
      console.log('Security check logging failed:', error);
      // Still navigate to manifesto even if logging fails
      window.location.href = '/manifesto';
    }
  };

  // Glitch transition with random motivational quotes
  const navigateWithGlitch = async (href: string) => {
    if (isTransitioning || pathname === href) return;
    
    setIsTransitioning(true);
    router.prefetch(href);
    
    // Random quotes array
    const quotes = [
      "Even if you are expecting certain things, here we will always surprise you.",
      "In your business, we will reveal those small details that make up a surprising big picture.",
      "Our effort is to deliver more than you expect.",
      "Start dreaming about all the great things you will enjoy when your vision comes to life.",
      "We encourage your risky ideas."
    ];
    
    // Get random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Neon colors for glitch effect
    const neonColors = ['#00ff00', '#ff0080', '#00ffff', '#ff8000', '#8000ff'];
    const primaryColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    const secondaryColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    
    // Create glitch overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #000;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-family: 'Courier New', monospace;
      opacity: 0;
      transition: opacity 0.2s ease-in;
    `;
    
    // Create glitch text container
    const textContainer = document.createElement('div');
    textContainer.style.cssText = `
      max-width: 80%;
      text-align: center;
      position: relative;
      overflow: hidden;
    `;
    
    // Create main text
    const mainText = document.createElement('div');
    mainText.textContent = randomQuote;
    mainText.style.cssText = `
      font-size: clamp(1rem, 4vw, 2rem);
      color: ${primaryColor};
      text-shadow: 
        0 0 10px ${primaryColor},
        0 0 20px ${primaryColor},
        0 0 30px ${primaryColor};
      line-height: 1.4;
      animation: glitchText 0.5s infinite;
    `;
    
    // Create glitch layers
    const glitchLayer1 = document.createElement('div');
    glitchLayer1.textContent = randomQuote;
    glitchLayer1.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: clamp(1rem, 4vw, 2rem);
      color: ${secondaryColor};
      mix-blend-mode: screen;
      animation: glitchLayer1 0.3s infinite;
      line-height: 1.4;
    `;
    
    const glitchLayer2 = document.createElement('div');
    glitchLayer2.textContent = randomQuote;
    glitchLayer2.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: clamp(1rem, 4vw, 2rem);
      color: #ff0000;
      mix-blend-mode: screen;
      animation: glitchLayer2 0.4s infinite;
      line-height: 1.4;
    `;
    
    // Create scanlines
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 0, 0.1) 2px,
        rgba(0, 255, 0, 0.1) 4px
      );
      animation: scanlines 2s linear infinite;
      pointer-events: none;
    `;
    
    // Create noise bars
    const noiseBar = document.createElement('div');
    noiseBar.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${primaryColor};
      animation: noiseBar 0.2s infinite;
    `;
    
    // Assemble overlay
    textContainer.appendChild(mainText);
    textContainer.appendChild(glitchLayer1);
    textContainer.appendChild(glitchLayer2);
    overlay.appendChild(textContainer);
    overlay.appendChild(scanlines);
    overlay.appendChild(noiseBar);
    
    document.body.appendChild(overlay);
    
    // Fade in glitch effect
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Navigate after glitch duration
    setTimeout(() => {
      router.push(href);
      
      // Fade out
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
          setIsTransitioning(false);
        }, 200);
      }, 100);
    }, 1700);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/connect', label: 'Connect' },
  ];

  // Add manifesto to nav items if we're on the manifesto page
  const isManifestoPage = pathname === '/manifesto';
  const displayNavItems = isManifestoPage 
    ? [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/blog', label: 'Blog' },
        { href: '/manifesto', label: 'Manifesto' },
        { href: '/connect', label: 'Connect' },
      ]
    : navItems;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {/* Simplified Mobile Menu: single bottom bar with MENU button that toggles an inline grid */}
      {isMenuOpen && (
        <div className={`fixed bottom-16 left-4 right-4 bg-black ${colors.border} border-2 ${colors.glow} z-50 md:hidden rounded-lg animate-in slide-in-from-bottom-4 duration-300`}> 
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {displayNavItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    navigateWithGlitch(item.href);
                  }}
                  disabled={isTransitioning}
                  className={`px-3 py-2 ${colors.border} border rounded-lg ${
                    isActive(item.href) 
                      ? `text-black ${theme === 'pink' ? 'bg-pink-400' : theme === 'yellow' ? 'bg-yellow-400' : theme === 'blue' ? 'bg-blue-400' : theme === 'green' ? 'bg-green-400' : 'bg-purple-400'}` 
                      : `${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black`
                  } transition-all duration-200 font-mono uppercase tracking-wider text-sm text-center transform hover:scale-105 active:scale-95 active:translate-y-0.5 hover:shadow-md active:shadow-sm ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="transition-transform duration-200 inline-block hover:scale-110">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className={`bg-black ${colors.border} border-t-2 ${colors.glow} mx-4 mb-4 rounded-lg`}>
          <div className="flex items-center justify-between px-4 py-3">
            {/* Share Icon with Micro Interactions */}
            <button 
              onClick={handleShare}
              className={`h-10 w-10 ${colors.leftIconBorder} border-2 rounded-lg flex items-center justify-center bg-black ${colors.leftIconGlow} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black transition-all duration-200 transform hover:scale-105 active:scale-95 active:translate-y-0.5 hover:shadow-lg active:shadow-sm`}
              title="Share this website"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.leftIconText} transition-transform duration-200 hover:rotate-12`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            
            {/* Menu Button with Enhanced Micro Interactions */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-6 py-2 ${colors.border} border-2 ${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black transition-all duration-200 font-mono uppercase tracking-wider text-sm ${colors.buttonGlow} ${colors.buttonHoverGlow} rounded transform hover:scale-105 active:scale-95 active:translate-y-0.5 hover:shadow-lg active:shadow-sm`}
            >
              <span className={`transition-transform duration-200 inline-block ${isMenuOpen ? 'rotate-180' : ''}`}>
                MENU
              </span>
            </button>
            
            {/* Heart Icon with Micro Interactions */}
            <button 
              onClick={handleSecurity}
              className={`h-10 w-10 ${colors.rightIcon2Border} border-2 rounded-lg flex items-center justify-center bg-black ${colors.rightIcon2Glow} ${theme === 'pink' ? 'hover:bg-purple-400' : theme === 'yellow' ? 'hover:bg-red-400' : theme === 'blue' ? 'hover:bg-purple-400' : theme === 'green' ? 'hover:bg-yellow-400' : 'hover:bg-orange-400'} hover:text-black transition-all duration-200 transform hover:scale-110 active:scale-95 active:translate-y-0.5 hover:shadow-lg active:shadow-sm`}
              title="Love & Manifesto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon2Text} transition-transform duration-200 hover:scale-125 active:scale-90`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Fixed bottom menu */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 mb-2 z-30">
        <div className={`bg-black ${colors.border} border-2 ${colors.glow} mx-auto mb-2 max-w-5xl relative overflow-hidden`}>
          {/* Tron Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgb(244, 114, 182) 1px, transparent 1px),
                linear-gradient(90deg, rgb(244, 114, 182) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Animated Border Glow */}
          <div className={`absolute inset-0 ${colors.border} border-2 animate-pulse`}></div>
          
          <div className="relative flex items-center justify-between px-3 sm:px-6 py-3">
            {/* Left Icon */}
            <div className="flex items-center">
              <div className={`h-12 w-12 ${colors.leftIconBorder} border-2 rounded-full flex items-center justify-center bg-black ${colors.leftIconGlow} overflow-hidden`}>
                {leftIcon === 'LOGO' ? (
                  <img 
                    src="/logo.svg" 
                    alt="LC Logo" 
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className={`${colors.leftIconText} font-bold text-xs`}>
                    {leftIcon || leftIconText[theme]}
                  </div>
                )}
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {displayNavItems.map((item) => (
                <button
                  key={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithGlitch(item.href);
                  }}
                  disabled={isTransitioning}
                  className={`px-3 lg:px-4 xl:px-6 py-3 ${colors.border} border ${
                    isActive(item.href) 
                      ? `text-black ${theme === 'pink' ? 'bg-pink-400' : theme === 'yellow' ? 'bg-yellow-400' : theme === 'blue' ? 'bg-blue-400' : theme === 'green' ? 'bg-green-400' : 'bg-purple-400'}` 
                      : `${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black`
                  } transition-all duration-300 font-mono uppercase tracking-wider text-xs lg:text-sm ${colors.buttonGlow} ${colors.buttonHoverGlow} ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Right Icons - Desktop only */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/manifesto"
                className={`h-12 w-12 ${colors.rightIcon1Border} border-2 bg-black flex items-center justify-center hover:bg-red-400 hover:text-black transition-all duration-300 ${colors.rightIcon1Glow} ${colors.rightIcon1HoverGlow}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon1Text} hover:text-black`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/connect"
                className={`h-12 w-12 ${colors.rightIcon2Border} border-2 bg-black flex items-center justify-center hover:bg-purple-400 hover:text-black transition-all duration-300 ${colors.rightIcon2Glow} ${colors.rightIcon2HoverGlow}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon2Text} hover:text-black`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${colors.scanLine} to-transparent animate-pulse`}></div>
          <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${colors.scanLine} to-transparent animate-pulse`}></div>
        </div>
      </div>
    </>
  );
}

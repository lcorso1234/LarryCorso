'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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

      if (!result.success) {
        // Fallback to simple clipboard copy
        await navigator.clipboard.writeText(window.location.origin);
        alert('Website URL copied to clipboard!');
      } else if (result.method === 'clipboard') {
        alert('Website URL copied to clipboard!');
      }
    } catch (error) {
      console.log('Sharing failed:', error);
      // Final fallback
      try {
        await navigator.clipboard.writeText(window.location.origin);
        alert('Website URL copied to clipboard!');
      } catch (clipboardError) {
        console.log('Clipboard access failed:', clipboardError);
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

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/connect', label: 'Connect' },
  ];

  // Add manifesto to nav items if we're on the manifesto page
  const isManifestoPage = pathname === '/manifesto';
  const displayNavItems = isManifestoPage 
    ? [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/portfolio', label: 'Portfolio' },
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
        <div className={`fixed bottom-16 left-4 right-4 bg-black ${colors.border} border-2 ${colors.glow} z-50 md:hidden rounded-lg`}> 
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {displayNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 ${colors.border} border ${
                    isActive(item.href) 
                      ? `text-black ${theme === 'pink' ? 'bg-pink-400' : theme === 'yellow' ? 'bg-yellow-400' : theme === 'blue' ? 'bg-blue-400' : theme === 'green' ? 'bg-green-400' : 'bg-purple-400'}` 
                      : `${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black`
                  } transition-all duration-200 font-mono uppercase tracking-wider text-sm text-center`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className={`bg-black ${colors.border} border-t-2 ${colors.glow} mx-4 mb-4 rounded-lg`}>
          <div className="flex items-center justify-between px-4 py-3">
            {/* Share Icon */}
            <button 
              onClick={handleShare}
              className={`h-10 w-10 ${colors.leftIconBorder} border-2 rounded-lg flex items-center justify-center bg-black ${colors.leftIconGlow} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black transition-all duration-300`}
              title="Share this website"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.leftIconText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            
            {/* Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-6 py-2 ${colors.border} border-2 ${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black transition-all duration-300 font-mono uppercase tracking-wider text-sm ${colors.buttonGlow} ${colors.buttonHoverGlow} rounded`}
            >
              MENU
            </button>
            
            {/* Shield Icon */}
            <button 
              onClick={handleSecurity}
              className={`h-10 w-10 ${colors.rightIcon2Border} border-2 rounded-lg flex items-center justify-center bg-black ${colors.rightIcon2Glow} ${theme === 'pink' ? 'hover:bg-purple-400' : theme === 'yellow' ? 'hover:bg-red-400' : theme === 'blue' ? 'hover:bg-purple-400' : theme === 'green' ? 'hover:bg-yellow-400' : 'hover:bg-orange-400'} hover:text-black transition-all duration-300`}
              title="Guardian of the Night - View Manifesto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon2Text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Fixed bottom menu */}
      <div className="fixed bottom-0 left-0 right-0 mb-2 z-30">
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
              <div className={`h-12 w-12 ${colors.leftIconBorder} border-2 rounded-full flex items-center justify-center bg-black ${colors.leftIconGlow}`}>
                <div className={`${colors.leftIconText} font-bold text-xs`}>
                  {leftIcon || leftIconText[theme]}
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {displayNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 lg:px-4 xl:px-6 py-3 ${colors.border} border ${
                    isActive(item.href) 
                      ? `text-black ${theme === 'pink' ? 'bg-pink-400' : theme === 'yellow' ? 'bg-yellow-400' : theme === 'blue' ? 'bg-blue-400' : theme === 'green' ? 'bg-green-400' : 'bg-purple-400'}` 
                      : `${colors.text} ${theme === 'pink' ? 'hover:bg-pink-400' : theme === 'yellow' ? 'hover:bg-yellow-400' : theme === 'blue' ? 'hover:bg-blue-400' : theme === 'green' ? 'hover:bg-green-400' : 'hover:bg-purple-400'} hover:text-black`
                  } transition-all duration-300 font-mono uppercase tracking-wider text-xs lg:text-sm ${colors.buttonGlow} ${colors.buttonHoverGlow}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Right Icons - Desktop only */}
            <div className="hidden md:flex items-center space-x-2">
              <a 
                href="/manifesto" 
                className={`h-12 w-12 ${colors.rightIcon1Border} border-2 bg-black flex items-center justify-center hover:bg-red-400 hover:text-black transition-all duration-300 ${colors.rightIcon1Glow} ${colors.rightIcon1HoverGlow}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon1Text} hover:text-black`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="/connect" 
                className={`h-12 w-12 ${colors.rightIcon2Border} border-2 bg-black flex items-center justify-center hover:bg-purple-400 hover:text-black transition-all duration-300 ${colors.rightIcon2Glow} ${colors.rightIcon2HoverGlow}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.rightIcon2Text} hover:text-black`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                </svg>
              </a>
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
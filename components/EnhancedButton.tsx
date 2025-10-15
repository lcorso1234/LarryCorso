'use client';

import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  ripple?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function EnhancedButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  ripple = true,
  disabled = false,
  type = 'button'
}: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const rippleId = useRef(0);
  const setElementRef = useCallback((node: HTMLButtonElement | HTMLAnchorElement | null) => {
    elementRef.current = node;
  }, []);

  const createRipple = (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    if (!ripple || !elementRef.current) {
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const clientX =
      'clientX' in event ? event.clientX : event.touches[0]?.clientX ?? rect.left;
    const clientY =
      'clientY' in event ? event.clientY : event.touches[0]?.clientY ?? rect.top;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: rippleId.current++
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handleInteraction = (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    createRipple(event);
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = `
    relative overflow-hidden touch-target mobile-touch glow-intense gpu-accelerated
    transition-all duration-300 font-mono uppercase tracking-wider text-sm
    border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400 hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] focus:ring-yellow-400',
    secondary: 'bg-transparent border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black hover:shadow-[0_0_30px_rgba(156,163,175,0.8)] focus:ring-gray-400',
    ghost: 'bg-transparent border-current hover:bg-current hover:text-black focus:ring-current'
  };

  const content = (
    <>
      {children}
      {ripple && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 150,
            top: ripple.y - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(0)',
            animation: 'ripple-animation 0.6s linear'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple-animation {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        ref={setElementRef}
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} inline-block px-12 py-6 text-center`}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={setElementRef}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} px-6 py-2`}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

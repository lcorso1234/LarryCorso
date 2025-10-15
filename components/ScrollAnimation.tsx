'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInDown';
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollAnimation({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  threshold = 0.1,
  className = ''
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      { threshold }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    fadeInUp: 'fade-in-up',
    fadeInLeft: 'fade-in-left', 
    fadeInRight: 'fade-in-right',
    scaleIn: 'scale-in',
    slideInDown: 'fade-in-up'
  };

  return (
    <div 
      ref={elementRef}
      className={`${animationClasses[animation]} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
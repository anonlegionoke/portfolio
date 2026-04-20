"use client";

import { House, PanelsTopLeft, ChartNoAxesGantt, Handshake, Tally1, ArrowUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function Navigation() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToSection = useCallback((elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed md:sticky md:top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 md:py-0 md:h-16">
        <div className="border border-white/30 flex items-center justify-between gap-2 md:gap-4 mx-auto rounded-full py-0.5 px-1 bg-black/70 md:bg-black/40 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow duration-300">
          <button
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors bg-white/20'
            onClick={() => scrollToSection('home-section')}
            aria-label="Home"
          >
            <House className='w-5 h-5 text-white' />
          </button>
          <Tally1 className="hidden md:block" />
          <button
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('projects-section')}
          >
            <PanelsTopLeft className='w-5 h-5 text-white' />
            <span className='ml-2 text-sm hidden md:inline text-white'>Projects</span>
          </button>
          <button
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('experience-section')}
          >
            <ChartNoAxesGantt className='w-5 h-5 text-white' />
            <span className='ml-2 text-sm hidden md:inline text-white'>Experience</span>
          </button>
          <button
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('connect-section')}
          >
            <Handshake className='w-5 h-5 text-white' />
            <span className='ml-2 text-sm hidden md:inline text-white'>Connect</span>
          </button>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          className="fixed bottom-8 right-4 sm:right-8 p-3 rounded-full bg-white/20 border border-white/20 shadow-lg cursor-pointer z-50 hover:scale-110 hover:bg-white/30 active:scale-90 transition-all duration-200"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </>
  );
}

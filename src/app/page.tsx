"use client";

import { House, PanelsTopLeft, ChartNoAxesGantt, Handshake, Tally1, ArrowUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Project = dynamic(() => import('./components/Project'));
const Connect = dynamic(() => import('./components/Connect'));
const Experience = dynamic(() => import('./components/Experience'));
const TechStack = dynamic(() => import('./components/TechStack'));

import TypewriterEffect from './components/TypewriterEffect';

export default function Home() {
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
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" />

      {/* Navbar */}
      <div className="fixed md:sticky md:top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 md:py-0 md:h-16">
        <div className="border border-white/30 flex items-center justify-between gap-2 md:gap-4 mx-auto rounded-full py-0.5 px-1 bg-black/70 md:bg-black/40 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow duration-300">
          <button
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors bg-white/20'
            onClick={() => scrollToSection('home-section')}
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

      {/* Hero */}
      <div id="home-section" className="flex justify-between items-center px-2 sm:px-4 md:px-10 mt-15 gap-5">
        <div className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            Hi, I&apos;m <TypewriterEffect
              text="Sabir"
              typingSpeed={150}
              startDelay={800}
            />
          </h1>
          <h4 className="text-xl font-bold mt-6 md:mt-8 text-white/90 drop-shadow-sm">About Me</h4>
          <p className="text-md text-white/80 leading-relaxed mt-2">I build scalable backend systems and real-time communication platforms that operate at production scale.</p>
          <p className="text-md text-white/80 leading-relaxed mt-3">My work includes architecting distributed SIP call routing systems, designing event-driven microservices with RabbitMQ and WebSockets, and delivering campaign platforms serving 1M+ contacts. I&apos;ve implemented sharded scheduling infrastructure, executed zero-downtime migrations across 15M+ Cassandra records, and reduced critical dashboard latency by 43%.</p>
          <p className="text-md text-white/80 leading-relaxed mt-3">I also build AI-driven products using LLM APIs and RAG pipelines, focusing on practical production use cases.</p>
          <div className="flex gap-4 mt-6 md:mt-8">
            <button
              className="bg-transparent text-white border border-white/50 cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/data/SabirResume.pdf';
                link.download = 'Sabir_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Resume
            </button>
            <button
              className="bg-white text-black cursor-pointer hover:bg-white/70 hover:scale-105 active:scale-95 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
              onClick={() => scrollToSection('connect-section')}
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      <div id="projects-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Project />
      </div>
      <div className="px-2 sm:px-4 md:px-10 my-10">
        <TechStack />
      </div>
      <div id="experience-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Experience />
      </div>
      <div id="connect-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Connect />
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          className="fixed bottom-8 right-4 sm:right-8 p-3 rounded-full bg-white/20 border border-white/20 shadow-lg cursor-pointer z-50 hover:scale-110 hover:bg-white/30 active:scale-90 transition-all duration-200"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Footer */}
      <div className="w-full pb-3 text-center text-white/70">
        <p className="text-sm">
          <span className="mr-1">{"\u00A9"}</span>{new Date().getFullYear()} • Thank you for visiting ❤️
        </p>
      </div>
    </main>
  );
}

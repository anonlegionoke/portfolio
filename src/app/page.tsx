"use client";

import { House, PanelsTopLeft, ChartNoAxesGantt, Handshake, Tally1, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Project from './components/Project';
import Connect from './components/Connect';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import PerformanceToggle from './components/PerformanceToggle';
import { usePerformance } from './context/PerformanceContext';
import TypewriterEffect from './components/TypewriterEffect';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { performanceMode } = usePerformance();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Just a sec...");
  
  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith("...")) return "Just a sec";
        if (prev.endsWith("..")) return "Just a sec...";
        if (prev.endsWith(".")) return "Just a sec..";
        return "Just a sec.";
      });
    }, 300);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);
  
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
          <div className="relative w-24 h-24 mb-8">
            <div className="w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div className="w-24 h-24 border-r-4 border-purple-500 border-solid rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '1.5s' }}></div>
            <div className="w-24 h-24 border-b-4 border-pink-500 border-solid rounded-full animate-spin absolute top-0 left-0" style={{ animationDuration: '2s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-white">{loadingText}</h2>
          <div className="flex space-x-2 mt-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      
      <div 
        className={`fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30`} 
      />
      
      <motion.div 
        className="fixed md:sticky md:top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 md:py-0 md:h-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: performanceMode === 'full' ? 0.5 : 0 }}
      >
        <motion.div 
          className="border border-white/30 flex items-center justify-between gap-2 md:gap-4 mx-auto
          rounded-full py-0.5 px-1 bg-black/70 md:bg-black/40 shadow-lg"
          whileHover={performanceMode === 'full' ? { boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" } : {}}
        >
          <button 
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors bg-white/20'
            onClick={() => scrollToSection('home-section')}
          >
            <House className='w-5 h-5 text-white'/>
          </button>
          <Tally1 className="hidden md:block" />
          <button 
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('projects-section')}
          >
            <PanelsTopLeft className='w-5 h-5 text-white'/>
            <span className='ml-2 text-sm hidden md:inline text-white'>Projects</span>
          </button>
          <button 
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('experience-section')}
          >
            <ChartNoAxesGantt className='w-5 h-5 text-white'/>
            <span className='ml-2 text-sm hidden md:inline text-white'>Experience</span>
          </button>
          <button 
            className='flex items-center py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => scrollToSection('connect-section')}
          >
            <Handshake className='w-5 h-5 text-white'/>
            <span className='ml-2 text-sm hidden md:inline text-white'>Connect</span>
          </button>
          <Tally1 className="hidden md:block text-white" />
          <PerformanceToggle />
        </motion.div>
      </motion.div>
      <div id="home-section" className="flex justify-between items-center px-2 sm:px-4 md:px-10 mt-15 gap-5">
        <motion.div 
          className={`${performanceMode === 'full' ? ' bg-white/10' : 'bg-black/20'} p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 w-full`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: performanceMode === 'full' ? 0.8 : 0 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            Hi, I&apos;m <TypewriterEffect 
              text="Sabir" 
              typingSpeed={150} 
              startDelay={800}
            />
          </h1>
          <h4 className="text-xl font-bold mt-6 md:mt-8 text-white/90 drop-shadow-sm">About Me</h4>
          <p className="text-md text-white/80 leading-relaxed">I&apos;m a software developer with a strong passion for building efficient, scalable, and user-friendly applications. With experience across both frontend and backend technologies, I enjoy crafting clean code and solving complex problems. My work spans from developing dynamic web interfaces to designing robust APIs and integrating third-party services. I&apos;m always eager to learn new tools and frameworks, and I thrive in collaborative and fast-paced environments.  
          </p>
          <div className="flex gap-4 mt-6 md:mt-8">
            <motion.button 
              className="bg-transparent text-white border border-white/50 cursor-pointer hover:bg-white/10 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
              whileHover={performanceMode === 'full' ? { scale: 1.05 } : {}}
              whileTap={performanceMode === 'full' ? { scale: 0.95 } : {}}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/data/SabirResume-05-25.pdf';
                link.download = 'Sabir_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Resume
            </motion.button>
            <motion.button 
              className="bg-white text-black cursor-pointer hover:bg-white/70 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
              whileHover={performanceMode === 'full' ? { scale: 1.05 } : {}}
              whileTap={performanceMode === 'full' ? { scale: 0.95 } : {}}
              onClick={() => scrollToSection('connect-section')}
            >
              Get in touch
            </motion.button>
          </div>
        </motion.div>
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
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-4 sm:right-8 p-3 rounded-full bg-white/20 border border-white/20 shadow-lg cursor-pointer z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={performanceMode === 'full' ? { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
            whileTap={performanceMode === 'full' ? { scale: 0.9 } : {}}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* footer */}
      <motion.div 
        className="w-full pb-3 text-center text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: performanceMode === 'full' ? 0.8 : 0.3 }}
      >
        <p className="text-sm">
          <span className="mr-1">{"\u00A9"}</span>{new Date().getFullYear()} • Thank you for visiting ❤️
        </p>
      </motion.div>
    </main>
  );
}

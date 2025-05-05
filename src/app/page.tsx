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
  
  const animationSettings = {
    enabled: performanceMode === 'full',
    blurIntensity: performanceMode === 'full' ? '100px' : '0px',
    blurOpacity: performanceMode === 'full' ? 1 : 0,
    animationDuration: performanceMode === 'full' ? { slow: 25, medium: 20, fast: 15 } : { slow: 0, medium: 0, fast: 0 }
  };
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div 
        className={`fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30`} 
        style={{ 
          backdropFilter: performanceMode === 'full' ? `blur(${animationSettings.blurIntensity})` : 'none',
          backgroundColor: performanceMode === 'light' ? 'rgba(30, 41, 59, 0.95)' : undefined
        }} 
      />
      
      {animationSettings.enabled && (
        <>
          <motion.div 
            className="fixed top-20 left-20 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl -z-10" 
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: animationSettings.animationDuration.medium,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="fixed bottom-20 right-20 w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-3xl -z-10" 
            animate={{ 
              x: [0, -20, 0], 
              y: [0, -20, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: animationSettings.animationDuration.fast,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="fixed top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-400/20 blur-3xl -z-10" 
            animate={{ 
              x: [0, 15, 0], 
              y: [0, -25, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: animationSettings.animationDuration.slow,
              ease: "easeInOut"
            }}
          />
        </>
      )}
      
      <motion.div 
        className="fixed md:sticky md:top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 md:py-0 md:h-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: performanceMode === 'full' ? 0.5 : 0.2 }}
      >
        <motion.div 
          className="border border-white/30 flex items-center justify-between gap-2 md:gap-4 mx-auto
          rounded-full py-0.5 px-1 bg-black/20 backdrop-blur-md shadow-lg"
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
          className={`${performanceMode === 'full' ? 'backdrop-blur-md bg-white/10' : 'bg-slate-800/90'} p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 w-full`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: performanceMode === 'full' ? 0.8 : 0.3 }}
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
                link.href = '/data/SabirResume-06-24.pdf';
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
        {/* <motion.div 
          className="relative backdrop-blur-sm bg-white/5 p-10 rounded-2xl shadow-xl border border-white/10 w-[30%]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageCarousel />
        </motion.div> */}
      </div>
      <div id="projects-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Project />
      </div>
      <div className="px-2 sm:px-4 md:px-10 my-10">
        {/* <AnimatedIconsFlow /> */}
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
            className="fixed bottom-8 right-4 sm:right-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer z-50"
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
    </main>
  );
}

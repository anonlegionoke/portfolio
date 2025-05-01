"use client";

import { House, PanelsTopLeft, ChartNoAxesGantt, Handshake, Tally1, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Carousal from './carousal/page';
import EnterAnimation from './carousal/enter-animation/EnterAnimation';
import ImageCarousel from './carousal/image-carousel/ImageCarousel';
export default function Home() {
  const [theme, setTheme] = useState('light');
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient with blur effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" style={{ backdropFilter: 'blur(100px)' }} />
      
      {/* Animated background circles with motion effects */}
      <motion.div 
        className="fixed top-20 left-20 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl -z-10" 
        animate={{ 
          x: [0, 30, 0], 
          y: [0, 15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 20,
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
          duration: 15,
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
          duration: 25,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="h-16 flex justify-center items-center backdrop-blur-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="border border-white/30 flex items-center justify-between gap-4 mx-auto
          rounded-full py-0.5 px-1 bg-black/10 backdrop-blur-md"
          whileHover={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
        >
          <button className='flex items-center py-2 px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors bg-white/20'>
            <House className='w-5 h-5'/>
          </button>
          <Tally1 />
          <button className='flex items-center py-2 px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'>
            <PanelsTopLeft className='w-5 h-5'/>
            <span className='ml-2 text-sm'>Projects</span>
          </button>
          <button className='flex items-center py-2 px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'>
            <ChartNoAxesGantt className='w-5 h-5'/>
            <span className='ml-2 text-sm'>Experience</span>
          </button>
          <button className='flex items-center py-2 px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors'>
            <Handshake className='w-5 h-5'/>
            <span className='ml-2 text-sm'>Connect</span>
          </button>
          <Tally1 />
          <button className='flex items-center py-2 px-3 -ml-6 rounded-full cursor-pointer hover:bg-white/10 transition-colors' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Sun className='w-5 h-5'/> : <Moon className='w-5 h-5'/>}
          </button>
        </motion.div>
      </motion.div>
      <div className="flex justify-between items-center p-20 mt-8">
        <motion.div 
          className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-bold text-white drop-shadow-md">Hi, I'm Sabir</h1>
          <h4 className="text-xl font-bold mt-8 text-white/90 drop-shadow-sm">About Me</h4>
          <p className="text-md text-white/80 leading-relaxed">I'm a software developer with a strong passion for building efficient, scalable, and user-friendly applications. With experience across both frontend and backend technologies, I enjoy crafting clean code and solving complex problems. My work spans from developing dynamic web interfaces to designing robust APIs and integrating third-party services. I'm always eager to learn new tools and frameworks, and I thrive in collaborative, fast-paced environments where innovation meets real-world impact.  
          </p>
          <div className="flex gap-4 mt-8">
            <motion.button 
              className="bg-white text-black cursor-pointer hover:bg-white/70 transition-all py-2 px-6 rounded-full font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.button>
            <motion.button 
              className="bg-transparent text-white border border-white/50 cursor-pointer hover:bg-white/10 transition-all py-2 px-6 rounded-full font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          className="relative backdrop-blur-sm bg-white/5 p-19 rounded-2xl shadow-xl border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageCarousel />
        </motion.div>
      </div>
    </main>
  );
}

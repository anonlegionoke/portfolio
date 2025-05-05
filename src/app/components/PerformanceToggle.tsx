"use client";

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { usePerformance } from '../context/PerformanceContext';

export default function PerformanceToggle() {
  const { performanceMode, togglePerformanceMode } = usePerformance();
  
  return (
    <motion.button
      className="flex items-center gap-2 py-2 px-3 md:px-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
      onClick={togglePerformanceMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={performanceMode === 'full' ? "Switch to light mode (better performance)" : "Switch to full mode (more visual effects)"}
    >
      <Zap className={`w-5 h-5 ${performanceMode === 'light' ? 'text-yellow-400' : 'text-white'}`} />
      <span className="ml-1 text-xs hidden md:inline">
        {performanceMode === 'full' ? 'Full' : 'Light'}
      </span>
    </motion.button>
  );
}

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type PerformanceMode = 'full' | 'light';

interface PerformanceContextType {
  performanceMode: PerformanceMode;
  togglePerformanceMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('full');
  
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
      setPerformanceMode('light');
    }
    
    const savedMode = localStorage.getItem('performanceMode');
    if (savedMode && (savedMode === 'full' || savedMode === 'light')) {
      setPerformanceMode(savedMode as PerformanceMode);
    }
  }, []);
  
  const togglePerformanceMode = () => {
    const newMode = performanceMode === 'full' ? 'light' : 'full';
    setPerformanceMode(newMode);
    localStorage.setItem('performanceMode', newMode);
  };
  
  return (
    <PerformanceContext.Provider value={{ performanceMode, togglePerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Using placeholder images with different colors instead of beach images
const placeholderImages = [
  'https://static.vecteezy.com/system/resources/previews/000/259/360/non_2x/vector-minimal-beach-landscape.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTciAYuz8mxO8V_0fH0iBl19S9e3rIMnvnucw&s',
  'https://img.freepik.com/premium-photo/minimal-summer-beach-landscape-with-copy-space-blue-sky-background-illustration-graphic-design_176697-1398.jpg',
  'https://i.redd.it/c6f8zkx8ef3b1.jpg',
  'https://img.pikbest.com/background/20220119/summer-beach-blue-minimalist-poster-background_6232150.jpg!bw700',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Start the carousel immediately and continue with automatic rotation
  useEffect(() => {
    // Start immediately
    const startImmediately = setTimeout(() => {
      setCurrentIndex(1); // Move to second image immediately after mount
    }, 100);
    
    // Continue with automatic rotation
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderImages.length);
    }, 3000);

    return () => {
      clearTimeout(startImmediately);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-[400px] h-[300px] overflow-hidden rounded-lg">
      {/* Blurred background */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          backgroundImage: `url(${placeholderImages[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
          transform: 'scale(1.1)',
          opacity: 0.7,
        }}
      />
      
      {/* Main carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative w-full h-full z-10 flex items-center justify-center"
        >
          <motion.img
            src={placeholderImages[currentIndex]}
            alt={`Scene ${currentIndex + 1}`}
            className="w-[90%] h-[90%] object-cover rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-20">
        {placeholderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

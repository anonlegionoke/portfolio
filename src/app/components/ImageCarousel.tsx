"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const placeholderImages = [
''
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const startImmediately = setTimeout(() => {
  //     setCurrentIndex(1); 
  //   }, 100);
    
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderImages.length);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(startImmediately);
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="relative h-[320px] overflow-hidden rounded-lg">
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

"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TechIcon {
  name: string;
  icon: string;
  color: string;
}

export default function AnimatedIconsFlow() {
  const techIcons: TechIcon[] = [
    { name: 'JavaScript', icon: '/icons/javascript.svg', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
    { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
    { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
    { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
    { name: 'Python', icon: '/icons/python.svg', color: '#3776AB' },
    { name: 'Java', icon: '/icons/java.svg', color: '#007396' },
    { name: 'HTML5', icon: '/icons/html5.svg', color: '#E34F26' },
    { name: 'CSS3', icon: '/icons/css3.svg', color: '#1572B6' },
    { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', color: '#06B6D4' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg', color: '#47A248' },
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#4169E1' },
    { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ED' },
    { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
    { name: 'AWS', icon: '/icons/aws.svg', color: '#232F3E' },
  ];

  const duplicatedIcons = [...techIcons, ...techIcons];

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    
    <motion.div 
      className="w-full overflow-hidden py-8 mt-16 backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
        <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
      <motion.h3 
        className="text-2xl font-bold text-white text-center mb-6 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Technologies I Work With
      </motion.h3>
      
      <div className="relative">
        <motion.div 
          className="flex space-x-16 py-4"
          // animate={{ x: ["0%", "-50%"] }}
          // transition={{ 
          //   x: {
          //     repeat: Infinity,
          //     repeatType: "loop",
          //     duration: 25,
          //     ease: "linear"
          //   }
          // }}
        >
          {duplicatedIcons.map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center"
              whileHover={{ y: -8, scale: 1.15 }}
              onHoverStart={() => setHoveredIcon(tech.name + index)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <motion.div 
                className="w-18 h-18 flex items-center justify-center rounded-full p-4 mb-2"
                style={{ 
                  backgroundColor: `${tech.color}20`,
                }}
                animate={{
                  boxShadow: hoveredIcon === tech.name + index 
                    ? [`0 0 15px ${tech.color}60`, `0 0 20px ${tech.color}40`, `0 0 25px ${tech.color}20`] 
                    : '0 0 0px transparent',
                  scale: hoveredIcon === tech.name + index ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  boxShadow: { duration: 0.3 },
                  scale: { repeat: hoveredIcon === tech.name + index ? Infinity : 0, duration: 1.5 }
                }}
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-10 h-10 object-contain" 
                />
              </motion.div>
              <motion.span 
                className="text-xs text-white"
                animate={{
                  opacity: hoveredIcon === tech.name + index ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TechIcon {
  name: string;
  icon: string;
  color: string;
}

export default function TechStack() {
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
    <div className="w-full overflow-hidden py-12 mt-16 backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl border border-white/10">
      <h3 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-md">Tech Stack</h3>
      
      <div className="relative">
        {/* First row - moving right */}
        <motion.div 
          className="flex space-x-12 mb-8"
          animate={{ x: ["-10%", "-60%"] }}
          // transition={{ 
          //   x: {
          //     repeat: Infinity,
          //     repeatType: "loop",
          //     duration: 40,
          //     ease: "linear"
          //   }
          // }}
        >
          {duplicatedIcons.map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center w-20"
              whileHover={{ y: -5, scale: 1.1 }}
              onHoverStart={() => setHoveredIcon(tech.name + index)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl p-2 mb-2"
                style={{ 
                  backgroundColor: `${tech.color}20`,
                  boxShadow: hoveredIcon === tech.name + index ? `0 0 15px ${tech.color}80` : 'none',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <span className="text-xs text-white/70">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Second row - moving left */}
        <motion.div 
          className="flex space-x-12"
          animate={{ x: ["-60%", "-10%"] }}
          // transition={{ 
          //   x: {
          //     repeat: Infinity,
          //     repeatType: "loop",
          //     duration: 40,
          //     ease: "linear"
          //   }
          // }}
        >
          {duplicatedIcons.slice().reverse().map((tech, index) => (
            <motion.div 
              key={`reverse-${tech.name}-${index}`}
              className="flex flex-col items-center justify-center w-20"
              whileHover={{ y: -5, scale: 1.1 }}
              onHoverStart={() => setHoveredIcon(`reverse-${tech.name}-${index}`)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-xl p-2 mb-2"
                style={{ 
                  backgroundColor: `${tech.color}20`,
                  boxShadow: hoveredIcon === `reverse-${tech.name}-${index}` ? `0 0 15px ${tech.color}80` : 'none',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <span className="text-xs text-white/70">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

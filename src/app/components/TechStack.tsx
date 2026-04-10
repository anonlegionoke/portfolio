"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePerformance } from '../context/PerformanceContext';
import Image from 'next/image';

interface TechIcon {
  name: string;
  icon: string;
  color: string;
}

const techIcons: TechIcon[] = [
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', color: '#F7DF1E' },
  { name: 'Python', icon: '/icons/python.svg', color: '#fac808' },
  { name: 'Rust', icon: '/icons/rust.svg', color: '#CE422B' },
  { name: 'C++', icon: '/icons/c++.svg', color: '#007396' },
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'NestJS', icon: '/icons/nestjs.svg', color: '#ea2845' },
  { name: 'Cassandra', icon: '/icons/cassandra.svg', color: '#2496ED' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#4169E1' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg', color: '#47A248' },
  { name: 'RabbitMQ', icon: '/icons/rabbitmq.svg', color: '#FF6600' },
  { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ED' },
  { name: 'Nginx', icon: '/icons/nginx.svg', color: '#019639' },
  { name: 'AWS', icon: '/icons/aws.svg', color: '#232F3E' },
  { name: 'Tailwind', icon: '/icons/tailwindcss.svg', color: '#06B6D4' },
  { name: 'Material UI', icon: '/icons/material-ui.svg', color: '#2496ED' },
  { name: 'Redux', icon: '/icons/redux.svg', color: '#764abc' },
  { name: 'Prisma', icon: '/icons/prisma.svg', color: '#0c344b' },
  { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
  { name: 'Postman', icon: '/icons/postman.svg', color: '#ff6c37' },
  { name: 'Linux', icon: '/icons/linux.svg', color: '#FFFFFF' },
  { name: 'Figma', icon: '/icons/figma.svg', color: '#1abcfe' },
  { name: 'HTML5', icon: '/icons/html5.svg', color: '#E34F26' },
  { name: 'CSS3', icon: '/icons/css3.svg', color: '#1572B6' },
];

export default function TechStack() {
  const { performanceMode } = usePerformance();

  const displayIcons = performanceMode === 'light'
    ? techIcons.slice(0, 15)
    : techIcons;

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const animationDuration = 15;
  const hoverEffects = performanceMode === 'full';

  const animations = {
    ...(hoverEffects && {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, delay: 0.3 },
      divAnimate1: { x: ["0%", "-50%"] },
      divTransition1: {
        x: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: animationDuration,
          ease: "linear"
        }
      },
      divAnimate2: { x: ["-50%", "0%"] },
      divTransition2: {
        x: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: animationDuration,
          ease: "linear"
        }
      }
    })
  }

  return (
    <div className={`w-full overflow-hidden ${performanceMode === 'full' ? 'py-10' : 'pt-10'} ${performanceMode === 'full' ? 'bg-white/5' : 'bg-black/20'} rounded-2xl shadow-xl border border-white/10`}>
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 drop-shadow-md"
        initial={hoverEffects ? animations.initial : { opacity: 1 }}
        animate={animations.animate}
        transition={animations.transition}
      >
        Technologies I Work With
      </motion.h2>

      {hoverEffects ? (
        <div className="relative w-1/2">
          {/* First row - moving right */}
          <motion.div
            className="flex space-x-12 mb-8"
            animate={animations.divAnimate1}
            transition={animations.divTransition1}
          >
            {displayIcons.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center w-20"
                whileHover={hoverEffects ? { y: -5, scale: 1.1 } : {}}
                onHoverStart={() => hoverEffects && setHoveredIcon(tech.name + index)}
                onHoverEnd={() => hoverEffects && setHoveredIcon(null)}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl p-2 mb-2"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    boxShadow: hoverEffects && hoveredIcon === tech.name + index ? `0 0 15px ${tech.color}80` : 'none',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={30}
                    height={30}
                    className="object-contain"
                    priority={index < 6}
                  />
                </div>
                <span className="text-white/70 text-center text-nowrap" style={{ fontSize: '11px' }}>{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - moving left */}
          <motion.div
            className="flex space-x-12"
            animate={animations.divAnimate2}
            transition={animations.divTransition2}
          >
            {displayIcons.slice().reverse().map((tech, index) => (
              <motion.div
                key={`reverse-${tech.name}-${index}`}
                className="flex flex-col items-center justify-center w-20"
                whileHover={hoverEffects ? { y: -5, scale: 1.1 } : {}}
                onHoverStart={() => hoverEffects && setHoveredIcon(`reverse-${tech.name}-${index}`)}
                onHoverEnd={() => hoverEffects && setHoveredIcon(null)}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl p-2 mb-2"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    boxShadow: hoverEffects && hoveredIcon === `reverse-${tech.name}-${index}` ? `0 0 15px ${tech.color}80` : 'none',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={30}
                    height={30}
                    className="object-contain"
                    priority={index < 6}
                  />
                </div>
                <span className="text-white/70 text-center text-nowrap" style={{ fontSize: '11px' }}>{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-4 lg:grid-cols-10 gap-4 lg:gap-8 max-h-84 p-4 rounded-xl"
          >
            {techIcons.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl p-2 mb-2"
                  style={{ backgroundColor: `${tech.color}20` }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={25}
                    height={25}
                    className="object-contain"
                    priority={index < 6}
                  />
                </div>
                <span className="text-xs text-white/70">{tech.name}</span>
              </div>
            ))}
          </div>
          {/* Elegant fade-out overlay with text */}
          <div
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-20 flex items-end justify-center"
            style={{
              background: 'linear-gradient(to top, rgba(30,30,40,0.55) 60%, transparent 100%)',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              zIndex: 10,
            }}
          >
            <span className="text-gray-400 text-xs font-light mb-4 drop-shadow tracking-wide" style={{ letterSpacing: '0.05em' }}>
              and more...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

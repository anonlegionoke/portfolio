"use client";

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

const reversedIcons = [...techIcons].reverse();

const TechItem = ({ tech, priority }: { tech: TechIcon; priority: boolean }) => (
  <div
    className="tech-item flex flex-col items-center justify-center w-20 shrink-0"
    style={{ '--glow-color': `${tech.color}80` } as React.CSSProperties}
  >
    <div
      className="tech-icon-box w-14 h-14 flex items-center justify-center rounded-xl p-2 mb-2"
      style={{ backgroundColor: `${tech.color}20` }}
    >
      <Image
        src={tech.icon}
        alt={tech.name}
        width={30}
        height={30}
        className="object-contain"
        priority={priority}
      />
    </div>
    <span className="text-white/70 text-center text-nowrap" style={{ fontSize: '11px' }}>{tech.name}</span>
  </div>
);

export default function TechStack() {
  return (
    <div className="w-full overflow-hidden py-10 bg-white/5 rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 drop-shadow-md animate-fade-in">
        Technologies I Work With
      </h2>

      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-track-right {
          animation: scroll-right 50s linear infinite;
        }
        .scroll-track-left {
          animation: scroll-left 50s linear infinite;
        }
        .scroll-track-right:hover,
        .scroll-track-left:hover {
          animation-play-state: paused;
        }
        .tech-item {
          transition: transform 0.2s ease;
        }
        .tech-item:hover {
          transform: translateY(-5px) scale(1.1);
        }
        .tech-item:hover .tech-icon-box {
          box-shadow: 0 0 15px var(--glow-color);
        }
      `}</style>

      <div className="relative w-full">
        {/* Row 1 — scrolls right */}
        <div className="flex scroll-track-right mb-8" style={{ width: 'max-content' }}>
          {[...techIcons, ...techIcons].map((tech, i) => (
            <div key={`r1-${i}`} className="mx-6">
              <TechItem tech={tech} priority={i < 6} />
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls left */}
        <div className="flex scroll-track-left" style={{ width: 'max-content' }}>
          {[...reversedIcons, ...reversedIcons].map((tech, i) => (
            <div key={`r2-${i}`} className="mx-6">
              <TechItem tech={tech} priority={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

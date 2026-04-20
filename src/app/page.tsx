import dynamic from 'next/dynamic';
import TypewriterEffect from './components/TypewriterEffect';
import Navigation from './components/Navigation';
import HeroButtons from './components/HeroButtons';

const Project = dynamic(() => import('./components/Project'));
const Connect = dynamic(() => import('./components/Connect'));
const Experience = dynamic(() => import('./components/Experience'));
const TechStack = dynamic(() => import('./components/TechStack'));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" />

      <Navigation />

      {/* Hero */}
      <div id="home-section" className="flex justify-between items-center px-2 sm:px-4 md:px-10 mt-15 gap-5">
        <div className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            Hi, I&apos;m <TypewriterEffect
              text="Sabir"
              typingSpeed={150}
              startDelay={800}
            />
          </h1>
          <h4 className="text-xl font-bold mt-6 md:mt-8 text-white/90 drop-shadow-sm">About Me</h4>
          <p className="text-md text-white/80 leading-relaxed mt-2">I build scalable backend systems and real-time communication platforms that operate at production scale.</p>
          <p className="text-md text-white/80 leading-relaxed mt-3">My work includes architecting distributed SIP call routing systems, designing event-driven microservices with RabbitMQ and WebSockets, and delivering campaign platforms serving 1M+ contacts. I&apos;ve implemented sharded scheduling infrastructure, executed zero-downtime migrations across 15M+ Cassandra records, and reduced critical dashboard latency by 43%.</p>
          <p className="text-md text-white/80 leading-relaxed mt-3">I also build AI-driven products using LLM APIs and RAG pipelines, focusing on practical production use cases.</p>
          <HeroButtons />
        </div>
      </div>

      <div id="projects-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Project />
      </div>
      <div className="px-2 sm:px-4 md:px-10 my-10">
        <TechStack />
      </div>
      <div id="experience-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Experience />
      </div>
      <div id="connect-section" className="px-2 sm:px-4 md:px-10 my-10">
        <Connect />
      </div>

      {/* Footer */}
      <div className="w-full pb-3 text-center text-white/70">
        <p className="text-sm">
          <span className="mr-1">{"\u00A9"}</span>{new Date().getFullYear()} • Thank you for visiting ❤️
        </p>
      </div>
    </main>
  );
}

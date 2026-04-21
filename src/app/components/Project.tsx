"use client";

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { Github, SquareArrowOutUpRight, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

interface ProjectData {
  id: number
  name: string
  description: string
  screenshot: string
  liveLink?: string
  githubLink?: string
  techStack: string[]
}

const projects: ProjectData[] = [
  {
    id: 1,
    name: "Angle | AI Animation Studio",
    description: "A full-stack AI application that generates 3Blue1Brown-style math animations from natural language prompts, with a browser-based video editor for trimming, multi-track audio mixing, and MP4 export.",
    screenshot: "/screenshots/angle-video-maker3.png",
    liveLink: "https://angle-alpha.vercel.app/",
    githubLink: "https://github.com/anonlegionoke/angle",
    techStack: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS", "FFmpeg", "Manim", "Supabase", "GitHub Actions"]
  },
  {
    id: 2,
    name: "AskVerse",
    description: "An AI chat application with 3 modes — quick chat (stateless), memory chat (context-aware), and document Q&A (PDF/JSON upload) — using RAG with LangChain for document chunking, embedding, and similarity search.",
    screenshot: "/screenshots/ai-rag-chat-1.png",
    liveLink: "https://chat-with-ai-rag.vercel.app/",
    githubLink: "https://github.com/anonlegionoke/Chat-with-AI-RAG",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "LangChain", "Gemini"]
  },
  {
    id: 3,
    name: "Crypto Gate",
    description: "A crypto payment gateway enabling merchants to accept any SPL token with automatic USDC conversion via Jupiter aggregator on Solana, featuring real-time payment detection and a merchant dashboard.",
    screenshot: "/screenshots/crypto-gate.png",
    liveLink: "https://crypto-pay-gateway-delta.vercel.app/",
    githubLink: "https://github.com/anonlegionoke/crypto-pay-gateway",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Jupiter", "Solana", "PostgreSQL", "Prisma", "Docker"]
  },
  {
    id: 4,
    name: "Force Top Bar",
    description: "Keep the top bar visible even in fullscreen mode. Useful for keeping track of the time and system status while using immersive apps or watching videos.",
    screenshot: "/screenshots/gnome-extension.png",
    liveLink: "https://extensions.gnome.org/extension/9187/force-top-bar",
    githubLink: "https://github.com/anonlegionoke/force-topbar",
    techStack: ["JavaScript", "GNOME Shell"]
  },
  {
    id: 5,
    name: "StackBlog",
    description: "A React-based blog app powered by Appwrite, featuring rich text editing, image uploads, post management, and user authentication with synced access across devices.",
    screenshot: "/screenshots/blog-app.png",
    liveLink: undefined,
    githubLink: "https://github.com/anonlegionoke/react/tree/main/11blogapp",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Appwrite", "TinyMCE"]
  },
  {
    id: 6,
    name: "Reviewboxd",
    description: "A movie review app using the TMDb API, allowing users to browse movies, search titles, read and contribute reviews with full create, update, and delete support.",
    screenshot: "/screenshots/movie-review-app.png",
    liveLink: undefined,
    githubLink: "https://github.com/anonlegionoke/Blockbuster-Review-App",
    techStack: ["JavaScript", "HTML", "CSS", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 7,
    name: "Todo Lister",
    description: "Console Todo App in C++ that generates a random ID for each task, allowing users to add and mark tasks as completed.",
    screenshot: "/screenshots/todo-lister.png",
    liveLink: undefined,
    githubLink: "https://github.com/anonlegionoke/Console-Todo",
    techStack: ["C++"]
  },
  {
    id: 8,
    name: "Blockbuster | The Movie Store",
    description: "Landing page for the Blockbuster Movie Store website if they were still around today.",
    screenshot: "/screenshots/blockbuster.png",
    liveLink: "https://blockbuster-store.vercel.app",
    githubLink: "https://github.com/anonlegionoke/Blockbuster",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 9,
    name: "Greeting on Panel",
    description: "A simple and efficient extension to display greetings based on time of the day on the GNOME desktop environment top panel.",
    screenshot: "/screenshots/gnome-extension.png",
    liveLink: undefined,
    githubLink: "https://github.com/anonlegionoke/greetings-on-panel",
    techStack: ["JavaScript", "GNOME Shell"]
  },
  {
    id: 10,
    name: "Loop Texts on Panel",
    description: "A customizable GNOME extension that displays any text—such as reminders or quick notes—on the top panel, with support for looping messages for continuous visibility.",
    screenshot: "/screenshots/gnome-extension.png",
    liveLink: undefined,
    githubLink: "https://github.com/anonlegionoke/loop-texts-on-panel",
    techStack: ["JavaScript", "GNOME Shell"]
  }
];

/* ──────────────────────────────────────────────
   Show More / Show Less controls (shared)
   ────────────────────────────────────────────── */

const ShowMoreOverlay = ({ onClick }: { onClick: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent flex items-end justify-center pb-6 z-10 pointer-events-none"
    >
      <button
        onClick={onClick}
        className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium transition-all flex items-center gap-2 group cursor-pointer shadow-lg pointer-events-auto"
      >
        Show More <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  </AnimatePresence>
);

const ShowLessButton = ({ onClick }: { onClick: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center mt-8 pb-4"
    >
      <button
        onClick={onClick}
        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium transition-all flex items-center gap-2 group cursor-pointer"
      >
        Show Less <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  </AnimatePresence>
);

const handleShowLess = (setIsExpanded: (v: boolean) => void) => {
  document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => setIsExpanded(false), 500);
};

/* ──────────────────────────────────────────────
   Mobile: Compact horizontal cards (no Framer)
   ────────────────────────────────────────────── */

const MobileCards = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? "auto" : 520 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-b-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex gap-4 p-4 bg-black/30 rounded-2xl border border-white/10 hover:border-white/25 transition-colors duration-200 group"
          >
            {/* Screenshot */}
            <div className="relative w-[120px] sm:w-[160px] min-w-[120px] sm:min-w-[160px] aspect-[4/3] overflow-hidden rounded-xl bg-gray-800/50 border border-white/5">
              {project.screenshot ? (
                <Image
                  src={project.screenshot}
                  alt={project.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white/30 text-xs">Screenshot</div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between min-w-0 flex-1 py-1">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1 truncate">{project.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{project.description}</p>
              </div>
              <div className="flex gap-4 mt-2">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/60 flex items-center gap-1 text-xs transition-colors">
                    <SquareArrowOutUpRight size={11} /> Live
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/60 flex items-center gap-1 text-xs transition-colors">
                    <Github size={11} /> Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && projects.length > 4 && (
        <ShowMoreOverlay onClick={() => setIsExpanded(true)} />
      )}
      {isExpanded && projects.length > 4 && (
        <ShowLessButton onClick={() => handleShowLess(setIsExpanded)} />
      )}
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Desktop: 3-column masonry with full details
   ────────────────────────────────────────────── */

const DesktopMasonry = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const update = () => {
      setColumns(window.innerWidth >= 1200 ? 3 : 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columnWrappers = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [] as ProjectData[]);
    projects.forEach((p, i) => cols[i % columns].push(p));
    return cols;
  }, [columns]);

  return (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? "auto" : 800 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-b-xl"
    >
      <div className="flex w-full items-start gap-6">
        {columnWrappers.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6 flex-1 min-w-0">
            {col.map((project) => (
              <div
                key={project.id}
                className="relative flex flex-col p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-200 group"
              >
                {/* Screenshot */}
                <div className="relative w-full aspect-video mb-5 overflow-hidden rounded-xl bg-gray-800/50 border border-white/5">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-white/30">Screenshot</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e2e8f0] transition-colors">{project.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/10">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/70 flex items-center gap-1 text-sm transition-colors">
                          <SquareArrowOutUpRight size={14} /> Live
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/70 flex items-center gap-1 text-sm transition-colors">
                          <Github size={14} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {!isExpanded && projects.length > 4 && (
        <ShowMoreOverlay onClick={() => setIsExpanded(true)} />
      )}
      {isExpanded && projects.length > 4 && (
        <ShowLessButton onClick={() => handleShowLess(setIsExpanded)} />
      )}
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Main wrapper
   ────────────────────────────────────────────── */

const Project = () => (
  <div className="w-full py-8 sm:py-12 mt-12 sm:mt-16 bg-black/20 rounded-[2rem] border border-white/10 shadow-2xl px-4 sm:px-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-10 drop-shadow-md">
      Projects
    </h2>

    {/* Mobile + Tablet: horizontal cards */}
    <div className="block lg:hidden">
      <MobileCards />
    </div>

    {/* Desktop: full masonry with tech stack */}
    <div className="hidden lg:block">
      <DesktopMasonry />
    </div>
  </div>
);

export default Project;

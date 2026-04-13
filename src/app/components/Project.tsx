import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ArrowLeft, ArrowRight, Github, SquareArrowOutUpRight, ChevronDown, ChevronUp } from "lucide-react"
import { usePerformance } from "../context/PerformanceContext"
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
    description: "A full-stack AI application that generates 3Blue1Brown-style math animations from natural language prompts, with a browser-based video editor for trimming, multi-track audio mixing, and MP4 export. Rendering is automated through GitHub Actions pipelines with Supabase for storage and real-time delivery.",
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
    description: "A crypto payment gateway enabling merchants to accept any SPL token with automatic USDC conversion via Jupiter aggregator on Solana, featuring real-time payment detection and a merchant dashboard for balance monitoring, transaction history, and settlement tracking.",
    screenshot: "/screenshots/crypto-gate.png",
    liveLink: undefined,
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

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { performanceMode } = usePerformance();

  const currentProject = useMemo(() => projects[currentIndex], [currentIndex]);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 10000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 10) {
      if (info.offset.x > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    pauseTemporarily();
  }, [pauseTemporarily]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    pauseTemporarily();
  }, [pauseTemporarily]);

  const slideVariants = useMemo(() => ({
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    })
  }), []);

  useEffect(() => {
    if (isPaused || performanceMode === 'light') return;

    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, performanceMode]);

  const fullVersion = performanceMode === 'full';

  const animations = {
    ...(fullVersion && {
      slideVariants,
      transition: {
        x: {
          type: "linear",
          ease: "easeOut",
          duration: 0.4
        },
        opacity: { duration: 0.2 }
      },
      dragTransition: { bounceStiffness: 100, bounceDamping: 5 },
      dragElastic: 1,
      dragConstraints: { left: 0, right: 0 },
      initial: "enter",
      animate: "center",
      exit: "exit",
    })
  };

  const projectContent = (
    <motion.div
      key={currentProject.id}
      custom={direction}
      variants={animations.slideVariants}
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={animations.transition}
      className="flex flex-col md:flex-row gap-8 p-6 bg-black/20 rounded-xl border border-white/10 absolute top-0 left-0 right-0 w-full"
      drag={performanceMode === 'full' ? 'x' : undefined}
      dragConstraints={animations.dragConstraints}
      dragElastic={animations.dragElastic}
      dragTransition={animations.dragTransition}
      onDragEnd={handleDragEnd}
    >
      {/* Screenshot Area */}
      <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg border border-white/10">
        <div className="w-full h-[200px] md:h-[300px] lg:h-[300px] bg-gray-800 flex items-center justify-center">
          {currentProject.screenshot ? (
            <Image
              src={currentProject.screenshot}
              alt={`${currentProject.name} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain md:object-cover lg:object-cover"
              priority={currentIndex === 0}
            />
          ) : (
            <div className="text-white/50">Screenshot</div>
          )}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
          <h3 className="text-xl font-bold drop-shadow-lg">{currentProject.name}</h3>
        </div>
      </div>

      {/* Project Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{currentProject.name}</h3>
            <p className="text-white/80">{currentProject.description}</p>
            <br />
            <div className="flex gap-4">
              {currentProject.liveLink && (
                <a href={currentProject.liveLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-xs flex items-center gap-1 border border-white/10 rounded-xl p-1 text-white"><SquareArrowOutUpRight size={12} />Live</a>
              )}
              <a href={currentProject.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-xs flex items-center gap-1 border border-white/10 rounded-xl p-1 text-white"><Github size={12} />Source Code</a>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-[750px] md:h-[550px] w-full mt-4">
      <div className="relative px-2 sm:px-4 md:px-20 h-1/3 w-full">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 sm:left-2 md:left-6 top-[250px] sm:top-full transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Previous project"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 sm:right-2 md:right-6 top-[250px] sm:top-full transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Next project"
        >
          <ArrowRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Project Card with Sliding Animation */}
        <div ref={containerRef} className="relative w-full h-[650px] md:h-[500px] overflow-hidden">
          {fullVersion ? (
            <AnimatePresence initial={false} custom={direction}>
              {projectContent}
            </AnimatePresence>
          ) : (
            <>
              {projectContent}
            </>
          )}
        </div>
      </div>
      {/* Pagination Indicators */}
      <div className="flex justify-center mt-110 md:mt-60 gap-2 relative z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              pauseTemporarily();
            }}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/30"
              }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const ProjectMasonry = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { performanceMode } = usePerformance();

  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1200) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columnWrappers = useMemo(() => {
    const wrappers = Array.from({ length: columns }, () => [] as ProjectData[]);
    projects.forEach((project, index) => {
      wrappers[index % columns].push(project);
    });
    return wrappers;
  }, [columns]);

  return (
    <div className={`relative transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-[5000px]' : 'max-h-[600px] sm:max-h-[800px] overflow-hidden rounded-b-xl'}`}>
      {/* True Masonry Container - JS Column Splitter Strategy */}
      <div className="flex w-full items-start gap-6">
        {columnWrappers.map((columnProjects, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6 flex-1 min-w-0">
            {columnProjects.map((project) => {
              const globalIndex = projects.indexOf(project);
              return (
                <motion.div
                  key={project.id}
                  className="relative flex flex-col h-auto p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-300 group"
                  initial={performanceMode === 'full' ? { opacity: 0, y: 30 } : false}
                  whileInView={performanceMode === 'full' ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (globalIndex % columns) * 0.1 }}
                >
                  {/* Screenshot Area */}
                  <div className="relative w-full aspect-video mb-5 overflow-hidden rounded-xl bg-gray-800/50 border border-white/5">
                    {project.screenshot ? (
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-white/30">
                        Screenshot
                      </div>
                    )}
                    {/* Overlay Gradient for visual depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e2e8f0] transition-colors">{project.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/80"
                          >
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
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gradient Overlay & Show More Button */}
      {!isExpanded && projects.length > 4 && (
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent flex items-end justify-center pb-8 z-10">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-full text-md font-medium transition-all flex items-center gap-2 group cursor-pointer"
          >
            Show More <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Show Less Button */}
      {isExpanded && projects.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(false)}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium transition-all flex items-center gap-2 group cursor-pointer"
          >
            Show Less <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}

const Project = () => {
  return (
    <motion.div
      className="w-full py-8 sm:py-12 mt-12 sm:mt-16 bg-black/20 rounded-[2rem] border border-white/10 shadow-2xl px-4 sm:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 sm:mb-12 drop-shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Projects
      </motion.h2>

      <div className="block lg:hidden w-full overflow-hidden">
        <ProjectCarousel />
      </div>

      <div className="hidden lg:block w-full">
        <ProjectMasonry />
      </div>
    </motion.div>
  );
};

export default Project;

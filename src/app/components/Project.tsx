import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { ArrowLeft, ArrowRight, Github, SquareArrowOutUpRight } from "lucide-react"
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

const Project = () => {
  const projects: ProjectData[] = [
    {
      id: 1,
      name: "Angle",
      description: "Angle is an AI-powered animation studio that turns your descriptions into beautiful, professional animations. ",
      screenshot: "/screenshots/angle-video-maker3.png",
      liveLink: "https://angle-alpha.vercel.app/",
      githubLink: "https://github.com/anonlegionoke/angle",
      techStack: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS", "Framer", "FFmpeg", "Manim", "Gemini"]
    },
    {
      id: 2,
      name: "Chat with AI-RAG",
      description: "A modern, interactive chat application built with Next.js that demonstrates various AI conversation modes including Retrieval-Augmented Generation (RAG) capabilities.",
      screenshot: "/screenshots/ai-rag-chat-1.png",
      liveLink: "https://chat-with-ai-rag.vercel.app/",
      githubLink: "https://github.com/anonlegionoke/Chat-with-AI-RAG",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "LangChain", "Gemini"]
    },
    {
      id: 3,
      name: "Crypto Gate",
      description: "A secure Solana-based crypto payment gateway where merchants can accept any token and settle in USDC via Jupiter swap integration.",
      screenshot: "/screenshots/crypto-gate.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/crypto-pay-gateway",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Jupiter", "Solana", "PostgreSQL", "Prisma", "JWT"]
    },
    {
      id: 4,
      name: "Blog App",
      description: "A React-based blog app powered by Appwrite, featuring rich text editing, image uploads, post management, and user authentication with synced access across devices.",
      screenshot: "/screenshots/blog-app.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/react/tree/main/11blogapp",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Appwrite", "TinyMCE", ]
    },
    {
      id: 5,
      name: "Movie Review App",
      description: "A movie review app using the TMDb API, allowing users to browse movies, search titles, read and contribute reviews with full create, update, and delete support.",
      screenshot: "/screenshots/movie-review-app.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/Blockbuster-Review-App",
      techStack: ["JavaScript", "HTML", "CSS", "Node.js", "Express", "MongoDB"] 
    },
    {
      id: 6,
      name: "Todo Lister",
      description: "Console Todo App in C++ that generates a random ID for each task, allowing users to add and mark tasks as completed.",
      screenshot: "/screenshots/todo-lister.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/Console-Todo",
      techStack: ["C++"]
    },
    {
      id: 7,
      name: "Blockbuster | The Movie Store",
      description: "Landing page for the Blockbuster Movie Store website if they were still around today.",
      screenshot: "/screenshots/blockbuster.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/Blockbuster",
      techStack: ["HTML", "CSS", "JavaScript"] 
    },
    {
      id: 8,
      name: "Greeting on Panel",
      description: "A simple and efficient extension to display greetings based on time of the day on the GNOME desktop environment top panel.",
      screenshot: "/screenshots/gnome-extension.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/greetings-on-panel",
      techStack: ["JavaScript", "Gnome-Shell"]
    },
    {
      id: 9,
      name: "Loop Texts on Panel",
      description: "A customizable GNOME extension that displays any text—such as reminders or quick notes—on the top panel, with support for looping messages for continuous visibility.",
      screenshot: "/screenshots/gnome-extension.png",
      liveLink: undefined,
      githubLink: "https://github.com/anonlegionoke/loop-texts-on-panel",
      techStack: ["JavaScript", "Gnome-Shell"]
    } 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { performanceMode } = usePerformance();

  const currentProject = useMemo(() => projects[currentIndex], [currentIndex]);

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
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [projects.length]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [projects.length]);

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
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isPaused, performanceMode, projects.length]);

  const fullVersion = performanceMode === 'full';

  const animations = {
    ...(fullVersion && {
      slideVariants,
      transition: {
        x: {
          type: "tween",
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
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
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <h3 className="text-xl font-bold">{currentProject.name}</h3>
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
  )

  return (
    <motion.div 
      className={`w-full overflow-hidden py-6 sm:py-8 mt-12 sm:mt-16 'bg-black/20' ${performanceMode === 'full' && 'backdrop-blur-sm'} rounded-2xl shadow-xl border border-white/10 h-[800px] md:h-[550px]`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Projects
      </motion.h2>

      <div className="relative px-2 sm:px-4 md:px-20 h-1/3">
        {/* Navigation Buttons */}
        <button 
          onClick={goToPrevious} 
          className="absolute left-0 sm:left-2 md:left-6 top-full transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Previous project"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <button 
          onClick={goToNext} 
          className="absolute right-0 sm:right-2 md:right-6 top-full transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Next project"
        >
          <ArrowRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Project Card with Sliding Animation */}
        <div ref={containerRef} className="relative">
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
      <div className="flex justify-center mt-110 md:mt-60 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
              }}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/30"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
    </motion.div>
  )
}

export default Project

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"

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
      name: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Framer Motion for smooth animations and transitions.",
      screenshot: "https://static.vecteezy.com/system/resources/previews/000/259/360/non_2x/vector-minimal-beach-landscape.jpg",
      liveLink: "https://portfolio.example.com",
      githubLink: "https://github.com/username/portfolio",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      id: 2,
      name: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, cart functionality, and payment integration.",
      screenshot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTciAYuz8mxO8V_0fH0iBl19S9e3rIMnvnucw&s",
      liveLink: "https://ecommerce.example.com",
      githubLink: "https://github.com/username/ecommerce",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe API"]
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts and interactive visualizations.",
      screenshot: "https://i.redd.it/c6f8zkx8ef3b1.jpg",
      liveLink: "https://weather.example.com",
      githubLink: "https://github.com/username/weather-app",
      techStack: ["JavaScript", "React", "OpenWeather API", "Chart.js", "CSS3"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

//   useEffect(() => {
//     if (isPaused) return;
    
//     const interval = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prevIndex) => 
//         prevIndex === projects.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 8000);
    
//     return () => clearInterval(interval);
//   }, [currentIndex, isPaused, projects.length]);

  const currentProject = projects[currentIndex];

  const slideVariants = {
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
  };

  return (
    <motion.div 
      className="w-full overflow-hidden py-8 mt-16 backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Projects
      </motion.h2>

      <div className="relative px-4 md:px-20">
        {/* Navigation Buttons */}
        <button 
          onClick={goToPrevious} 
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Previous project"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext} 
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Next project"
        >
          <ArrowRight size={24} />
        </button>

        {/* Project Card with Sliding Animation */}
        <div ref={containerRef} className="relative">
          <div className="bg-black/20 rounded-xl border border-white/10 p-6 invisible">
            {/* This is an invisible placeholder to maintain the height */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <div className="w-full h-[300px]"></div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">Placeholder</h3>
                  <p className="text-white/80">This maintains the height of the container.</p>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90">
                      Placeholder
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-blue-600 rounded-lg">Placeholder</div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div 
              key={currentProject.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { 
                  type: "tween", 
                  ease: "easeOut",
                  duration: 0.4
                },
                opacity: { duration: 0.2 }
              }}
              className="flex flex-col md:flex-row gap-8 p-6 bg-black/20 rounded-xl border border-white/10 absolute top-0 left-0 right-0 w-full"
            >
              {/* Screenshot Area */}
              <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center">
                  {currentProject.screenshot ? (
                    <img 
                      src={currentProject.screenshot} 
                      alt={`${currentProject.name} screenshot`} 
                      className="w-full h-full object-cover"
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

                <div className="flex gap-4">
                  {currentProject.liveLink && (
                    <a 
                      href={currentProject.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {currentProject.githubLink && (
                    <a 
                      href={currentProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors duration-300"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                // Pause auto-advance temporarily when user interacts
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
      </div>
    </motion.div>
  )
}

export default Project

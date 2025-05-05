import { motion } from "framer-motion";
import { useState } from "react";
import { Circle, Tally1 } from "lucide-react";
import { usePerformance } from "../context/PerformanceContext";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string[];
  projects: string[];
  technologies: string[];
  logo?: string;
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: "Bistux Solutions Pvt. Ltd.",
      role: "Full Stack Developer",
      duration: "Jan 2024 - Present",
      description: [
        "Led the development of the company's flagship product using React and TypeScript",
        "Improved application performance by 40% through code optimization and implementing lazy loading",
        "Mentored junior developers and conducted code reviews"
      ],
      projects: [
        "Customer Dashboard Redesign",
        "Analytics Platform",
        "Mobile App Integration"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      logo: "/logos/tech-innovations.svg"
    },
    // {
    //   id: 2,
    //   company: "Digital Solutions Ltd.",
    //   role: "Frontend Developer",
    //   duration: "Mar 2021 - Dec 2022",
    //   description: [
    //     "Developed responsive web applications using modern JavaScript frameworks",
    //     "Collaborated with UX/UI designers to implement pixel-perfect interfaces",
    //     "Integrated RESTful APIs and implemented state management solutions"
    //   ],
    //   projects: [
    //     "E-commerce Platform",
    //     "Content Management System",
    //     "Customer Portal"
    //   ],
    //   technologies: ["JavaScript", "React", "Redux", "SASS", "REST APIs"],
    //   logo: "/logos/digital-solutions.svg"
    // },
    // {
    //   id: 3,
    //   company: "WebCraft Studios",
    //   role: "Junior Web Developer",
    //   duration: "Jun 2019 - Feb 2021",
    //   description: [
    //     "Built and maintained client websites using HTML, CSS, and JavaScript",
    //     "Implemented responsive designs and ensured cross-browser compatibility",
    //     "Worked with WordPress and custom PHP solutions"
    //   ],
    //   projects: [
    //     "Corporate Website Redesigns",
    //     "Portfolio Sites",
    //     "Landing Pages"
    //   ],
    //   technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    //   logo: "/logos/webcraft.svg"
    // }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(experiences.length > 1 ? null : 1);
  const { performanceMode } = usePerformance();

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: performanceMode === 'full' ? 0.3 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: performanceMode === 'full' ? "spring" : "tween",
        stiffness: 100,
        damping: 12,
        duration: performanceMode === 'full' ? undefined : 0.2
      }
    }
  };

  return (
    <motion.div
      className={`w-full overflow-hidden py-6 sm:py-8 mt-12  ${performanceMode === 'light' ? 'bg-black/20' : 'bg-white/5 backdrop-blur-sm'} rounded-2xl shadow-xl border border-white/10`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: performanceMode === 'full' ? 0.8 : 0.3, delay: performanceMode === 'full' ? 0.2 : 0.1 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: performanceMode === 'full' ? 0.5 : 0.2, delay: performanceMode === 'full' ? 0.3 : 0.1 }}
      >
        Experience
      </motion.h2>

      <motion.div
        className={`relative px-2 sm:px-4 ${experiences.length > 1 ? "md:px-16" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Timeline items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative last:mb-0"
            variants={itemVariants}
          >
            {/* Timeline */}
            <div className="flex items-start justify-center">
              <div>
              {experiences.length > 1 && (<Circle className="w-6 h-6 flex items-center justify-center z-10"/>) }  
             
              {index < experiences.length - 1 && (<div className={`w-0.5 ${expandedId === exp.id ? "h-250 md:h-137" : "h-50"} flex items-center bg-white/20 justify-center z-10 ml-2.5 transition-all duration-300`}/>) }
            </div>

            {/* Content card */}
            <motion.div
              className={`cursor-pointer ${performanceMode === 'light' ? 'bg-black/20' : 'bg-black/20'} w-full rounded-xl border border-white/10 p-6 ml-4 ${experiences.length > 1 ? "md:ml-16" : ""} transition-all duration-300 ${
                expandedId === exp.id ? "shadow-lg shadow-white/5" : ""
              }`}
              whileHover={performanceMode === 'full' ? { scale: 1.01 } : {}}
              onClick={() => toggleExpand(exp.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                  <h4 className="text-lg text-white/80 font-medium">{exp.role}</h4>
                </div>
                <div className="text-white/60 mt-2 md:mt-0 text-sm md:text-base">{exp.duration}</div>
              </div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedId === exp.id ? "auto" : 0,
                  opacity: expandedId === exp.id ? 1 : 0
                }}
                transition={{ duration: performanceMode === 'full' ? 0.3 : 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/10 mt-4">
                  <h5 className="text-white font-medium mb-2">Responsibilities:</h5>
                  <ul className="list-disc list-inside text-white/80 space-y-1 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h5 className="text-white font-medium mb-2">Projects:</h5>
                  <ul className="list-disc list-inside text-white/80 space-y-1 mb-4">
                    {exp.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>

                  <h5 className="text-white font-medium mb-2">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center mt-4">
                <button
                  className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(exp.id);
                  }}
                >
                  {expandedId === exp.id ? "Show Less" : "Show More"}
                </button>
              </div>
            </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Experience;
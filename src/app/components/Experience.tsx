import { motion } from "framer-motion";
import { useState } from "react";
import { Circle, Tally1 } from "lucide-react";
import { usePerformance } from "../context/PerformanceContext";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  juniorRole?: {
    title: string;
    period: string;
    sections: {
      title: string;
      items: string[];
    }[];
  };
  seniorRole?: {
    title: string;
    period: string;
    sections: {
      title: string;
      items: string[];
    }[];
  };
  projects?: string[];
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
      juniorRole: {
        title: "Junior Software Developer",
        period: "Jan 2024 - Jun 2024",
        sections: [
          {
            title: "UI Development",
            items: [
              "Revamped Login and App UI for improved user experience and design consistency.",
              "Developed interactive Dashboard using <strong>Recharts</strong> with dynamic data based on user's local timezone.",
              "Built Timeline UI with supporting backend: database schema, REST APIs, and service logic.",
              "Modernized legacy UI components including Call Logs, Contacts, and Call Flow."
            ]
          },
          {
            title: "Feature Implementation",
            items: [
              "Resolved call flow issues and improved performance using <strong>React Flow</strong>.",
              "Implemented Campaigns Management UI for creation, tracking, and analysis.",
              "Created reusable custom UI components: Country/State dropdowns and international phone input fields.",
              "Developed Advanced Search UI for Contacts with robust filtering capabilities.",
              "Managed component state using <strong>Redux</strong> for scalable state architecture."
            ]
          }
        ]
      },
      seniorRole: {
        title: "Full Stack Developer",
        period: "Jun 2024 - Present",
        sections: [
          {
            title: "Frontend Development",
            items: [
              "Built fully functional Click-to-Call UI and browser-based softphone interface for both outgoing and incoming calls.",
              "Improved Call Flow performance by over <strong>60%</strong> and optimized rendering using <strong>React Flow</strong>.",
              "Integrated <strong>AWS Media Services</strong> for audio processing and waveform visualizations.",
              "Collaborated with UI/UX designers on design iterations and feedback using <strong>Figma</strong>.",
              "Enhanced Customer Onboarding UI to improve usability and engagement metrics.",
              "Managed advanced call state transitions using <strong>Redux</strong> for real-time call interaction handling."
            ]
          },
          {
            title: "Backend Development",
            items: [
              "Fixed critical bugs and rewrote logging logic for enhanced reliability and traceability.",
              "Implemented Sticky Agent feature to optimize agent assignment and improve routing persistence.",
              "Rewrote Campaigns backend logic to significantly improve scalability and response times.",
              "Designed and implemented a Job Scheduler for campaign and task services with jobs running at various intervals or on customer interaction.",
              "Achieved <strong>100%</strong> accuracy and consistency in call logging across normalized <strong>Cassandra</strong> tables, handling over <strong>100,000</strong> entries daily.",
              "Developed efficient, scalable filtering and data consistency strategies on <strong>Cassandra</strong> across microservices.",
              "Secured API routes and produced comprehensive API documentation for team and client usage.",
            ]
          },
          {
            title: "DevOps & Leadership",
            items: [
              "Mentored junior developers and contributed to sprint planning and project management.",
              "Maintained and optimized CI/CD pipelines for reliable deployment of core services.",
              "Managed Microservices deployments using <strong>Docker</strong> and <strong>Nginx</strong> with a focus on stability and scalability."
            ]
          }
        ]
      },
      projects: [],
      technologies: ["React", "TypeScript", "NodeJS", "Material UI", "Cassandra DB", "ExpressJS", "JWT", "Socket IO", "SIP.js", "AWS", "Razorpay", "NestJS", "Ngnix", "Redux", "React Flow", "Docker", "Figma"],
      logo: "/logos/tech-innovations.svg"
    }
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

                {exp.seniorRole && (
                  <>
                    <h3 className="mb-2"><span className="text-white font-semibold">{exp.seniorRole.title}</span> | {exp.seniorRole.period}</h3>
                    
                    {exp.seniorRole.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-8">
                        <h6 className="text-white font-medium my-2 ml-2">{section.title}:</h6>
                        <ul className="list-disc list-outside text-white/80 space-y-2  ml-6">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}

                  {exp.juniorRole && (
                  <>
                    <h3 className="mb-2"><span className="text-white font-semibold">{exp.juniorRole.title}</span> | {exp.juniorRole.period}</h3>
                    
                    {exp.juniorRole.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-8">
                        <h6 className="text-white font-medium my-2 ml-2">{section.title}:</h6>
                        <ul className="list-disc list-outside text-white/80 space-y-2 ml-6">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}

                  <h6 className={`text-white font-medium mb-2 ml-2 ${exp.projects && exp.projects.length > 0 ? "" : "hidden"}`}>Projects:</h6>
                  <ul className={`list-disc list-outside text-white/80 space-y-2 mb-6 ml-6 ${exp.projects && exp.projects.length > 0 ? "" : "hidden"}`}>
                    {exp.projects?.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>

                  <h6 className="text-white font-medium mb-2">Technologies:</h6>
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
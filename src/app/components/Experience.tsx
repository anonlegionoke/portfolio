"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  role1?: {
    title: string;
    period: string;
    sections: {
      title: string;
      items: string[];
    }[];
  };
  role2?: {
    title: string;
    period: string;
    sections: {
      title: string;
      items: string[];
    }[];
  };
  projects?: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Bistux Solutions Pvt. Ltd.",
    role: "Software Engineer",
    duration: "Jan 2024 - Present",
    role1: {
      title: "Frontend Engineer",
      period: "Jan 2024 - Jun 2024",
      sections: [
        {
          title: "Frontend Architecture",
          items: [
            "Revamped the legacy application with a modern React and Material UI stack, building interactive <strong>Recharts</strong> dashboards with dynamic timezone ",
            "Built a comprehensive <strong>contact activity timeline</strong> with supporting backend: database schema, REST APIs, and service logic.",
            "Implemented Campaigns Management UI for campaign creation, tracking, and analysis.",
          ]
        },
        {
          title: "Full-Stack Transition",
          items: [
            "Designed advanced search capabilities for 1M+ contacts, independently building the supporting backend architecture including REST APIs, service logic, and Cassandra DB schemas.",
            "Modernized legacy UI components including Call Logs, Contacts, and Call Flow.",
            "Created reusable custom UI components: Country/State dropdowns and international phone input fields.",
          ]
        },
        {
          title: "Feature Delivery",
          items: [
            "Engineered a comprehensive Campaigns Management UI and a production soft-phone interface with integrated call controls, live transcription, and end-to-end backend routing.",
          ]
        }
      ]
    },
    role2: {
      title: "Software Engineer",
      period: "Jul 2024 - Present",
      sections: [
        {
          title: "Backend & Distributed Systems",
          items: [
            "Architected and developed <strong>multi-instance microservices</strong> for SIP call routing, implementing <strong>round-robin</strong> and <strong>sticky-agent assignment</strong> with race condition handling via <strong>Cassandra lightweight transactions</strong>.",
            "Built a <strong>distributed job scheduler</strong> with shard-based execution across service instances, implementing <strong>epoch fencing</strong> and <strong>crash recovery</strong> to prevent <strong>split-brain</strong> while mitigating <strong>Cassandra tombstone bloat</strong> under heavy workloads.",
            "Designed an <strong>event-driven notification system</strong> using <strong>RabbitMQ</strong>, <strong>WebSockets</strong>, and <strong>webhooks</strong>, supporting real-time SIP calls, live transcription, and multi-channel delivery.",
            "Engineered a <strong>multi-instance campaign service</strong> with contact pool management, retry logic, and configurable scheduling, orchestrating outreach across <strong>1M+ contacts</strong>.",
            "Achieved <strong>100% accuracy</strong> and consistency in call logging across normalized <strong>Cassandra</strong> tables, handling over <strong>100,000 entries daily</strong>.",
            "Migrated <strong>20+ Cassandra tables</strong> (several with <strong>15M+ rows</strong>) using <strong>DSBulk</strong> and custom <strong>Node.js</strong> automation scripts for schema creation and SAI index provisioning, achieving zero-downtime data migration.",
          ]
        },
        {
          title: "Frontend & Full-Stack",
          items: [
            "Rebuilt the company dashboard in <strong>React</strong> and <strong>TypeScript</strong>, rendering real-time and aggregated metrics (hourly/daily/monthly) with automatic timezone conversion, reducing initial load time by <strong>43%</strong>.",
            "Improved <strong>Call Flow</strong> performance by over <strong>58%</strong> and optimized rendering using <strong>React Flow</strong>.",
            "Developed a production <strong>soft-phone UI</strong> with call controls, call logs, live transcription, and contact management, integrated end-to-end with backend call-routing services.",
            "Integrated <strong>AWS Media Services</strong> for audio processing and developed UI with waveform visualizations.",
            "Implemented a <strong>contact activity timeline</strong> with timestamped logs, call playback, transcription, and notes, backed by <strong>Cassandra</strong> with efficient cursor-based pagination.",
          ]
        },
        {
          title: "DevOps & Leadership",
          items: [
            "Managed <strong>containerized deployments</strong> with <strong>Docker Swarm</strong>, including Dockerfile authoring, multi-service orchestration, and <strong>CI/CD pipelines</strong> for automated build and deploy workflows.",
            "Led cross-functional meetings with customer support to develop the <strong>Sticky Agent</strong> feature based on user feedback.",
            "Mentored junior developers and contributed to sprint planning and project management.",
          ]
        }
      ]
    },
    projects: [],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Cassandra", "PostgreSQL", "RabbitMQ", "WebSockets", "Docker", "Material UI", "Redux", "Nginx", "AWS", "SIP.js", "Git"],
  }
];

const RoleTimeline = ({ role }: { role: { title: string; period: string; sections: { title: string; items: string[] }[] } }) => (
  <li className="mb-10 ms-6">
    <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 bg-blue-900 mt-1">
      <svg className="w-2.5 h-2.5 text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </span>
    <div className="ml-1">
      <h3 className="flex items-center mb-1 text-lg font-semibold text-white">{role.title}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{role.period}</time>
      <div className="mb-4 text-base font-normal text-gray-500 mt-5">
        {role.sections.map((section, i) => (
          <div key={i} className="mb-8">
            <h6 className="text-white font-semibold my-2 ml-2">{section.title}:</h6>
            <ul className="list-disc list-outside text-white/80 text-sm md:text-base space-y-2 ml-6">
              {section.items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </li>
);

const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 mt-12 bg-white/5 rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12 drop-shadow-md">
        Experience
      </h2>

      <div className="relative px-2 sm:px-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative last:mb-0">
            <div className="flex items-start justify-center">
              {/* Content card — CSS hover, Framer only for height animation */}
              <div
                className="cursor-pointer bg-black/20 w-full rounded-xl border border-white/10 p-6 transition-all duration-200 hover:scale-[1.005] hover:shadow-lg hover:shadow-white/5"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <h4 className="text-lg text-white/80 font-medium">{exp.role}</h4>
                  </div>
                  <div className="text-white/60 mt-2 md:mt-0 text-sm md:text-base">{exp.duration}</div>
                </div>

                {/* Framer Motion ONLY for height:"auto" interpolation — CSS can't do this */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === exp.id ? "auto" : 240,
                    opacity: expandedId === exp.id ? 1 : 0.65
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 border-t border-white/10 m-5">
                    <ol className="relative border-s border-gray-700">
                      {exp.role2 && <RoleTimeline role={exp.role2} />}
                      {exp.role1 && <RoleTimeline role={exp.role1} />}
                    </ol>

                    {exp.projects && exp.projects.length > 0 && (
                      <>
                        <h6 className="text-white font-medium mb-2 ml-2">Projects:</h6>
                        <ul className="list-disc list-outside text-white/80 space-y-2 mb-6 ml-6">
                          {exp.projects.map((project, i) => (
                            <li key={i}>{project}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <h6 className="text-white font-medium mb-2">Technologies:</h6>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/90">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center mt-4">
                  <button
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (expandedId === exp.id) {
                        document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => setExpandedId(null), 500);
                      } else {
                        setExpandedId(exp.id);
                      }
                    }}
                  >
                    {expandedId === exp.id ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
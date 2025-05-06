import { motion } from "framer-motion"
import { Linkedin, Github, Mail, Twitter } from "lucide-react"
import { FaDiscord } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { SiLeetcode } from "react-icons/si";
import { usePerformance } from "../context/PerformanceContext";
  
interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

const Connect = () => {
  const { performanceMode } = usePerformance();
  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={22} />,
      url: "https://linkedin.com/in/sabirpm",
      color: "#0077B5"
    },
    {
      name: "GitHub",
      icon: <Github size={22} />,
      url: "https://github.com/anonlegionoke",
      color: "#020202"
    },
    {
      name: "Email",
      icon: <Mail size={22} />,
      url: "mailto:smrazind@gmail.com",
      color: "#D44638"
    },
    {
      name: "Twitter/X",
      icon: <Twitter size={22} />,
      url: "https://x.com/sabirpm_",
      color: "#1DA1F2"
    },
    {
      name: "LeetCode",
      icon: <SiLeetcode size={22} />,
      url: "https://leetcode.com/anonlegio",
      color: "#FFA116"
    },
    {
      name: "Discord",
      icon: <FaDiscord size={22} />,
      url: "https://discord.gg/JWcAFxZ5",
      color: "#5865f2"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: performanceMode === 'full' ? 0.1 : 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: performanceMode === 'full' ? "spring" : "tween",
        stiffness: performanceMode === 'full' ? 260 : 100,
        damping: performanceMode === 'full' ? 20 : 10,
        duration: performanceMode === 'full' ? undefined : 0.2
      }
    },
    hover: performanceMode === 'full' ? {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    } : {}
  }

  return (
    <div className={`${performanceMode === 'light' ? 'bg-black/20' : 'bg-white/5 backdrop-blur-sm'} rounded-2xl shadow-xl border border-white/10 p-4 sm:p-6 md:p-8`}>
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: performanceMode === 'full' ? 0.5 : 0.2, delay: performanceMode === 'full' ? 0.3 : 0.1 }}
      >
        Let&apos;s Connect
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        <div className="md:order-1 order-2">
          <motion.h3 
            className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: performanceMode === 'full' ? 0.5 : 0.2, delay: performanceMode === 'full' ? 0.4 : 0.15 }}
          >
            Find Me On
          </motion.h3>
          
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                variants={itemVariants}
                whileHover={performanceMode === 'full' ? "hover" : undefined}
              >
                <div className="relative h-40 rounded-xl border border-white/10 overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                    style={{ backgroundColor: link.color }}
                  ></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white"
                      style={{ backgroundColor: `${link.color}70` }}
                    >
                      <motion.div
                        whileHover={performanceMode === 'full' ? { rotate: 5 } : undefined}
                        className="text-white"
                      >
                        {link.icon}
                      </motion.div>
                    </div>
                    <span className="text-sm font-medium text-white">{link.name}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <div className="md:order-2 order-1 mb-6 md:mb-0">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Connect
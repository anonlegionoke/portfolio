import { motion } from "framer-motion"
import { Linkedin, Github, Mail, Twitter, Code } from "lucide-react"

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

const Connect = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={28} />,
      url: "https://linkedin.com/in/yourusername",
      color: "#0077B5"
    },
    {
      name: "GitHub",
      icon: <Github size={28} />,
      url: "https://github.com/yourusername",
      color: "#333"
    },
    {
      name: "Email",
      icon: <Mail size={28} />,
      url: "mailto:your.email@example.com",
      color: "#D44638"
    },
    {
      name: "Twitter",
      icon: <Twitter size={28} />,
      url: "https://twitter.com/yourusername",
      color: "#1DA1F2"
    },
    {
      name: "Mastodon",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.551-4.237-.551 0 .184.014.459.043.643.308 2.294 2.317 2.478 4.22 2.57 1.922.091 3.613-.46 3.613-.46l.087 1.736s-1.342.734-3.738.919c-1.32.091-2.96-.092-4.869-1.103-2.934-1.47-2.659-6.795-2.717-12.318.008-.818.016-1.588.016-2.22 0-2.946 1.988-4.362 1.988-4.362C8.944.276 12.044.092 15.121.092h.08c3.067 0 5.516.184 7.882 1.47 0 0 1.988 1.416 1.988 4.362 0 0 .033 4.166-.491 7.989z"/><path d="M17.858 7.847c0-1.84-.97-2.476-2.877-2.476-1.497 0-2.211.594-2.211 1.47v4.923h-2.93V6.75c0-.877-.714-1.47-2.211-1.47-1.906 0-2.877.637-2.877 2.476v5.192c0 1.84.97 2.476 2.877 2.476 1.497 0 2.211-.593 2.211-1.47v-4.923h2.93v4.923c0 .877.714 1.47 2.211 1.47 1.906 0 2.877-.637 2.877-2.476V7.847z"/></svg>,
      url: "https://mastodon.social/@yourusername",
      color: "#6364FF"
    },
    {
      name: "LeetCode",
      icon: <Code size={28} />,
      url: "https://leetcode.com/yourusername",
      color: "#FFA116"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <motion.div
      className="w-full overflow-hidden py-8 mt-16 backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h2
        className="text-3xl font-bold text-white text-center mb-12 drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Connect With Me
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16"
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
            whileHover="hover"
          >
            <div className="relative h-40 rounded-xl border border-white/10 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ backgroundColor: link.color }}
              ></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white"
                  style={{ backgroundColor: `${link.color}40` }}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="text-white"
                  >
                    {link.icon}
                  </motion.div>
                </div>
                <span className="text-lg font-medium text-white">{link.name}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Connect
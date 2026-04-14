import { Linkedin, Github, Mail } from "lucide-react"
import { FaDiscord } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { SiLeetcode } from "react-icons/si";

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

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
];

const Connect = () => {
  return (
    <div className="bg-white/5 rounded-2xl shadow-xl border border-white/10 p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 drop-shadow-md">
        Let&apos;s Connect
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        <div className="md:order-1 order-2">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
            Find me on
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative h-40 rounded-xl border border-white/10 overflow-hidden hover:scale-105 transition-transform duration-200">
                  <div
                    className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                    style={{ backgroundColor: link.color }}
                  ></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white group-hover:rotate-[5deg] transition-transform duration-200"
                      style={{ backgroundColor: `${link.color}70` }}
                    >
                      {link.icon}
                    </div>
                    <span className="text-sm font-medium text-white">{link.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="md:order-2 order-1 mb-6 md:mb-0">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Connect

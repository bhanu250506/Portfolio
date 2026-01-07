import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Smartphone, Server, ShieldCheck, 
  Terminal, Database, Cpu, Globe, Layers, Wrench 
} from "lucide-react";

// --- 1. SPOTLIGHT CARD HELPER ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden h-full ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 2. SKILLS DATA (From Resume) ---
const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="w-6 h-6 text-indigo-400" />,
    skills: ["Java", "C++", "Python", "Go", "Kotlin", "Dart", "JavaScript", "SQL"],
    gradient: "from-indigo-500/10 to-blue-500/10",
    border: "group-hover:border-indigo-500/50"
  },
  {
    title: "Frontend & Mobile",
    icon: <Smartphone className="w-6 h-6 text-pink-400" />,
    skills: ["React", "Next.js", "Flutter", "Jetpack Compose", "Tailwind CSS", "Material UI", "HTML/CSS"],
    gradient: "from-pink-500/10 to-rose-500/10",
    border: "group-hover:border-pink-500/50"
  },
  {
    title: "Backend Architecture",
    icon: <Server className="w-6 h-6 text-emerald-400" />,
    skills: ["Spring Boot", "Node.js", "Express.js", "GraphQL","Golang", "REST APIs", "WebSockets", "Microservices"],
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "Cyber Security",
    icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
    skills: ["OWASP Top 10", "Penetration Testing", "Burp Suite", "Nmap", "Nikto", "Vulnerability Management"],
    gradient: "from-red-500/10 to-orange-500/10",
    border: "group-hover:border-red-500/50"
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="w-6 h-6 text-cyan-400" />,
    skills: ["Git", "Docker", "Linux", "Postman", "Android Studio", "IntelliJ", "VS Code", "Gemini AI"],
    gradient: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50"
  }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Technical <span className="text-indigo-400">Arsenal</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive toolset for building secure, scalable digital solutions.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <SpotlightCard className={`p-6 md:p-8 flex flex-col group transition-colors duration-300 ${category.border}`}>
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} border border-white/10`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 cursor-default transition-colors hover:text-white hover:border-white/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

              </SpotlightCard>
            </motion.div>
          ))}

          {/* Bonus: "Learning Now" Card to fill the grid nicely */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-full"
          >
             <SpotlightCard className="p-6 md:p-8 flex flex-col justify-center items-center text-center group hover:border-purple-500/50">
                <div className="p-4 rounded-full bg-purple-500/10 mb-4 animate-pulse">
                  <Cpu className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Always Evolving</h3>
                <p className="text-slate-400 text-sm">
                  Currently exploring <strong>System Design</strong> and <strong>Cloud Security Architecture</strong> to further enhance my engineering capabilities.
                </p>
             </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
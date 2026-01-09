import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, ExternalLink, ArrowRight, Terminal, 
  Cpu, Database, Layout, Sparkles, MessageSquare 
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
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden flex flex-col ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full flex flex-col">{children}</div>
    </div>
  );
};

// --- 2. PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "HiveBlog Platform",
    category: "Full Stack • Spring Boot",
    description: "A scalable social blogging ecosystem. Features AI-assisted content generation, real-time chat rooms, and granular Role-Based Access Control (RBAC).",
    icon: <Layout className="w-6 h-6 text-orange-400" />,
    tags: ["Java", "Spring Boot", "React", "MySQL", "Gemini AI", "WebSockets"],
    githubUrl: "https://github.com/bhanu250506/full_stack_blog/blob/main/README.md",
  },
  {
    id: 2,
    title: "JobFlow AI Suite",
    category: "Productivity • AI Engine",
    description: "Intelligent career automation tool. Includes an ATS Resume Auditor, automated cold emailing engine, and smart gap analysis.",
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    tags: ["Node.js", "React", "MongoDB", "Gemini AI", "JWT", "nodemailer"],
    githubUrl: "https://github.com/bhanu250506/JobFlow/blob/main/README.md",
  },
  {
    id: 3,
    title: "Aura Mental Health",
    category: "Mobile App • AI Therapy",
    description: "Privacy-focused wellness app. Uses context-aware AI for empathetic conversations, mood tracking, and secure data persistence.",
    icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
    tags: ["Flutter", "Express.js", "MongoDB", "Riverpod", "Secure Storage"],
    githubUrl: "https://github.com/bhanu250506/Mental_health_app/blob/main/README.md",
  },
];

const ProjectsSection = () => {
  return (
    // FIX: Optimized padding for mobile (py-16) vs desktop (py-32)
    <section id="projects" className="py-16 md:py-24 lg:py-32 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-indigo-400">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            A showcase of complex systems built with modern architecture.
          </p>
        </motion.div>

        {/* Projects Grid 
            Mobile: 1 Col
            Tablet: 2 Cols
            Desktop: 3 Cols
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <SpotlightCard className="p-5 md:p-6 h-full hover:border-indigo-500/30 transition-colors group">
                
                {/* Card Header & Actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  
                  {/* Action Buttons (GitHub/Demo) */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="GitHub Repo"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-400 mb-3 uppercase tracking-wide">
                    {project.category}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-800/50">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 rounded-md text-[10px] md:text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* "View All" Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="https://github.com/bhanu250506?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-sm md:text-base font-medium hover:bg-slate-800 hover:text-white hover:border-indigo-500/50 transition-all group"
          >
            View Full Project Archive 
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
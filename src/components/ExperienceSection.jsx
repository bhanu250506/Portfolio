import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

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
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden ${className}`}
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

// --- 2. EXPERIENCE DATA ---
const experiences = [
  {
    company: "Ditansource",
    role: "Cyber Security & Software Developer Intern",
    period: "Sept 2025 – Present",
    location: "Remote",
    description: "Leading security initiatives by orchestrating penetration testing and automating vulnerability scans.",
    achievements: [
      "Identified & remediated 15+ critical vulnerabilities.",
      "Architected Spring Boot security patches.",
      "Reduced manual audit cycles by 40%.",
    ],
    skills: ["Spring Boot", "Penetration Testing", "Burp Suite", "Java", "React"],
  },
  {
    company: "Healthletic Lifestyle",
    role: "Android Developer Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Remote",
    description: "Engineered high-performance mobile solutions for the healthcare sector.",
    achievements: [
      "Built a medical care app using Flutter & GetX.",
      "Optimized API integration via Dio.",
      "Boosted user retention by 20%.",
    ],
    skills: ["Flutter", "GetX", "REST APIs", "Git-Flow"],
  },
  {
    company: "Yuvmedia",
    role: "Flutter Intern",
    period: "Mar 2025 – Jun 2025",
    location: "Remote",
    description: "Developed a full-scale LMS with offline capabilities and AI integration.",
    achievements: [
      "Constructed an offline-first LMS app.",
      "Built a scalable Node.js/MongoDB backend.",
      "Integrated Google Gemini API.",
    ],
    skills: ["Flutter", "Node.js", "MongoDB", "Gemini AI"],
  },
];

export const ExperienceSection = () => {
  return (
    // FIX: Optimized padding: py-16 (Mobile) -> py-32 (Desktop)
    <section id="experience" className="py-16 md:py-24 lg:py-32 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Professional <span className="text-indigo-400">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            A timeline of my technical contributions and internships.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          {/* Mobile: left-4 (16px), Desktop: left-8 (32px) */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-slate-800" />

          {/* Experience Cards */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                // Padding Left: pl-12 (Mobile) to pl-24 (Desktop) to clear the line
                className="relative pl-12 md:pl-24"
              >
                {/* Timeline Dot */}
                {/* Calculated center: Line is at 16px (mobile). Dot is 10px wide. 16px - 5px + 0.5px center = ~11.5px */}
                <div className="absolute left-[11.5px] md:left-[28px] top-6 md:top-8 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-950 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" />

                <SpotlightCard className="p-5 md:p-8 group hover:border-indigo-500/30 transition-colors">
                  
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                        {exp.role}
                      </h3>
                      <div className="text-base md:text-lg font-medium text-slate-300 flex items-center gap-2 mt-1 md:mt-2">
                        <Briefcase className="w-4 h-4 text-indigo-500" />
                        {exp.company}
                      </div>
                    </div>
                    
                    {/* Metadata (Date/Location) */}
                    {/* Mobile: Left aligned, Desktop: Right aligned */}
                    <div className="flex flex-row md:flex-col gap-3 md:gap-1 text-xs md:text-sm font-mono text-slate-500 md:text-right mt-2 md:mt-0">
                      <span className="flex items-center gap-1.5 md:justify-end">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 md:justify-end">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-slate-400 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 md:space-y-3 mb-6">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-xs md:text-sm">
                        <ArrowRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
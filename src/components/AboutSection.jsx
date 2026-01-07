import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Globe, Smartphone, Server, ShieldCheck, 
  Linkedin, FileText, BrainCircuit, Zap 
} from "lucide-react";

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

export const AboutSection = () => {
  return (
    // FIX: bg-transparent allows global background to show
    <section id="about" className="py-32 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-6xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            More Than Just <span className="text-indigo-400">Code</span>
          </h2>
         <p className="text-slate-400 max-w-2xl mx-auto text-lg">
  I focus on building <span className="text-white">secure, scalable systems</span> that perform
  reliably in real-world production environments.
</p>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 h-full"
          >
            <SpotlightCard className="h-full p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Terminal className="w-8 h-8 text-indigo-400" />
                </div>
<h3 className="text-2xl font-bold text-white">
  Full-Stack Engineering with a Security-First Mindset
</h3>
              </div>
            <p className="text-slate-400 leading-relaxed text-lg mb-6">
  MySelf <strong className="text-white">Bhanu Pratap Singh</strong>, a full-stack developer with
  <strong className="text-white"> over a year of hands-on experience</strong> building and securing
  real-world applications.
  <br /><br />
  From crafting clean, responsive <strong className="text-white">React and Flutter</strong> interfaces
  to designing scalable <strong className="text-white">Spring Boot</strong> backends, I focus on writing
  code that is reliable, maintainable, and production-ready.
  My background in <strong className="text-white">cyber security</strong> ensures security is built into
  the system from the ground up — not added as an afterthought.
</p>

              
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/bhanupratapsn" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://drive.google.com/file/d/1lTIFQTyUJqwCMYCTaAIOIvWr9LnUbGrN/view?usp=sharing" target="_blank" className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-white text-slate-300 hover:text-white rounded-lg font-medium transition-all">
                  <FileText className="w-4 h-4" /> Resume
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 h-full"
          >
            <SpotlightCard className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900/50 to-emerald-900/10">
              <div>
                 <div className="p-3 bg-emerald-500/10 w-fit rounded-xl border border-emerald-500/20 mb-6">
                  <BrainCircuit className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Problem Solver</h3>
                <p className="text-slate-400 text-sm">
                  Logic sharper than syntax.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-800">
                 <div className="text-4xl font-extrabold text-white mb-1">500+</div>
                 <div className="text-emerald-400 font-medium text-sm uppercase tracking-wider">DSA Problems</div>
                 <div className="flex gap-2 mt-3">
                   <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">LeetCode</span>
                   <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">GFG</span>
                 </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Quick Learner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SpotlightCard className="p-6 h-full group">
              <div className="p-3 bg-orange-500/10 w-fit rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Fast Adapter</h4>
              <p className="text-slate-400 text-sm">
                Thriving on new frameworks. I adapt to technology shifts instantly.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Full Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SpotlightCard className="p-6 h-full group">
              <div className="p-3 bg-blue-500/10 w-fit rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Full Stack</h4>
              <p className="text-slate-400 text-sm">
                Scalable <strong>React</strong> web apps & <strong>Flutter</strong> mobile solutions.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Security */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SpotlightCard className="p-6 h-full group">
              <div className="p-3 bg-cyan-500/10 w-fit rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Cyber Security</h4>
              <p className="text-slate-400 text-sm">
                Patching vulnerabilities before deployment. OWASP & Pen-Testing.
              </p>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
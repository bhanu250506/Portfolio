import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowRight, Download, Terminal, Code2, 
  ShieldCheck, Smartphone, Coffee, Github, Linkedin, FileText, Code 
} from "lucide-react";
import { DeveloperBackground } from "./DeveloperBckground";

// --- 1. TYPEWRITER COMPONENT ---
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    
    <span className="inline-block min-w-[200px] text-left">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1 text-indigo-400`}>|</span>
    </span>
  );
};

// --- 2. 3D TILT COMPONENT ---
const TiltContainer = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center perspective-1000 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

// --- 3. SOCIAL PILL COMPONENT ---
const SocialPill = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="group relative flex items-center justify-center p-3 rounded-full bg-slate-900/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
    <span className="absolute -top-10 scale-0 group-hover:scale-100 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-700">
      {label}
    </span>
  </a>
);

export const HeroSection = () => {
  return (
    // FIX: Removed bg-slate-950, added bg-transparent
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden bg-transparent">
       <div className="absolute inset-0 z-0">
        <DeveloperBackground />
      </div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT SIDE --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
       {/* Hire Badge */}
<div className="flex justify-center lg:justify-start mb-6">
  <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
    border border-indigo-400/30 
    bg-gradient-to-r from-indigo-500/10 via-indigo-400/10 to-purple-500/10
    backdrop-blur-xl shadow-lg shadow-indigo-500/20">

    {/* Green animated status dot */}
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full rounded-full 
        bg-emerald-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
    </span>

    <span className="text-xs font-semibold tracking-widest uppercase 
      bg-gradient-to-r from-indigo-300 to-purple-300 
      bg-clip-text text-transparent">
      Open to Opportunities
    </span>
  </div>
</div>


      {/* Name */}
<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white leading-tight">
  Hi, MySelf{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
    Bhanu 
  </span>{" "}
  
</h1>

{/* Roles */}
<div className="text-xl sm:text-2xl md:text-4xl font-semibold text-slate-400 mb-6 h-14">
  Crafting{" "}
  <span className="text-white">
    <Typewriter
      words={[
        "secure Backend",
        "scalable Mobile apps",
        "security-first architecture",
      ]}
    />
  </span>
</div>


{/* Description */}
<p className="text-base sm:text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
  I’m a <span className="text-white font-medium">Full-Stack Developer</span> working across
  <span className="text-indigo-400 font-medium"> Java, Node.js, React and Flutter</span> —
  building secure, scalable systems from backend logic to user-friendly interfaces that
  actually ship to production.
</p>


          {/* NEW: Social Dock */}
          <div className="flex gap-4 justify-center lg:justify-start mb-10">
             <SocialPill href="https://linkedin.com/in/bhanupratapsn" icon={Linkedin} label="LinkedIn" />
             <SocialPill href="https://github.com/bhanu250506" icon={Github} label="GitHub" />
             <SocialPill href="https://leetcode.com/u/bhanupratap2556/" icon={Code} label="LeetCode" />
             <SocialPill href="https://drive.google.com/file/d/1j3xL5-CwZ5jGs7jE_ykQvfsIt1pC0a16/view?usp=sharing" icon={FileText} label="Resume" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              View Work <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://drive.google.com/file/d/1j3xL5-CwZ5jGs7jE_ykQvfsIt1pC0a16/view?usp=sharing" 
              className="px-8 py-4 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md text-white font-medium hover:border-indigo-500/50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </motion.div>


        {/* --- RIGHT SIDE --- */}
        <div className="order-1 lg:order-2 flex items-center justify-center py-10 lg:py-0">
          <TiltContainer>
            <div style={{ transform: "translateZ(0px)" }} className="absolute inset-0 bg-slate-900/20 border border-slate-700/30 backdrop-blur-sm rounded-3xl shadow-2xl" />
            <div style={{ transform: "translateZ(-50px)" }} className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px]" />
            
            {/* Icons */}
            <motion.div style={{ transform: "translateZ(60px)" }} className="absolute top-10 left-1/2 -translate-x-1/2 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center gap-2">
              <div className="p-3 bg-orange-500/10 rounded-full"><Coffee className="w-8 h-8 text-orange-400" /></div>
              <span className="text-xs font-bold text-slate-300">Java Dev</span>
            </motion.div>

            <motion.div style={{ transform: "translateZ(80px)" }} className="absolute bottom-12 left-8 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center gap-2">
              <div className="p-3 bg-emerald-500/10 rounded-full"><Smartphone className="w-8 h-8 text-emerald-400" /></div>
              <span className="text-xs font-bold text-slate-300">App Dev</span>
            </motion.div>

            <motion.div style={{ transform: "translateZ(100px)" }} className="absolute bottom-16 right-8 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center gap-2">
              <div className="p-3 bg-cyan-500/10 rounded-full"><ShieldCheck className="w-8 h-8 text-cyan-400" /></div>
              <span className="text-xs font-bold text-slate-300">Security</span>
            </motion.div>

            {/* Code Snippet */}
            <motion.div style={{ transform: "translateZ(40px)" }} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <pre className="text-[10px] text-indigo-300 font-mono leading-relaxed">
{`class Bhanu {
  skills = [
   "Java", "Flutter",
   "CyberSec"
  ];
}`}
              </pre>
            </motion.div>
          </TiltContainer>
        </div>

      </div>
    </section>
  );
};
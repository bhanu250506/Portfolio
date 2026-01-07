import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Linkedin, Github, MessageCircle, 
  Copy, Check, ArrowRight, Terminal 
} from "lucide-react";

// --- 1. SPOTLIGHT CARD HELPER ---
const SpotlightCard = ({ children, className = "", onClick }) => {
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
      onClick={onClick}
      className={`relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden cursor-pointer ${className}`}
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

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhanupratap25.bs@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-4 relative bg-transparent">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Initialize <span className="text-indigo-400">Connection</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Open for collaborations on secure, scalable architectures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. EMAIL CARD (Action: Copy) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <SpotlightCard className="p-8 group hover:border-indigo-500/30 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                    <p className="text-slate-400 text-sm mb-2">bhanupratap25.bs@gmail.com</p>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Replies within 24h
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="w-full md:w-auto px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy Address"}
                </button>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. WHATSAPP CARD (Action: Direct Chat) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <a 
              href="https://wa.me/919783271934?text=Hi%20Bhanu,%20I%20saw%20your%20portfolio..."
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <SpotlightCard className="p-8 group hover:border-emerald-500/30 transition-all h-full bg-gradient-to-br from-slate-900/50 to-emerald-900/10">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:-rotate-45 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                    <p className="text-slate-400 text-sm">Quick Chat</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </motion.div>

          {/* 3. LINKEDIN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="https://linkedin.com/in/bhanupratapsn" target="_blank" rel="noreferrer" className="block h-full">
              <SpotlightCard className="p-6 group hover:border-blue-500/30 transition-all h-full">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">LinkedIn</h4>
                    <p className="text-xs text-slate-500">Professional Profile</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </motion.div>

          {/* 4. GITHUB */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="https://github.com/bhanu250506" target="_blank" rel="noreferrer" className="block h-full">
              <SpotlightCard className="p-6 group hover:border-purple-500/30 transition-all h-full">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">GitHub</h4>
                    <p className="text-xs text-slate-500">Code Repositories</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </motion.div>

          {/* 5. RESUME / TERMINAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a href="https://drive.google.com/file/d/1lTIFQTyUJqwCMYCTaAIOIvWr9LnUbGrN/view?usp=sharing" target="_blank" rel="noreferrer" className="block h-full">
              <SpotlightCard className="p-6 group hover:border-orange-500/30 transition-all h-full">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Resume</h4>
                    <p className="text-xs text-slate-500">View Full CV</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
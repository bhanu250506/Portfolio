import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Github, Linkedin, MessageCircle } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Handle Scroll Effect for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-slate-800/50 py-3 shadow-lg shadow-indigo-500/5"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <a href="#hero" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
                {/* Online Dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-950"></span>
                </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none">
                Bhanu<span className="text-indigo-400">.dev</span>
              </span>
            </div>
          </a>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex p-1 rounded-full bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                {navItems.map((item, index) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Magnetic Hover Background */}
                    <AnimatePresence>
                    {hoveredIndex === index && (
                        <motion.div
                        className="absolute inset-0 bg-slate-800 rounded-full -z-10"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        />
                    )}
                    </AnimatePresence>
                    {item.name}
                </a>
                ))}
            </div>

            {/* Contact Button */}
            <a 
              href="#contact"
              className="ml-4 px-6 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Let's Talk
            </a>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-10 px-6"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="flex flex-col flex-1 relative z-10">
              <nav className="flex flex-col gap-6">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.3 }}
                      className="text-4xl font-bold text-slate-300 hover:text-white hover:translate-x-4 transition-all"
                    >
                      <span className="text-indigo-500/50 text-lg font-mono mr-4">0{idx + 1}.</span>
                      {item.name}
                    </motion.a>
                  ))}
              </nav>

              {/* Mobile Footer / Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto border-t border-slate-800 pt-8"
              >
                 <a 
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-4 mb-8 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 active:scale-95 transition-transform"
                >
                  Start Project
                </a>

                <div className="flex justify-center gap-8">
                    <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
                    <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
                    <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors"><MessageCircle size={24} /></a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
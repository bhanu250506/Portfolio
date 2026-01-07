import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
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
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-md border-slate-800/50 py-3 shadow-lg shadow-indigo-500/5"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <a href="#hero" className="flex items-center gap-2 group z-50 relative">
            <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 group-hover:bg-indigo-600/30 transition-colors">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none group-hover:text-indigo-400 transition-colors">
                Bhanu Pratap
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Portfolio
              </span>
            </div>
          </a>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-1">
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
                      className="absolute inset-0 bg-slate-800/50 rounded-lg -z-10"
                      layoutId="navbar-hover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>
                {item.name}
              </a>
            ))}
            
            {/* Contact Button */}
            <a 
              href="#contact"
              className="ml-4 px-5 py-2 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
            >
              Let's Talk
            </a>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white"
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
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
          >
            {/* Background Grid for Mobile Menu */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="flex flex-col gap-8 text-center relative z-10">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="text-3xl font-bold text-slate-300 hover:text-white hover:scale-110 transition-transform"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <a 
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/25"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
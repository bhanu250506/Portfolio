import React from 'react';
import { Github, Linkedin, Twitter, Terminal } from "lucide-react";

// Components
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillSection"; 
import { ExperienceSection } from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectSection"; 
import { ContactSection } from "../components/Contact";
import { DeveloperBackground } from '../components/DeveloperBckground';

export const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    // FIX: Forced bg-slate-950 to prevent white flash on mobile
    // Added selection:bg-indigo-500 to customize text highlighting color
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* --- 1. GLOBAL BACKGROUND ENGINE --- */}
      {/* z-0 ensures it stays behind content */}
      <div className="fixed inset-0 z-0">
        <DeveloperBackground />
      </div>
      
      {/* --- 2. CONTENT LAYER --- */}
      {/* z-10 ensures buttons and text are clickable over the canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation */}
        <Navbar />
        
        {/* Scrollable Main Content */}
        <main className="flex-grow flex flex-col gap-0">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection /> 
        </main>

        {/* --- IMPROVED FOOTER --- */}
        <footer className="py-8 relative border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand & Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Terminal size={18} className="text-indigo-400" />
                </div>
                <span className="font-bold text-slate-200">Bhanu Pratap Singh</span>
              </div>
              <span className="hidden md:block text-slate-700">|</span>
              <p className="text-sm text-slate-500">
                 Let's Work Together © {currentYear}
              </p>
            </div>

            {/* System Status & Socials */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* System Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">
                       Open To Work
                    </span>
                </div>

                {/* Social Links (Footer Version) */}
                <div className="flex gap-4">
                    <a href="https://github.com/bhanu250506" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="https://linkedin.com/in/bhanupratapsn" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};
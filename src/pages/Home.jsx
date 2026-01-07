import React from 'react';
// Components
import { Navbar } from "../components/Navbar.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import { SkillsSection } from "../components/SkillSection.jsx"; // Check filename: SkillSection.jsx vs SkillsSection.jsx
import { ExperienceSection } from "../components/ExperienceSection.jsx";
import ProjectsSection from "../components/ProjectSection.jsx"; // Check filename: ProjectSection.jsx vs ProjectsSection.jsx
import { ContactSection } from "../components/Contact.jsx"; // Add if you created this
import { DeveloperBackground } from '../components/DeveloperBckground.jsx';

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* --- 1. GLOBAL BACKGROUND ENGINE --- */}
      {/* This sits behind everything because of z-index: -10 in its CSS */}
      <DeveloperBackground/>
      
      {/* --- 2. CONTENT LAYER --- */}
      {/* z-10 ensures buttons and text are clickable over the canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
      
        
        {/* Navigation */}
        <Navbar />
        
        {/* Scrollable Main Content */}
        <main className="flex-grow flex flex-col">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
           <ContactSection /> 
        </main>

        {/* Footer */}
        <footer className="py-8 relative border-t border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                B
              </div>
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                  Bhanu Pratap Singh
              </span>
            </div>

            <div className="flex gap-6 text-sm font-medium text-slate-500">
              <p className="hover:text-indigo-500 transition-colors cursor-default">
                Designed & Built By Bhanu 
              </p>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};
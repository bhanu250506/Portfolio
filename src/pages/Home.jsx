
import { AboutSection } from "../components/AboutSection.jsx"
import { ExperienceSection } from "../components/ExperienceSection.jsx"
import { HeroSection } from "../components/HeroSection.jsx"
import {  InteractiveParticleBackground } from "../components/InteractiveParticleBackground.jsx"
import { Navbar } from "../components/Navbar.jsx"
import ProjectsSection from "../components/ProjectSection.jsx"
import { SkillsSection } from "../components/SkillSection.jsx"
import { ThemeToggle } from "../components/ThemeToggle"

export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/*  Theme Toggle */}
    <ThemeToggle/>


         {/*  Background Effect */}
         <InteractiveParticleBackground/>
        





          {/*  NavBar */}
          <Navbar/>




           {/*  Main Content */}
           <main>
          

            <HeroSection/>
            <AboutSection/>
            <SkillsSection/>
            <ProjectsSection/>
            <ExperienceSection/>
           </main>


            {/* Fotter*/}
    </div>
}
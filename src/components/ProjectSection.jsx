import React from 'react';
import { ArrowRight, ExternalLink, Github } from "lucide-react";


import prepImage from '../assets/prep.png';
import chatImage from '../assets/chat.png';
import blogImage from '../assets/Blog.png';




const cn = (...classes) => classes.filter(Boolean).join(" ");

const InteractiveParticleBackground = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
  ></div>
);

const projects = [
  {
    id: 1,
    title: "PrepAI - AI Interview Platform",
    description:
      "An intelligent learning platform to revolutionize technical interview preparation using the Google Gemini API.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Gemini API"],
    githubUrl: "https://github.com/bhanu250506/Interview_question",
    imageUrl: prepImage,
    demoUrl: null,
  },
  {
    id: 2,
    title: "MERN Stack Chat App",
    description:
      "A feature-rich, real-time 1-to-1 chat application built with the MERN stack and Socket.io.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB","Express.js" ],
    githubUrl: "https://github.com/bhanu250506/chat_app",
    imageUrl: chatImage,
    demoUrl: null,
  },
  {
    id: 3,
    title: "Full-Stack Blog App",
    description:
      "A secure, full-stack blog platform allowing users to create and manage their own blogs with JWT authentication.",
    tags: ["React", "Spring Boot", "Java", "JWT", "MySQL"],
    githubUrl: "https://github.com/bhanu250506/Blog-Application",
    imageUrl: blogImage,
    demoUrl: null,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative bg-background text-foreground">
      <div className="absolute inset-0 z-0">
        <InteractiveParticleBackground />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent works. I focus on performance, clean code, and pixel-perfect UI to build robust and user-centric applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden animate-fade-in flex flex-col",
                "bg-card border border-border"
              )}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-secondary text-xs text-secondary-foreground px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-muted text-muted-foreground text-sm flex items-center gap-2 hover:bg-muted/80 transition-colors"
                    >
                      <Github size={16} /> View GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm flex items-center gap-2 hover:bg-primary/90 transition"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
            target="_blank"
            href="https://github.com/bhanu250506?tab=repositories"
            rel="noopener noreferrer"
          >
            View All Projects <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
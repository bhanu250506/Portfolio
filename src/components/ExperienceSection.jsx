import { Briefcase } from "lucide-react";
import { InteractiveParticleBackground } from "./InteractiveParticleBackground";

const experiences = [
  {
    company: "YuvMedia – Next Level Partner",
    role: "Application Developer Intern",
    period: "Mar 2025 – Jun 2025 · 4 mos",
    location: "Ajmer, Rajasthan, India · Remote",
    description: `Learned Flutter UI development at YuvMedia, where I built a Learning Management System (LMS) UI. Gained hands-on experience with Node.js, MongoDB, and Express.js, focusing on professional, real-world projects.`,
    skills: ["Flutter", "Node.js", "Express.js", "MongoDB", "Android Studio", "Flutter UI", "Project Planning", "Problem Solving", "UX Design"]
  },
  {
    company: "Healthletic Lifestyle",
    role: "Android Developer Intern",
    period: "Jun 2025 – July 2025 · 2 mos",
    location: "Bengaluru, Karnataka, India · Remote",
    description: `Working as an Android Developer Intern building user-centric mobile applications. Responsible for Flutter development, Node.js backend, and collaborating with cross-functional teams.`,
    skills: ["Flutter", "Node.js", "Team Management", "Mobile Dev", "GitHub", "Android Studio", "UX", "Project Management", "Communication"]
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative bg-background text-foreground">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveParticleBackground />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center animate-fade-up">Experience</h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-8 bottom-0 left-5 w-1 bg-primary/30"></div>

          {/* Entries */}
          <div className="flex flex-col space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="pl-12 relative animate-fade-up"
                style={{ animationDelay: `${idx * 300}ms` }}
              >
                <div className="absolute left-[-3px] top-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white shadow-md">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div
                  className="card p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out"
                  style={{ transition: "transform 0.5s ease, box-shadow 0.5s ease" }}
                >
                  <p className="text-sm text-muted-foreground">{exp.period} · {exp.location}</p>
                  <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                  <p className="font-medium text-primary mt-1">{exp.company}</p>
                  <p className="mt-2 text-lg leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-secondary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out both;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

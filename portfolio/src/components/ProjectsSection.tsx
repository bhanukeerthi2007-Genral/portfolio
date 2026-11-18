import React, { useState } from "react";
import { portfolioData, Project } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) =>
        activeFilter === "realtime" ? !!p.realTimeHighlight : true
      );

  return (
    <section id="projects" className="py-16 max-w-6xl mx-auto px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-block mb-2">
          <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-xs font-mono">
            ⚡ Real-Time Crafts & Prototypes
          </span>
        </div>
        <h2
          className="text-3xl sm:text-5xl font-bold text-emerald-100 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>📌</span> Pinned Projects
        </h2>
        <p className="text-emerald-300/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Interactive applications, real-time distributed prototypes, and IoT systems built from the ground up.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === "all"
                ? "bg-[#FEF08A] text-amber-950 font-bold shadow-md scale-105"
                : "bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80"
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveFilter("realtime")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === "realtime"
                ? "bg-[#FEF08A] text-amber-950 font-bold shadow-md scale-105"
                : "bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80"
            }`}
          >
            ⚡ Real-Time & Live Sync
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filteredProjects.map((project: Project) => (
          <div key={project.id} className="flex">
            <StickyNote
              color={project.stickyColor}
              rotation={project.rotation}
              pinStyle={project.pinStyle}
              pinColor={
                project.stickyColor === "yellow"
                  ? "#DC2626"
                  : project.stickyColor === "green"
                  ? "#059669"
                  : project.stickyColor === "blue"
                  ? "#2563EB"
                  : "#9333EA"
              }
              title={project.title}
              badge={project.featured ? "Featured" : undefined}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Real-time Indicator Pill */}
                {project.realTimeHighlight && (
                  <div className="mb-3 inline-flex items-center gap-1.5 bg-black/10 px-2.5 py-1 rounded-md text-xs font-bold text-gray-900 border border-black/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{project.realTimeHighlight}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/70 text-gray-700 text-xs font-mono font-medium border border-black/10"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-3 text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-gray-800 hover:text-black hover:underline underline-offset-2"
                  >
                    <span>💻</span> Code Repo &rarr;
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-900 text-white font-medium hover:bg-black transition-colors shadow-sm"
                  >
                    <span>🚀</span> Live Demo
                  </a>
                )}
              </div>
            </StickyNote>
          </div>
        ))}
      </div>
    </section>
  );
}

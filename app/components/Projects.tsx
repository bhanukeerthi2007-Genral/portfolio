import React from "react";
import { portfolioData } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 rounded-full bg-blue-900/80 text-sky-300 border border-blue-700/50 text-xs font-mono">
          ⚡ Real-Time Crafts & Prototypes
        </span>
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-3 mt-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>📌</span> Featured Projects
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Real-time collaborative applications, IoT telemetry engines, and interactive web tools.
        </p>
      </div>

      {/* Grid of Projects using the reusable ProjectCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

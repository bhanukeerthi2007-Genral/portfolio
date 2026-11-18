import React from "react";
import { Project } from "../data/portfolioData";
import StickyNote from "./StickyNote";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex h-full">
      <StickyNote
        color={project.stickyColor}
        rotation={project.rotation}
        pinStyle="pin"
        pinColor={
          project.stickyColor === "yellow"
            ? "#DC2626"
            : project.stickyColor === "green"
            ? "#059669"
            : "#2563EB"
        }
        title={project.name}
        className="flex-1 flex flex-col justify-between"
      >
        <div>
          {/* Real-time indicator tag */}
          {project.realTimeTag && (
            <div className="mb-3 inline-flex items-center gap-1.5 bg-black/10 px-2.5 py-1 rounded-md text-xs font-bold text-gray-900 border border-black/10">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{project.realTimeTag}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-800 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech-stack tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-white/70 text-gray-700 text-xs font-mono font-medium border border-black/10 shadow-xs"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-3 text-xs">
          {/* "View on GitHub" link as required */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-gray-900 hover:text-black underline underline-offset-2 hover:-translate-x-0.5 transition-transform"
          >
            <span>💻</span> View on GitHub &rarr;
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-900 text-white font-medium hover:bg-black hover:scale-105 transition-all shadow-sm"
            >
              <span>🚀</span> Live Demo
            </a>
          )}
        </div>
      </StickyNote>
    </div>
  );
}

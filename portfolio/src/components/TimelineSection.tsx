import React from "react";
import { portfolioData, EducationMilestone } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function TimelineSection() {
  const { educationTimeline } = portfolioData;

  return (
    <section id="timeline" className="py-16 max-w-4xl mx-auto px-4 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-5xl font-bold text-emerald-100 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🎓</span> Education & Academic Milestones
        </h2>
        <p className="text-emerald-300/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Where I have studied, foundational knowledge acquired, and stepping stones along the journey.
        </p>
      </div>

      {/* Timeline Tree with Vine Connector */}
      <div className="relative border-l-2 border-emerald-600/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {educationTimeline.map((milestone: EducationMilestone, idx: number) => (
          <div key={idx} className="relative group">
            {/* Vine Leaf Node / Dot on the timeline */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-4 w-7 h-7 rounded-full bg-[#102619] border-2 border-emerald-400 flex items-center justify-center text-xs shadow-md">
              🌿
            </div>

            {/* Pinned Note for this milestone */}
            <StickyNote
              color={milestone.color}
              rotation={milestone.rotation}
              pinStyle="pin"
              pinColor={
                milestone.color === "yellow"
                  ? "#DC2626"
                  : milestone.color === "blue"
                  ? "#2563EB"
                  : "#DB2777"
              }
              title={milestone.degree}
              badge={milestone.period}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-semibold text-gray-800">
                  <span className="text-sm font-bold text-gray-900">
                    🏛 {milestone.institution}
                  </span>
                  <span className="text-gray-500 font-mono">📍 {milestone.location}</span>
                </div>

                <ul className="mt-3 space-y-1 text-xs text-gray-700 list-disc list-inside leading-relaxed">
                  {milestone.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="text-gray-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StickyNote>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from "react";
import { portfolioData, EducationItem } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function About() {
  const { about, skills, skillLevels, currentlyLearning, futureAspirations, educationTimeline } = portfolioData;

  return (
    <section id="about" className="py-12 max-w-5xl mx-auto px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🌿</span> About Me
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base max-w-md mx-auto mt-1">
          A little about my background, technical toolbox, and what drives me.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Photo Column: Polaroid Style with Tape */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group -rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Top Washi Tape */}
            <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 h-7 w-28 -rotate-2 z-20" />

            {/* Polaroid Paper Card */}
            <div className="bg-white p-4 pb-6 rounded shadow-2xl border border-gray-200/90 max-w-xs transition-shadow group-hover:shadow-3xl">
              <div className="overflow-hidden rounded-sm bg-emerald-950 aspect-[4/5] relative">
                <img
                  src={about.photoUrl}
                  alt={about.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo Caption */}
              <div className="mt-4 text-center">
                <p
                  className="text-gray-800 text-xl font-bold"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  {about.name} ✨
                </p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  📍 {about.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Skills Column */}
        <div className="md:col-span-7 space-y-6">
          {/* Short Bio Sticky Note */}
          <StickyNote
            color="green"
            rotation={1}
            pinStyle="pin"
            pinColor="#059669"
            title="Bio & Background"
          >
            <p className="text-gray-800 text-base leading-relaxed mb-4">
              {about.shortBio}
            </p>

            {/* Skills shown as small tags/chips */}
            <div className="pt-3 border-t border-emerald-800/10">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                Technical Skills & Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-950 border border-emerald-300 shadow-sm hover:scale-105 hover:bg-emerald-200 transition-all duration-200 cursor-default"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </StickyNote>

          {/* Skill Levels with visual progress bars */}
          <StickyNote
            color="yellow"
            rotation={-1.2}
            pinStyle="tape"
            title="Skill Proficiency"
          >
            <div className="space-y-3">
              {skillLevels.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-800">
                    <span>{s.name}</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/5">
                      {s.label} ({s.level}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden border border-black/5">
                    <div
                      className="h-full bg-gray-800/80 rounded-full transition-all duration-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </StickyNote>
        </div>
      </div>

      {/* Currently Learning & Future Aspirations Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* Currently Learning */}
        <StickyNote
          color="pink"
          rotation={-1.5}
          pinStyle="clip"
          title="Currently Learning"
        >
          <div className="space-y-3 text-xs text-gray-700">
            {currentlyLearning.map((item, idx) => (
              <div key={idx} className="p-2 bg-white/50 rounded border border-pink-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-pink-900">{item.topic}</span>
                  <span className="text-[10px] font-bold uppercase bg-pink-200 px-1.5 py-0.2 rounded text-pink-950">
                    {item.badge}
                  </span>
                </div>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </StickyNote>

        {/* Future Aspirations */}
        <StickyNote
          color="blue"
          rotation={1.6}
          pinStyle="pin"
          pinColor="#2563EB"
          title="Future Aspirations"
        >
          <div className="space-y-3 text-xs text-gray-700">
            {futureAspirations.map((item, idx) => (
              <div key={idx} className="p-2 bg-white/50 rounded border border-sky-200">
                <p className="font-bold text-sky-950 mb-0.5">
                  {item.icon} {item.title}
                </p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </StickyNote>
      </div>

      {/* Where I Studied (Education Timeline) */}
      <div className="space-y-4">
        <h3
          className="text-2xl sm:text-3xl font-bold text-emerald-100 flex items-center gap-2 mb-4"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🎓</span> Where I Studied (Timeline)
        </h3>

        <div className="relative border-l-2 border-emerald-600/40 ml-4 pl-6 space-y-6">
          {educationTimeline.map((item: EducationItem, idx: number) => (
            <div key={idx} className="relative">
              {/* Vine Node */}
              <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-[#102619] border-2 border-emerald-400 flex items-center justify-center text-xs shadow-md">
                🌿
              </div>

              <StickyNote
                color={item.stickyColor}
                rotation={item.rotation}
                pinStyle="pin"
                pinColor={item.stickyColor === "yellow" ? "#DC2626" : "#2563EB"}
                title={item.degree}
                badge={item.period}
              >
                <p className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                  🏛 {item.school} &bull; 📍 {item.location}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {item.details}
                </p>
              </StickyNote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

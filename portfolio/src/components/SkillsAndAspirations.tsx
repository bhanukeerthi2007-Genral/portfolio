import React from "react";
import { portfolioData } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function SkillsAndAspirations() {
  const { skillCategories, learningAndAspirations } = portfolioData;

  return (
    <section id="skills" className="py-16 max-w-6xl mx-auto px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-5xl font-bold text-emerald-100 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🌱</span> Skills, Learning & Aspirations
        </h2>
        <p className="text-emerald-300/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          An honest index of what I build with today, what I am studying tonight, and where I aim to go tomorrow.
        </p>
      </div>

      {/* Part 1: Skill Levels by Category */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <h3 className="text-emerald-100 font-bold text-xl tracking-tight">
            Skill Levels & Core Stack
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <StickyNote
              key={idx}
              color={cat.color}
              rotation={cat.rotation}
              pinStyle="pin"
              pinColor={cat.color === "yellow" ? "#EA580C" : cat.color === "green" ? "#16A34A" : "#2563EB"}
              title={cat.category}
            >
              <div className="space-y-3.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-800">
                      <span>{skill.name}</span>
                      <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-black/5 text-gray-700">
                        {skill.levelLabel} ({skill.level}%)
                      </span>
                    </div>
                    {/* Visual paper-ruled progress bar */}
                    <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden border border-black/5">
                      <div
                        className="h-full bg-gray-800/80 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </StickyNote>
          ))}
        </div>
      </div>

      {/* Part 2: Currently Learning & Future Aspirations Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Currently Learning */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h3 className="text-emerald-100 font-bold text-xl tracking-tight">
              Currently Learning & Exploring
            </h3>
          </div>

          <div className="space-y-4">
            {learningAndAspirations.currentlyLearning.map((item, idx) => (
              <StickyNote
                key={idx}
                color={item.color as any}
                rotation={item.rotation}
                pinStyle="tape"
                title={item.topic}
                badge={item.badge}
              >
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {item.notes}
                </p>
              </StickyNote>
            ))}
          </div>
        </div>

        {/* Future Aspirations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <h3 className="text-emerald-100 font-bold text-xl tracking-tight">
              Future Aspirations & Visions
            </h3>
          </div>

          <div className="space-y-4">
            {learningAndAspirations.futureAspirations.map((aspiration, idx) => (
              <StickyNote
                key={idx}
                color={aspiration.color as any}
                rotation={aspiration.rotation}
                pinStyle="clip"
                title={`${aspiration.icon} ${aspiration.title}`}
              >
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {aspiration.description}
                </p>
              </StickyNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

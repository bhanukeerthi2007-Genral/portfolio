import React from "react";
import { portfolioData } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-16 max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-10">
        <h2
          className="text-3xl sm:text-4xl font-bold text-emerald-100 flex items-center justify-center gap-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🌿</span> About Me & My Craft
        </h2>
        <p className="text-emerald-300/80 text-sm max-w-md mx-auto mt-1">
          A snapshot into my journey, core values, and creative workbench.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Polaroid Photo Frame with Tape */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group -rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Top Washi Tape */}
            <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 h-7 w-28 -rotate-2 z-20" />

            {/* Polaroid Paper Card */}
            <div className="bg-white p-4 pb-6 rounded shadow-2xl border border-gray-200/80 max-w-xs transition-shadow group-hover:shadow-3xl">
              <div className="overflow-hidden rounded-sm bg-emerald-950 aspect-[4/5] relative">
                {/* User's Photo */}
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Soft gradient sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Handwritten Photo Caption */}
              <div className="mt-4 text-center">
                <p
                  className="text-gray-800 text-lg font-bold"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  {personal.name} ✨
                </p>
                <p className="text-xs text-gray-500 font-mono flex items-center justify-center gap-1 mt-0.5">
                  <span>📍</span> {personal.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Short Bio & Quick Memos */}
        <div className="md:col-span-7 space-y-6">
          {/* Main Short Bio Note */}
          <StickyNote
            color="green"
            rotation={1}
            pinStyle="pin"
            pinColor="#059669"
            title="The Story So Far..."
            badge="Bio"
          >
            <p className="text-gray-800 text-base leading-relaxed mb-4">
              {personal.shortBio}
            </p>
            <div className="pt-2 border-t border-emerald-800/10 flex flex-wrap gap-2 text-xs font-medium text-emerald-900">
              <span className="bg-emerald-200/60 px-2.5 py-1 rounded-full">🌱 Nature Explorer</span>
              <span className="bg-emerald-200/60 px-2.5 py-1 rounded-full">💻 Systems & Full-Stack</span>
              <span className="bg-emerald-200/60 px-2.5 py-1 rounded-full">⚡ Real-Time Architectures</span>
            </div>
          </StickyNote>

          {/* Sub Notes: Quick Trivia / What I Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StickyNote
              color="pink"
              rotation={-1.5}
              pinStyle="clip"
              title="My Working Principles"
            >
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Simplicity over needless abstraction.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Feedback loops must be instant & delightful.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Tech should empower human harmony with nature.</span>
                </li>
              </ul>
            </StickyNote>

            <StickyNote
              color="blue"
              rotation={1.8}
              pinStyle="pin"
              pinColor="#3B82F6"
              title="Beyond the Keyboard"
            >
              <p className="text-xs text-gray-700 leading-relaxed">
                Gardening & microclimate observation, listening to ambient nature soundscapes, reading technical literature, and tinkering with microcontrollers.
              </p>
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
}

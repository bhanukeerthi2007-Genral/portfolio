import React from "react";
import { portfolioData } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function Hero() {
  const { name, oneLineIntro, github, linkedin } = portfolioData.about;

  return (
    <section
      id="hero"
      className="pt-10 sm:pt-16 pb-12 sm:pb-20 flex flex-col items-center justify-center text-center relative px-4"
    >
      {/* Floating Status Pill */}
      <div className="mb-6 -rotate-2 hover:rotate-0 transition-transform duration-300">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2444]/90 text-sky-300 border border-blue-500/30 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          🌱 Open for collaborative projects & internships
        </span>
      </div>

      {/* Main Hero Sticky Note Card */}
      <div className="w-full max-w-3xl">
        <StickyNote
          color="yellow"
          rotation={-1}
          pinStyle="pin"
          pinColor="#DC2626"
          className="p-8 sm:p-12 text-center"
        >
          <div className="space-y-4">
            <span
              className="text-amber-800 text-xl sm:text-2xl font-bold block"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              👋 Hello World, I am
            </span>

            {/* My Name in Large Text */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              {name}
            </h1>

            {/* Sub-badge */}
            <div className="inline-block px-3 py-1 bg-amber-200/60 rounded-md text-amber-900 font-semibold text-xs sm:text-sm tracking-wider uppercase">
              1st-Year CS @ BIT Bengaluru &bull; Embedded IoT &amp; AI Full-Stack
            </div>

            {/* My One-Line Intro */}
            <p className="text-base sm:text-xl text-gray-700 max-w-xl mx-auto font-medium leading-relaxed pt-2">
              &ldquo;{oneLineIntro}&rdquo;
            </p>

            {/* Two Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              {/* Button 1: View my work */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-[#1a3d6b] hover:bg-[#132f54] text-sky-50 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base group"
              >
                <span className="w-2 h-2 rounded-full bg-sky-300 group-hover:scale-125 transition-transform" />
                View my work
              </a>

              {/* Button 2: Contact me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#FFEDD5] hover:bg-[#FED7AA] text-orange-950 font-semibold px-6 py-3 rounded-lg border border-orange-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base"
              >
                <span>📬</span>
                Contact me
              </a>
            </div>

            {/* Quick Profile Chips */}
            <div className="pt-2 flex items-center justify-center gap-3 text-xs">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 hover:bg-white text-gray-900 border border-black/10 shadow-xs hover:scale-105 transition-all font-mono font-medium"
              >
                <span>💻</span> GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 hover:bg-white text-sky-900 border border-black/10 shadow-xs hover:scale-105 transition-all font-mono font-medium"
              >
                <span>💼</span> LinkedIn
              </a>
            </div>
          </div>
        </StickyNote>
      </div>
    </section>
  );
}

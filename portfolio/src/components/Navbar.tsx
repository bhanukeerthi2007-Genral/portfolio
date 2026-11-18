import React from "react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-40 max-w-5xl mx-auto px-4">
      <nav className="bg-[#193825]/90 backdrop-blur-md border border-emerald-800/60 rounded-full px-5 py-2.5 shadow-2xl flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-sm font-bold shadow-inner">
            🍃
          </span>
          <span className="font-bold text-emerald-100 tracking-wide text-sm sm:text-base font-mono">
            {portfolioData.personal.name}
          </span>
        </a>

        {/* Navigation tabs styled as pinned tags */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
          <a
            href="#about"
            className="px-2.5 py-1 rounded-md text-emerald-200/90 hover:text-white hover:bg-emerald-800/40 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="px-2.5 py-1 rounded-md text-emerald-200/90 hover:text-white hover:bg-emerald-800/40 transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="px-2.5 py-1 rounded-md text-emerald-200/90 hover:text-white hover:bg-emerald-800/40 transition-colors"
          >
            Skills
          </a>
          <a
            href="#timeline"
            className="hidden sm:inline-block px-2.5 py-1 rounded-md text-emerald-200/90 hover:text-white hover:bg-emerald-800/40 transition-colors"
          >
            Timeline
          </a>
          <a
            href="#contact"
            className="bg-[#FEF08A] text-amber-950 font-semibold px-3 py-1 rounded-full shadow-sm hover:bg-[#FDE047] hover:scale-105 transition-all text-xs flex items-center gap-1"
          >
            <span>📬</span> Let's Talk
          </a>
        </div>
      </nav>
    </header>
  );
}

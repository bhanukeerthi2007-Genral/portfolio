import React from "react";
import { portfolioData } from "../data/portfolioData";

interface NavbarProps {
  gameActive?: boolean;
  onToggleGame?: () => void;
}

export default function Navbar({ gameActive = false, onToggleGame }: NavbarProps) {
  const { name } = portfolioData.about;

  return (
    <header className="sticky top-4 z-40 max-w-5xl mx-auto px-4">
      <nav className="bg-[#0c1e38]/90 backdrop-blur-md border border-blue-800/50 rounded-full px-5 py-2.5 shadow-2xl flex items-center justify-between transition-all duration-300">
        {/* Left: My Name */}
        <a
          href="#hero"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 text-sm font-bold shadow-inner">
            🏔️
          </span>
          <span className="font-bold text-sky-100 tracking-wide text-sm sm:text-base font-mono">
            {name}
          </span>
        </a>

        {/* Right: Links */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-medium">
          <a
            href="#about"
            className="px-2 py-1 text-sky-200/90 hover:text-white hover:bg-blue-800/40 rounded-md transition-all duration-200 hover:-translate-y-0.5"
          >
            About
          </a>
          <a
            href="#projects"
            className="px-2 py-1 text-sky-200/90 hover:text-white hover:bg-blue-800/40 rounded-md transition-all duration-200 hover:-translate-y-0.5"
          >
            Projects
          </a>
          <a
            href="#community-board"
            className="hidden md:inline-block px-2 py-1 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/40 rounded-md transition-all duration-200 hover:-translate-y-0.5 font-mono"
          >
            💬 Board
          </a>

          {/* 🎮 Game Toggle Button */}
          <button
            onClick={onToggleGame}
            className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all duration-200 flex items-center gap-1 shadow-md ${
              gameActive
                ? "bg-green-400 text-green-950 hover:bg-green-300 ring-2 ring-green-300/60 animate-pulse"
                : "bg-purple-700/80 text-purple-100 hover:bg-purple-600 hover:scale-105"
            }`}
            title={gameActive ? "Stop Alpine Eagle game" : "Play Alpine Eagle background game"}
          >
            <span>{gameActive ? "🛑" : "🎮"}</span>
            <span className="hidden sm:inline">{gameActive ? "Stop Game" : "Play Game"}</span>
          </button>

          <a
            href="#contact"
            className="bg-[#FEF08A] text-amber-950 font-bold px-3 py-1 rounded-full shadow-sm hover:bg-[#FDE047] hover:scale-105 transition-all duration-200 flex items-center gap-1"
          >
            <span>📬</span> Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

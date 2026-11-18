import React from "react";

export default function NatureBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Botanical Corner Vines & Leaves SVG - Top Left */}
      <svg
        className="absolute -top-12 -left-12 w-80 h-80 text-emerald-800/25 transform rotate-12 transition-transform duration-1000 hover:rotate-6"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M42.7,-72.6C54.6,-66.4,63.1,-54.1,70.2,-41.2C77.4,-28.3,83.1,-14.2,82.8,-0.2C82.4,13.8,76,27.6,67.8,39.6C59.6,51.6,49.6,61.8,37.6,69.5C25.6,77.2,11.6,82.4,-1.8,85.5C-15.2,88.6,-28.9,89.6,-40.7,83.5C-52.5,77.4,-62.4,64.2,-70.7,50.4C-79,36.6,-85.7,22.2,-87.3,7.2C-88.9,-7.8,-85.4,-23.4,-77.8,-36.8C-70.2,-50.2,-58.5,-61.4,-45.3,-67.2C-32.1,-73,-17.4,-73.4,-1.4,-71C14.6,-68.6,30.8,-78.8,42.7,-72.6Z" transform="translate(100 100)" />
      </svg>

      {/* Botanical Motif - Bottom Right */}
      <svg
        className="absolute -bottom-16 -right-16 w-96 h-96 text-emerald-900/30 transform -rotate-12"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M47.7,-64.4C60.9,-55.8,70.1,-41.4,75.4,-25.7C80.7,-10,82.1,7,77.3,22.3C72.5,37.6,61.5,51.2,47.8,61.2C34.1,71.2,17.7,77.6,0.3,77.2C-17.1,76.8,-32.7,69.6,-45.7,59.3C-58.7,49,-69.1,35.6,-74.6,20.2C-80.1,4.8,-80.7,-12.6,-74.4,-27.1C-68.1,-41.6,-54.9,-53.2,-40.7,-61.4C-26.5,-69.6,-11.3,-74.4,2.9,-78.4C17.1,-82.4,34.5,-73,47.7,-64.4Z" transform="translate(100 100)" />
      </svg>

      {/* Floating Leaves (SVG gently swaying) */}
      <div className="absolute top-[18%] left-[8%] animate-float-slow opacity-60">
        <svg className="w-10 h-10 text-emerald-400/40 transform rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
          <path d="M9.5 14.5L5 21" stroke="#064E3B" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-[45%] right-[10%] animate-float-delayed opacity-50">
        <svg className="w-8 h-8 text-lime-400/35 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
          <path d="M9.5 14.5L5 21" stroke="#064E3B" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-[72%] left-[12%] animate-float-slow opacity-40">
        <svg className="w-12 h-12 text-emerald-300/30 transform rotate-135" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
          <path d="M9.5 14.5L5 21" stroke="#064E3B" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Soft warm forest dapples / sunlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-lime-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

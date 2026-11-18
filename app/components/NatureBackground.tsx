import React from "react";

export default function NatureBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Deep Midnight Blue Mountain Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040b17] via-[#08182f] to-[#061224] opacity-95" />

      {/* Atmospheric Moonlit Mountain Glow (Cyan & Ice Blue) */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[16%] right-[12%] w-[450px] h-[320px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[25%] left-[10%] w-[350px] h-[250px] bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* 2. Distant High Mountain Summits (Layer 1 - Deep Misty Navy Peaks) */}
      <svg
        className="absolute bottom-[22%] sm:bottom-[18%] left-0 w-full h-[320px] sm:h-[460px] text-[#0b1c36]/60"
        viewBox="0 0 1440 400"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,280 L180,140 L340,250 L520,90 L720,240 L900,110 L1080,260 L1260,130 L1440,270 L1440,400 L0,400 Z" />
      </svg>

      {/* 3. Midground Craggy Alpine Ridges (Layer 2 - Slate Blue Ridges) */}
      <svg
        className="absolute bottom-[10%] sm:bottom-[8%] left-0 w-full h-[280px] sm:h-[390px] text-[#0f274a]/85"
        viewBox="0 0 1440 350"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,220 L140,110 L280,210 L440,80 L620,230 L800,100 L980,220 L1160,90 L1320,200 L1440,130 L1440,350 L0,350 Z" />
      </svg>

      {/* Mountain Ridge Icy Snow Highlights */}
      <svg
        className="absolute bottom-[10%] sm:bottom-[8%] left-0 w-full h-[280px] sm:h-[390px] text-sky-200/20"
        viewBox="0 0 1440 350"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <polygon points="440,80 415,125 465,125" />
        <polygon points="800,100 775,140 825,140" />
        <polygon points="1160,90 1135,135 1185,135" />
        <polygon points="140,110 115,145 165,145" />
      </svg>

      {/* 4. Alpine Valley Cool Blue Mist Layer */}
      <div className="absolute bottom-[13%] left-0 right-0 h-32 bg-gradient-to-t from-[#091a33]/90 via-[#0a2040]/50 to-transparent pointer-events-none" />

      {/* 5. Foreground Mountain Pine Tree Silhouettes (Layer 3 - Deep Night Blue Forest) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[150px] sm:h-[210px] text-[#030914]"
        viewBox="0 0 1440 200"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,130 L30,90 L60,130 L90,80 L120,130 L150,95 L180,135 L210,75 L240,130 L270,90 L300,135 L330,70 L360,130 L390,85 L420,135 L450,80 L480,130 L510,90 L540,135 L570,75 L600,130 L630,85 L660,135 L690,70 L720,130 L750,90 L780,135 L810,80 L840,130 L870,95 L900,135 L930,75 L960,130 L990,85 L1020,135 L1050,70 L1080,130 L1110,90 L1140,135 L1170,80 L1200,130 L1230,95 L1260,135 L1290,75 L1320,130 L1350,85 L1380,135 L1410,70 L1440,120 L1440,200 L0,200 Z" />
      </svg>

      {/* 6. Subtle Floating Mountain Breeze Particles (Cool Cyan / Icy Blue) */}
      <div className="absolute top-[18%] left-[7%] animate-float-slow opacity-60">
        <svg className="w-8 h-8 text-sky-400/40 transform rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
        </svg>
      </div>

      <div className="absolute top-[40%] right-[9%] animate-float-delayed opacity-50">
        <svg className="w-7 h-7 text-cyan-300/35 transform -rotate-15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
        </svg>
      </div>

      <div className="absolute top-[65%] left-[10%] animate-float-slow opacity-40">
        <svg className="w-9 h-9 text-blue-300/35 transform rotate-135" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 16 5 21C10 21 16 18 18 9C18 8.7 17.5 8 17 8Z" />
        </svg>
      </div>
    </div>
  );
}

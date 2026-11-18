import React from "react";

export type StickyColor = "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
export type PinStyle = "pin" | "tape" | "clip" | "none";

interface StickyNoteProps {
  children: React.ReactNode;
  color?: StickyColor;
  rotation?: number;
  pinStyle?: PinStyle;
  pinColor?: string;
  className?: string;
  title?: string;
  badge?: string;
}

const colorMap: Record<StickyColor, { bg: string; border: string; titleColor: string }> = {
  yellow: {
    bg: "bg-[#FFF9C4]",
    border: "border-[#FBC02D]/40",
    titleColor: "text-[#78540B]",
  },
  green: {
    bg: "bg-[#DCFCE7]",
    border: "border-[#86EFAC]/60",
    titleColor: "text-[#166534]",
  },
  pink: {
    bg: "bg-[#FFE4E6]",
    border: "border-[#FDA4AF]/60",
    titleColor: "text-[#9F1239]",
  },
  blue: {
    bg: "bg-[#E0F2FE]",
    border: "border-[#7DD3FC]/60",
    titleColor: "text-[#0369A1]",
  },
  purple: {
    bg: "bg-[#F3E8FF]",
    border: "border-[#D8B4FE]/60",
    titleColor: "text-[#6B21A8]",
  },
  orange: {
    bg: "bg-[#FFEDD5]",
    border: "border-[#FDBA74]/60",
    titleColor: "text-[#C2410C]",
  },
};

export default function StickyNote({
  children,
  color = "yellow",
  rotation = 0,
  pinStyle = "pin",
  pinColor = "#EF4444",
  className = "",
  title,
  badge,
}: StickyNoteProps) {
  const scheme = colorMap[color] || colorMap.yellow;

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`sticky-card relative rounded-sm p-6 text-gray-800 ${scheme.bg} border ${scheme.border} ${className}`}
    >
      {/* Top Decorator: Pin, Tape or Clip */}
      {pinStyle === "pin" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="pin-head" style={{ backgroundColor: pinColor }} />
        </div>
      )}

      {pinStyle === "tape" && (
        <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 w-24 -rotate-1 z-10" />
      )}

      {pinStyle === "clip" && (
        <div className="paper-clip -top-4 right-6 z-10" />
      )}

      {/* Header if title or badge exists */}
      {(title || badge) && (
        <div className="flex items-center justify-between gap-3 mb-3 border-b border-black/10 pb-2">
          {title && (
            <h3
              className={`font-bold text-xl sm:text-2xl ${scheme.titleColor}`}
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              {title}
            </h3>
          )}
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 text-gray-700 border border-black/10">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Note Content */}
      <div className="relative text-sm leading-relaxed text-gray-800">
        {children}
      </div>
    </div>
  );
}

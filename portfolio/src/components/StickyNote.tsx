import React from "react";

export type NoteColor = "yellow" | "green" | "pink" | "blue" | "purple" | "orange" | "kraft";
export type PinStyle = "pin" | "tape" | "clip" | "none";

interface StickyNoteProps {
  children: React.ReactNode;
  color?: NoteColor;
  rotation?: number;
  pinStyle?: PinStyle;
  pinColor?: string;
  className?: string;
  title?: string;
  badge?: string;
  onClick?: () => void;
}

const colorStyles: Record<NoteColor, { bg: string; border: string; headerText: string }> = {
  yellow: {
    bg: "bg-[#FFF9C4]",
    border: "border-[#FBC02D]/40",
    headerText: "text-[#78540B]",
  },
  green: {
    bg: "bg-[#DCFCE7]",
    border: "border-[#86EFAC]/60",
    headerText: "text-[#166534]",
  },
  pink: {
    bg: "bg-[#FFE4E6]",
    border: "border-[#FDA4AF]/60",
    headerText: "text-[#9F1239]",
  },
  blue: {
    bg: "bg-[#E0F2FE]",
    border: "border-[#7DD3FC]/60",
    headerText: "text-[#0369A1]",
  },
  purple: {
    bg: "bg-[#F3E8FF]",
    border: "border-[#D8B4FE]/60",
    headerText: "text-[#6B21A8]",
  },
  orange: {
    bg: "bg-[#FFEDD5]",
    border: "border-[#FDBA74]/60",
    headerText: "text-[#C2410C]",
  },
  kraft: {
    bg: "bg-[#EFE6D5]",
    border: "border-[#D4C5A9]/70",
    headerText: "text-[#5C4D3C]",
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
  onClick,
}: StickyNoteProps) {
  const selectedColor = colorStyles[color] || colorStyles.yellow;

  return (
    <div
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      className={`sticky-shadow relative rounded-sm p-6 text-gray-800 transition-all duration-300 ${selectedColor.bg} border ${selectedColor.border} ${className}`}
    >
      {/* Pin / Tape / Clip Decorator */}
      {pinStyle === "pin" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div
            className="pin-head cursor-pointer"
            style={{ backgroundColor: pinColor }}
          />
        </div>
      )}

      {pinStyle === "tape" && (
        <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 -rotate-1 z-10 opacity-80" />
      )}

      {pinStyle === "clip" && (
        <div className="paper-clip -top-4 right-6 z-10" />
      )}

      {/* Header with Title and Optional Badge */}
      {(title || badge) && (
        <div className="flex items-start justify-between gap-3 mb-4 border-b border-black/10 pb-2">
          {title && (
            <h3
              className={`font-bold text-xl tracking-tight ${selectedColor.headerText}`}
              style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: "1.55rem" }}
            >
              {title}
            </h3>
          )}
          {badge && (
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 text-gray-700 border border-black/10 shadow-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Note Body */}
      <div className="relative z-0 text-sm leading-relaxed text-gray-800">
        {children}
      </div>

      {/* Dog-ear fold shadow simulation in bottom right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 overflow-hidden pointer-events-none">
        <div className="w-6 h-6 bg-black/5 -rotate-45 transform origin-bottom-right" />
      </div>
    </div>
  );
}

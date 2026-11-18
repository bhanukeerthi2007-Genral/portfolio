import React from "react";
import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  const { footerName } = portfolioData.about;

  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-blue-900/40 text-center text-xs text-sky-300/80 font-mono space-y-1">
      <p className="font-semibold text-sky-200 text-sm">
        &copy; 2026 {footerName}
      </p>
      <p className="text-[11px] text-blue-400/60">
        🏔️ Bluish Mountain Aesthetic &bull; Sticky Notes &bull; Next.js & Tailwind CSS
      </p>
    </footer>
  );
}

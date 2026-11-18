import React from "react";
import { portfolioData } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function HeroSection() {
  const { personal, heroButtons } = portfolioData;

  return (
    <section id="hero" className="pt-12 pb-16 sm:pt-20 sm:pb-24 flex flex-col items-center justify-center relative">
      {/* Floating Status Note */}
      <div className="mb-6 -rotate-2 hover:rotate-0 transition-transform">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e442e]/90 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {personal.status}
        </span>
      </div>

      {/* Main Hero Sticky Board / Notice Card */}
      <div className="w-full max-w-3xl px-4">
        <StickyNote
          color="yellow"
          rotation={-0.8}
          pinStyle="pin"
          pinColor="#DC2626"
          className="p-8 sm:p-12"
        >
          {/* Top greeting note header */}
          <div className="text-center space-y-4">
            <span
              className="text-amber-800 text-lg sm:text-2xl font-bold tracking-wide"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              👋 Hello World, I am
            </span>

            {/* 1. Name */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              {personal.name}
            </h1>

            {/* Sub-badge / Role */}
            <div className="inline-block px-3 py-1 bg-amber-200/60 rounded-md text-amber-900 font-semibold text-xs sm:text-sm tracking-wider uppercase">
              {personal.role}
            </div>

            {/* 1. One-line intro */}
            <p className="text-base sm:text-xl text-gray-700 max-w-xl mx-auto font-medium leading-relaxed pt-2">
              &ldquo;{personal.oneLinerIntro}&rdquo;
            </p>

            {/* 1. Two Primary Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              {/* Button 1: View Projects */}
              <a
                href={heroButtons.primary.href}
                className="group relative inline-flex items-center gap-2 bg-[#2D5A3F] hover:bg-[#234631] text-emerald-50 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 group-hover:scale-125 transition-transform" />
                {heroButtons.primary.text}
              </a>

              {/* Button 2: Contact Me / Leave a Note */}
              <a
                href={heroButtons.secondary.href}
                className="inline-flex items-center gap-2 bg-[#FFEDD5] hover:bg-[#FED7AA] text-orange-950 font-semibold px-6 py-3 rounded-lg border border-orange-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
              >
                <span>📬</span>
                {heroButtons.secondary.text}
              </a>

              {/* Optional CV Download */}
              {heroButtons.resume && (
                <a
                  href={heroButtons.resume.href}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 underline decoration-dashed underline-offset-4 px-2 py-1 transition-colors"
                >
                  {heroButtons.resume.text}
                </a>
              )}
            </div>
          </div>
        </StickyNote>
      </div>

      {/* Decorative Small Floating Sticky Accents */}
      <div className="hidden lg:block absolute left-8 top-32 rotate-6 w-48">
        <StickyNote color="green" rotation={6} pinStyle="tape" className="p-3 text-xs">
          <p className="font-bold text-emerald-900 mb-1">🌿 Philosophy</p>
          <p className="text-gray-700">Code with organic clarity, minimal friction, and tactile charm.</p>
        </StickyNote>
      </div>

      <div className="hidden lg:block absolute right-8 top-36 -rotate-6 w-48">
        <StickyNote color="blue" rotation={-6} pinStyle="pin" pinColor="#2563EB" className="p-3 text-xs">
          <p className="font-bold text-sky-900 mb-1">⚡ Real-Time First</p>
          <p className="text-gray-700">Reactive websockets, live state sync & fast feedback loops.</p>
        </StickyNote>
      </div>
    </section>
  );
}

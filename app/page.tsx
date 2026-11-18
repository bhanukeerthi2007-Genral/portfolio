"use client";

import React from "react";
import InteractiveCursor from "./components/InteractiveCursor";
import NatureBackground from "./components/NatureBackground";
import FireflyEffect from "./components/FireflyEffect";
import AmbientSoundscape from "./components/AmbientSoundscape";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ArcadeZone from "./components/ArcadeZone";
import InteractiveBoard from "./components/InteractiveBoard";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 0. Custom Interactive Nature & Stardust Cursor */}
      <InteractiveCursor />

      {/* 1. Bluish Mountain Background with Peaks, Mist, and Forest Silhouettes */}
      <NatureBackground />

      {/* Ambient Stardust Fireflies */}
      <FireflyEffect />

      {/* 2. Procedural Alpine Audio Studio (5 Relaxing Music & Nature Tracks) */}
      <AmbientSoundscape />

      {/* 3. Floating Navbar */}
      <Navbar />

      {/* 4. Portfolio Content: Sticky Notes & Sections */}
      <main className="relative z-10 space-y-16 sm:space-y-24 mt-4">
        {/* Hero Section */}
        <Hero />

        {/* About Section (Bio, Polaroid Photo, Skills, Learning, Timeline) */}
        <About />

        {/* Projects Section (CCTV, Macro Keypad, Class Timetable, Solar Telemetry) */}
        <Projects />

        {/* Interactive Fun Stuff: 🕹️ Multi-Game Arcade & Hall of Fame Leaderboard */}
        <ArcadeZone />

        {/* Interactive Fun Stuff: 💬 Live Community Sticky Board */}
        <InteractiveBoard />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import React from "react";
import NatureBackground from "../components/NatureBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsAndAspirations from "../components/SkillsAndAspirations";
import TimelineSection from "../components/TimelineSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen pb-16 overflow-hidden">
      {/* Nature Ambiance & Ambient Botanical Graphics */}
      <NatureBackground />

      {/* Top Floating Cork Navbar */}
      <div className="relative z-30 pt-4">
        <Navbar />
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 space-y-12 sm:space-y-20">
        {/* 1. Hero: Name, 1-Line Intro, 2 Action Buttons */}
        <HeroSection />

        {/* 2. About Me: Polaroid Photo & Short Bio */}
        <AboutSection />

        {/* 3. Real-Time Projects Built */}
        <ProjectsSection />

        {/* 4. Skills, Currently Learning & Future Aspirations */}
        <SkillsAndAspirations />

        {/* 5. Education & Timeline (Where I Studied) */}
        <TimelineSection />

        {/* 6. Contact & Account Links */}
        <ContactSection />
      </div>
    </main>
  );
}

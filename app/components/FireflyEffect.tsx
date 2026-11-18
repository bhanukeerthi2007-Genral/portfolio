"use client";

import React, { useEffect, useState } from "react";

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FireflyEffect() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate 18 atmospheric fireflies
    const generated: Firefly[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      size: 3 + Math.random() * 4,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setFireflies(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] opacity-70 animate-pulse pointer-events-none"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

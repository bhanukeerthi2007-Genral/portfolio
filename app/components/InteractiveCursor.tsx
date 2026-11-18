"use client";

import React, { useEffect, useRef, useState } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    // Only run on fine-pointer devices (laptops, desktops with mice), ignore touchscreens
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let animId: number;
    let nextRippleId = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Add trailing trail sparkles
      if (Math.random() < 0.6) {
        const colors = [
          "rgba(56, 189, 248, ", // Cyan
          "rgba(125, 211, 252, ", // Sky
          "rgba(253, 224, 71, ",  // Warm Golden Amber
          "rgba(147, 197, 253, ", // Ice blue
        ];
        sparklesRef.current.push({
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          vx: (Math.random() * 1.5 - 0.75),
          vy: Math.random() * -1.2 - 0.3,
          size: Math.random() * 2.5 + 1.5,
          alpha: 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
        });

        // Limit maximum active sparkles for 60fps performance
        if (sparklesRef.current.length > 35) {
          sparklesRef.current.shift();
        }
      }

      // Check for hoverable elements under cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest(
          'a, button, input, textarea, select, [role="button"], .sticky-card, .nature-feed-btn, .like-btn'
        );
        if (clickable) {
          setIsHovering(true);
          if (clickable.tagName === "BUTTON" || clickable.getAttribute("role") === "button") {
            setHoverType("button");
          } else if (clickable.tagName === "A") {
            setHoverType("link");
          } else if (clickable.classList.contains("sticky-card")) {
            setHoverType("note");
          } else {
            setHoverType("clickable");
          }
        } else {
          setIsHovering(false);
          setHoverType(null);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Spawn click shockwave ripple
      const id = ++nextRippleId;
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      // Burst of particles on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.2;
        const speed = Math.random() * 2.5 + 1.5;
        sparklesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 2,
          alpha: 1.0,
          color: "rgba(56, 189, 248, ",
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Render loop for smooth spring interpolation (LERP) & sparkles
    const render = () => {
      // Smooth ring lerp follow
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Draw trail sparkles on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
          const s = sparklesRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.025;
          s.size *= 0.96;

          if (s.alpha <= 0 || s.size <= 0.3) {
            sparklesRef.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${s.alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* 1. Sparkle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      />

      {/* 2. Expanding Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-50 rounded-full border-2 border-sky-400/80 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 38,
            height: 38,
            transform: "translate(-50%, -50%)",
            animationDuration: "550ms",
          }}
        />
      ))}

      {/* 3. Smooth Spring Trailing Ring Aura */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovering
            ? "w-12 h-12 border-2 border-amber-300 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-110"
            : isClicking
            ? "w-7 h-7 border-2 border-sky-300 bg-sky-500/30 scale-90"
            : "w-9 h-9 border border-sky-400/60 bg-sky-500/10 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
        }`}
        style={{ willChange: "transform" }}
      >
        {isHovering && hoverType === "note" && (
          <span className="text-[10px] select-none pointer-events-none">📌</span>
        )}
        {isHovering && hoverType === "link" && (
          <span className="text-[10px] select-none pointer-events-none">✨</span>
        )}
      </div>

      {/* 4. Precision Inner Cursor Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovering
            ? "w-2.5 h-2.5 bg-amber-300 shadow-[0_0_8px_#fde047]"
            : isClicking
            ? "w-3 h-3 bg-white shadow-[0_0_10px_#ffffff]"
            : "w-2 h-2 bg-sky-400 shadow-[0_0_6px_#38bdf8]"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}

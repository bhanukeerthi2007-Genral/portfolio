"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import StickyNote from "./StickyNote";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 16;
const INITIAL_SNAKE: Position[] = [
  { x: 8, y: 8 },
  { x: 8, y: 9 },
  { x: 8, y: 10 },
];
const INITIAL_DIR: Direction = "UP";

// Sound synthesis via Web Audio API (100% zero external dependencies)
function playBeep(frequency: number, type: OscillatorType = "sine", duration = 0.08) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors on un-interacted browsers
  }
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIR);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [foodType, setFoodType] = useState<string>("🍎");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(130); // ms per step
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const directionRef = useRef<Direction>(direction);
  directionRef.current = direction;

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bhanu_snake_high");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  // Generate random food
  const spawnFood = useCallback((currentSnake: Position[]): Position => {
    const foods = ["🍎", "🍒", "🍃", "🍄", "🍓"];
    setFoodType(foods[Math.floor(Math.random() * foods.length)]);

    let newFood: Position;
    let collision: boolean;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
    } while (collision);
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIR);
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setFood({ x: 5, y: 5 });
    if (soundEnabled) playBeep(440, "triangle", 0.1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      const current = directionRef.current;
      if (["ArrowUp", "KeyW"].includes(e.code) && current !== "DOWN") {
        e.preventDefault();
        setDirection("UP");
      } else if (["ArrowDown", "KeyS"].includes(e.code) && current !== "UP") {
        e.preventDefault();
        setDirection("DOWN");
      } else if (["ArrowLeft", "KeyA"].includes(e.code) && current !== "RIGHT") {
        e.preventDefault();
        setDirection("LEFT");
      } else if (["ArrowRight", "KeyD"].includes(e.code) && current !== "LEFT") {
        e.preventDefault();
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        if (direction === "UP") newHead.y -= 1;
        if (direction === "DOWN") newHead.y += 1;
        if (direction === "LEFT") newHead.x -= 1;
        if (direction === "RIGHT") newHead.x += 1;

        // Wall collision check
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          setIsPlaying(false);
          if (soundEnabled) playBeep(180, "sawtooth", 0.3);
          return prevSnake;
        }

        // Self collision check
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setIsGameOver(true);
          setIsPlaying(false);
          if (soundEnabled) playBeep(160, "sawtooth", 0.3);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food check
        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            try {
              localStorage.setItem("bhanu_snake_high", newScore.toString());
            } catch {
              // ignore
            }
          }
          if (soundEnabled) playBeep(587, "sine", 0.1);
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, direction, food, score, highScore, speed, soundEnabled, spawnFood]);

  return (
    <section id="arcade" className="py-12 max-w-4xl mx-auto px-4 relative">
      <div className="text-center mb-8">
        <span className="px-3.5 py-1 rounded-full bg-blue-900/80 text-sky-300 border border-blue-700/50 text-xs font-mono inline-flex items-center gap-1.5">
          <span>🕹️</span> Study Break Arcade
        </span>
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-3 mt-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>🏔️</span> Alpine Trail Snake
        </h2>
        <p className="text-sky-200/80 text-sm max-w-md mx-auto mt-1">
          Take a quick break! Slither through the mountain pines, gather harvest treats, and beat your high score.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <StickyNote
            color="green"
            rotation={-0.6}
            pinStyle="pin"
            pinColor="#0284C7"
            className="p-5 sm:p-7 bg-[#DCFCE7] border border-[#86EFAC]/70 shadow-2xl"
          >
            {/* Header: Scoreboard & Sound toggle */}
            <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-3 mb-4">
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-gray-800">
                  SCORE: <span className="text-emerald-700 font-extrabold">{score}</span>
                </div>
                <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-gray-800">
                  HIGH: <span className="text-amber-700 font-extrabold">{highScore}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-2 py-1 rounded bg-white/70 hover:bg-white text-xs border border-black/10 font-mono transition-colors"
                  title="Toggle Sound FX"
                >
                  {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
                </button>
              </div>
            </div>

            {/* The Snake Canvas Grid (Graph paper style) */}
            <div className="relative aspect-square w-full max-w-sm mx-auto bg-[#eef8ed] rounded-lg border-2 border-emerald-900/30 shadow-inner overflow-hidden">
              {/* Subtle graph grid background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)",
                  backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`,
                }}
              />

              {/* Food */}
              <div
                className="absolute flex items-center justify-center text-sm sm:text-base animate-bounce"
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  left: `${(food.x / GRID_SIZE) * 100}%`,
                  top: `${(food.y / GRID_SIZE) * 100}%`,
                }}
              >
                {foodType}
              </div>

              {/* Snake Body */}
              {snake.map((seg, idx) => (
                <div
                  key={idx}
                  className={`absolute rounded-xs transition-all ${
                    idx === 0
                      ? "bg-emerald-900 rounded-sm shadow-xs border border-black/20"
                      : "bg-emerald-700 rounded-xs"
                  }`}
                  style={{
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                    left: `${(seg.x / GRID_SIZE) * 100}%`,
                    top: `${(seg.y / GRID_SIZE) * 100}%`,
                  }}
                >
                  {/* Eyes on snake head */}
                  {idx === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-[7px] text-white">
                      •‿•
                    </div>
                  )}
                </div>
              ))}

              {/* Start / Game Over Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-emerald-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white">
                  {isGameOver ? (
                    <div className="space-y-2">
                      <p className="text-2xl font-bold font-handwriting text-rose-300">
                        Ouch! Hit a mountain ridge!
                      </p>
                      <p className="text-xs text-emerald-100 font-mono">
                        Final Trail Score: <span className="font-bold text-amber-300">{score}</span>
                      </p>
                      <button
                        onClick={resetGame}
                        className="mt-3 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                      >
                        🔄 Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-3xl font-bold font-handwriting text-amber-200">
                        🏔️ Ready for the Trail?
                      </p>
                      <p className="text-xs text-emerald-200 max-w-[200px]">
                        Use Arrow keys or W/A/S/D to guide your snake and collect alpine snacks!
                      </p>
                      <button
                        onClick={resetGame}
                        className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                      >
                        ▶ Start Game
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile / Screen D-Pad Controls */}
            <div className="mt-4 flex flex-col items-center gap-1.5 sm:hidden">
              <button
                type="button"
                onClick={() => direction !== "DOWN" && setDirection("UP")}
                className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
              >
                ▲
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => direction !== "RIGHT" && setDirection("LEFT")}
                  className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={() => direction !== "UP" && setDirection("DOWN")}
                  className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => direction !== "LEFT" && setDirection("RIGHT")}
                  className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Difficulty / Speed Selector Footer */}
            <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap items-center justify-between text-xs text-gray-700">
              <span className="font-semibold">Trail Difficulty:</span>
              <div className="flex gap-1.5">
                {[
                  { label: "Gentle Hike", val: 150 },
                  { label: "Alpine Trek", val: 110 },
                  { label: "Summit Rush", val: 80 },
                ].map((d) => (
                  <button
                    key={d.val}
                    type="button"
                    onClick={() => setSpeed(d.val)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                      speed === d.val
                        ? "bg-emerald-800 text-white font-bold shadow-xs"
                        : "bg-white/70 hover:bg-white text-gray-800"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </StickyNote>
        </div>
      </div>
    </section>
  );
}

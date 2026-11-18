"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import StickyNote from "./StickyNote";

type GameType = "snake" | "brick";

interface LeaderboardEntry {
  id: string;
  name: string;
  game: "Alpine Snake" | "Brick Breaker";
  score: number;
  date: string;
}

// Zero-dependency sound effects via Web Audio API
function playSound(freq: number, type: OscillatorType = "sine", duration = 0.08) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore before user interaction
  }
}

export default function ArcadeZone() {
  const [activeGame, setActiveGame] = useState<GameType>("snake");
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Score submission state
  const [pendingScore, setPendingScore] = useState<{ score: number; game: "Alpine Snake" | "Brick Breaker" } | null>(null);
  const [playerNameInput, setPlayerNameInput] = useState<string>("");

  // Load Leaderboard from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bhanu_arcade_leaderboard");
      if (saved) {
        setLeaderboard(JSON.parse(saved));
      } else {
        // Initial friendly default high scores
        const defaults: LeaderboardEntry[] = [
          { id: "1", name: "Bhanu (Host)", game: "Alpine Snake", score: 140, date: "Nov 18" },
          { id: "2", name: "Aarav", game: "Brick Breaker", score: 180, date: "Nov 17" },
          { id: "3", name: "MountainRanger", game: "Alpine Snake", score: 90, date: "Nov 16" },
        ];
        setLeaderboard(defaults);
        localStorage.setItem("bhanu_arcade_leaderboard", JSON.stringify(defaults));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveLeaderboard = (data: LeaderboardEntry[]) => {
    setLeaderboard(data);
    try {
      localStorage.setItem("bhanu_arcade_leaderboard", JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const handleClearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear the entire leaderboard? This lets you track fresh new high scores.")) {
      saveLeaderboard([]);
    }
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingScore || !playerNameInput.trim()) return;

    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: playerNameInput.trim(),
      game: pendingScore.game,
      score: pendingScore.score,
      date: "Today",
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 15); // Keep top 15

    saveLeaderboard(updated);
    setPendingScore(null);
    setPlayerNameInput("");
    setShowLeaderboard(true);
  };

  // ==========================================
  // GAME 1: ALPINE TRAIL SNAKE
  // ==========================================
  type Position = { x: number; y: number };
  type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
  const GRID_SIZE = 16;
  const CELL_SIZE = 20;

  const [snake, setSnake] = useState<Position[]>([
    { x: 8, y: 8 },
    { x: 8, y: 9 },
    { x: 8, y: 10 },
  ]);
  const [snakeDir, setSnakeDir] = useState<Direction>("UP");
  const snakeDirRef = useRef<Direction>("UP");
  snakeDirRef.current = snakeDir;

  const [snakeFood, setSnakeFood] = useState<Position>({ x: 5, y: 5 });
  const [snakeFoodEmoji, setSnakeFoodEmoji] = useState<string>("🍎");
  const [snakeScore, setSnakeScore] = useState<number>(0);
  const [snakeHighScore, setSnakeHighScore] = useState<number>(0);
  const [isSnakePlaying, setIsSnakePlaying] = useState<boolean>(false);
  const [isSnakeGameOver, setIsSnakeGameOver] = useState<boolean>(false);
  const [snakeSpeed, setSnakeSpeed] = useState<number>(110);
  const snakeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem("bhanu_snake_high");
      if (savedHigh) setSnakeHighScore(parseInt(savedHigh, 10));
    } catch {
      // ignore
    }
  }, []);

  const spawnSnakeFood = useCallback(() => {
    const emojis = ["🍎", "🍒", "🍃", "🍄", "🍓"];
    setSnakeFoodEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    let newPos: Position;
    do {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((s) => s.x === newPos.x && s.y === newPos.y));
    setSnakeFood(newPos);
  }, [snake]);

  const startSnakeGame = () => {
    setSnake([
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 },
    ]);
    setSnakeDir("UP");
    snakeDirRef.current = "UP";
    setSnakeScore(0);
    setIsSnakeGameOver(false);
    setIsSnakePlaying(true);
    spawnSnakeFood();
    if (soundEnabled) playSound(440, "triangle", 0.1);
  };

  // Snake loop
  useEffect(() => {
    if (!isSnakePlaying || isSnakeGameOver || activeGame !== "snake") return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = snakeDirRef.current;

        if (currentDir === "UP") head.y -= 1;
        if (currentDir === "DOWN") head.y += 1;
        if (currentDir === "LEFT") head.x -= 1;
        if (currentDir === "RIGHT") head.x += 1;

        // Collision Check (Walls or Self)
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE ||
          prevSnake.some((s) => s.x === head.x && s.y === head.y)
        ) {
          setIsSnakeGameOver(true);
          setIsSnakePlaying(false);
          if (soundEnabled) playSound(180, "sawtooth", 0.25);

          if (snakeScore > 0) {
            setPendingScore({ score: snakeScore, game: "Alpine Snake" });
          }
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat Food
        if (head.x === snakeFood.x && head.y === snakeFood.y) {
          const nextScore = snakeScore + 10;
          setSnakeScore(nextScore);
          if (nextScore > snakeHighScore) {
            setSnakeHighScore(nextScore);
            try {
              localStorage.setItem("bhanu_snake_high", nextScore.toString());
            } catch {
              // ignore
            }
          }
          if (soundEnabled) playSound(587, "sine", 0.1);
          spawnSnakeFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, snakeSpeed);

    return () => clearInterval(interval);
  }, [isSnakePlaying, isSnakeGameOver, snakeFood, snakeScore, snakeHighScore, snakeSpeed, spawnSnakeFood, soundEnabled, activeGame]);

  // Snake Canvas Rendering
  useEffect(() => {
    if (activeGame !== "snake") return;
    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 320, 320);

    // Food
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      snakeFoodEmoji,
      snakeFood.x * CELL_SIZE + CELL_SIZE / 2,
      snakeFood.y * CELL_SIZE + CELL_SIZE / 2
    );

    // Snake Body & Head
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#064e3b" : "#059669";
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        i === 0 ? 5 : 2
      );
      ctx.fill();

      if (i === 0) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "8px sans-serif";
        ctx.fillText("•‿•", seg.x * CELL_SIZE + CELL_SIZE / 2, seg.y * CELL_SIZE + CELL_SIZE / 2);
      }
    });
  }, [snake, snakeFood, snakeFoodEmoji, activeGame]);

  const handleSnakeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeGame !== "snake") return;
      if (["ArrowUp", "KeyW"].includes(e.code) && snakeDirRef.current !== "DOWN") {
        e.preventDefault();
        setSnakeDir("UP");
      }
      if (["ArrowDown", "KeyS"].includes(e.code) && snakeDirRef.current !== "UP") {
        e.preventDefault();
        setSnakeDir("DOWN");
      }
      if (["ArrowLeft", "KeyA"].includes(e.code) && snakeDirRef.current !== "RIGHT") {
        e.preventDefault();
        setSnakeDir("LEFT");
      }
      if (["ArrowRight", "KeyD"].includes(e.code) && snakeDirRef.current !== "LEFT") {
        e.preventDefault();
        setSnakeDir("RIGHT");
      }
    },
    [activeGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSnakeKeyDown);
    return () => window.removeEventListener("keydown", handleSnakeKeyDown);
  }, [handleSnakeKeyDown]);

  // ==========================================
  // GAME 2: MOUNTAIN BRICK BREAKER (BREAKOUT)
  // ==========================================
  interface Brick {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    points: number;
    alive: boolean;
  }

  const brickCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [brickScore, setBrickScore] = useState<number>(0);
  const [brickLives, setBrickLives] = useState<number>(3);
  const [isBrickPlaying, setIsBrickPlaying] = useState<boolean>(false);
  const [isBrickGameOver, setIsBrickGameOver] = useState<boolean>(false);
  const [isBrickVictory, setIsBrickVictory] = useState<boolean>(false);

  // Brick game state refs for smooth requestAnimationFrame
  const paddleRef = useRef({ x: 130, w: 60, h: 10, speed: 6 });
  const ballRef = useRef({ x: 160, y: 260, r: 5, vx: 2.5, vy: -3.5 });
  const bricksRef = useRef<Brick[]>([]);
  const brickAnimRef = useRef<number | null>(null);

  const initBricks = () => {
    const rows = 4;
    const cols = 6;
    const bW = 44;
    const bH = 14;
    const padding = 6;
    const offsetTop = 30;
    const offsetLeft = 14;

    const colors = ["#DC2626", "#D97706", "#059669", "#2563EB"];
    const points = [40, 30, 20, 10];
    const newBricks: Brick[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newBricks.push({
          x: offsetLeft + c * (bW + padding),
          y: offsetTop + r * (bH + padding),
          w: bW,
          h: bH,
          color: colors[r],
          points: points[r],
          alive: true,
        });
      }
    }
    bricksRef.current = newBricks;
  };

  const startBrickGame = () => {
    initBricks();
    paddleRef.current.x = 130;
    ballRef.current = { x: 160, y: 260, r: 5, vx: (Math.random() > 0.5 ? 2.5 : -2.5), vy: -3.5 };
    setBrickScore(0);
    setBrickLives(3);
    setIsBrickGameOver(false);
    setIsBrickVictory(false);
    setIsBrickPlaying(true);
    if (soundEnabled) playSound(523, "triangle", 0.1);
  };

  // Brick Breaker Animation Loop
  useEffect(() => {
    if (activeGame !== "brick" || !isBrickPlaying) {
      if (brickAnimRef.current) cancelAnimationFrame(brickAnimRef.current);
      return;
    }

    const canvas = brickCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scoreAccum = brickScore;
    let livesAccum = brickLives;

    const loop = () => {
      ctx.clearRect(0, 0, 320, 320);

      // Move Ball
      const ball = ballRef.current;
      const paddle = paddleRef.current;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Ball Wall Collisions
      if (ball.x - ball.r <= 0 || ball.x + ball.r >= 320) {
        ball.vx = -ball.vx;
        if (soundEnabled) playSound(350, "sine", 0.04);
      }
      if (ball.y - ball.r <= 0) {
        ball.vy = -ball.vy;
        if (soundEnabled) playSound(350, "sine", 0.04);
      }

      // Ball Paddle Collision
      if (
        ball.y + ball.r >= 320 - 22 &&
        ball.y - ball.r <= 320 - 12 &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.w
      ) {
        // Angle reflects based on where ball hits paddle
        const hitOffset = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
        ball.vx = hitOffset * 4;
        ball.vy = -Math.abs(ball.vy);
        if (soundEnabled) playSound(480, "sine", 0.05);
      }

      // Ball Misses Paddle (Lose Life)
      if (ball.y - ball.r > 320) {
        livesAccum -= 1;
        setBrickLives(livesAccum);
        if (soundEnabled) playSound(160, "sawtooth", 0.2);

        if (livesAccum <= 0) {
          setIsBrickGameOver(true);
          setIsBrickPlaying(false);
          if (scoreAccum > 0) {
            setPendingScore({ score: scoreAccum, game: "Brick Breaker" });
          }
          return;
        } else {
          // Reset ball on paddle
          ball.x = paddle.x + paddle.w / 2;
          ball.y = 260;
          ball.vx = Math.random() > 0.5 ? 2.5 : -2.5;
          ball.vy = -3.5;
        }
      }

      // Ball Brick Collisions
      let activeCount = 0;
      bricksRef.current.forEach((b) => {
        if (!b.alive) return;
        activeCount++;

        if (
          ball.x + ball.r >= b.x &&
          ball.x - ball.r <= b.x + b.w &&
          ball.y + ball.r >= b.y &&
          ball.y - ball.r <= b.y + b.h
        ) {
          b.alive = false;
          ball.vy = -ball.vy;
          scoreAccum += b.points;
          setBrickScore(scoreAccum);
          if (soundEnabled) playSound(650 + b.points * 6, "sine", 0.08);
        }
      });

      // Victory Condition (All bricks cleared)
      if (activeCount === 0 && bricksRef.current.length > 0) {
        setIsBrickVictory(true);
        setIsBrickPlaying(false);
        if (soundEnabled) playSound(880, "triangle", 0.4);
        setPendingScore({ score: scoreAccum + 100, game: "Brick Breaker" });
        return;
      }

      // Draw Bricks
      bricksRef.current.forEach((b) => {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 3);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.stroke();
      });

      // Draw Paddle
      ctx.fillStyle = "#1e3a8a";
      ctx.beginPath();
      ctx.roundRect(paddle.x, 320 - 20, paddle.w, paddle.h, 4);
      ctx.fill();

      // Draw Ball (Glowing Alpine Orb)
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      brickAnimRef.current = requestAnimationFrame(loop);
    };

    brickAnimRef.current = requestAnimationFrame(loop);

    return () => {
      if (brickAnimRef.current) cancelAnimationFrame(brickAnimRef.current);
    };
  }, [activeGame, isBrickPlaying, soundEnabled]);

  // Paddle Mouse Move & Keyboard
  const handlePaddleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = brickCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scale = 320 / rect.width;
    const canvasX = mouseX * scale;
    paddleRef.current.x = Math.max(0, Math.min(320 - paddleRef.current.w, canvasX - paddleRef.current.w / 2));
  };

  const handlePaddleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = brickCanvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const scale = 320 / rect.width;
    const canvasX = touchX * scale;
    paddleRef.current.x = Math.max(0, Math.min(320 - paddleRef.current.w, canvasX - paddleRef.current.w / 2));
  };

  return (
    <section id="arcade" className="py-12 max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-8">
        <span className="px-3.5 py-1 rounded-full bg-blue-900/80 text-sky-300 border border-blue-700/50 text-xs font-mono inline-flex items-center gap-1.5">
          <span>🕹️</span> Bhanu&apos;s Alpine Arcade &amp; Leaderboard
        </span>
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-3 mt-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>⛰️</span> Study Break Games
        </h2>
        <p className="text-sky-200/80 text-sm max-w-md mx-auto mt-1">
          Take a quick break between projects! Challenge the high scores on the live leaderboard.
        </p>

        {/* Game & Leaderboard Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <button
            type="button"
            onClick={() => {
              setActiveGame("snake");
              setShowLeaderboard(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeGame === "snake" && !showLeaderboard
                ? "bg-emerald-600 text-white border-emerald-400 shadow-lg scale-105"
                : "bg-blue-950/70 hover:bg-blue-900/80 text-sky-200 border-blue-800/40"
            }`}
          >
            <span>🐍</span> Alpine Snake
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGame("brick");
              setShowLeaderboard(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              activeGame === "brick" && !showLeaderboard
                ? "bg-sky-600 text-white border-sky-400 shadow-lg scale-105"
                : "bg-blue-950/70 hover:bg-blue-900/80 text-sky-200 border-blue-800/40"
            }`}
          >
            <span>🧱</span> Brick Breaker
          </button>

          <button
            type="button"
            onClick={() => setShowLeaderboard(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              showLeaderboard
                ? "bg-amber-500 text-amber-950 border-amber-300 shadow-lg scale-105"
                : "bg-blue-950/70 hover:bg-blue-900/80 text-amber-300 border-amber-500/40"
            }`}
          >
            <span>🏆</span> Leaderboard ({leaderboard.length})
          </button>
        </div>
      </div>

      {/* Main Arcade Frame */}
      <div className="flex justify-center">
        <StickyNote
          color="green"
          rotation={-0.8}
          pinStyle="pin"
          pinColor="#059669"
          title={
            showLeaderboard
              ? "Arcade Hall of Fame"
              : activeGame === "snake"
              ? "Alpine Trail Snake"
              : "Mountain Brick Breaker"
          }
          badge={showLeaderboard ? "Live Records" : "Playable"}
          className="max-w-md w-full p-4 sm:p-6 shadow-2xl"
        >
          {/* ================================================= */}
          {/* VIEW A: LIVE LEADERBOARD                          */}
          {/* ================================================= */}
          {showLeaderboard ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-xs font-bold text-gray-700 uppercase font-mono">
                  Top Scores &bull; All Time
                </span>
                <button
                  type="button"
                  onClick={handleClearLeaderboard}
                  className="text-[11px] font-mono text-rose-600 hover:text-rose-800 underline font-semibold transition-colors"
                  title="Clear all records to start a fresh leaderboard"
                >
                  🗑️ Reset Leaderboard
                </button>
              </div>

              {leaderboard.length === 0 ? (
                <div className="text-center py-8 text-gray-600 space-y-1">
                  <span className="text-3xl block">🏆</span>
                  <p className="font-bold text-sm">Leaderboard is Fresh &amp; Clear!</p>
                  <p className="text-xs text-gray-500">
                    Play either Alpine Snake or Brick Breaker to record the first high score!
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {leaderboard.map((entry, idx) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-2 rounded text-xs font-mono border ${
                        idx === 0
                          ? "bg-amber-100 border-amber-300 text-amber-950 font-bold"
                          : idx === 1
                          ? "bg-slate-100 border-slate-300 text-slate-800"
                          : idx === 2
                          ? "bg-amber-50 border-amber-200 text-amber-900"
                          : "bg-white/60 border-black/5 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 text-center font-bold">
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                        </span>
                        <div className="truncate">
                          <span className="font-bold truncate">{entry.name}</span>
                          <span className="text-[10px] block opacity-70">
                            {entry.game} &bull; {entry.date}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-800 ml-2">
                        {entry.score} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-black/10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowLeaderboard(false)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Back to Games
                </button>
              </div>
            </div>
          ) : activeGame === "snake" ? (
            /* ================================================= */
            /* VIEW B: GAME 1 - ALPINE SNAKE                     */
            /* ================================================= */
            <div>
              {/* Scoreboard bar */}
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <div className="flex gap-2">
                  <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-gray-800">
                    SCORE: <span className="text-emerald-700 font-extrabold">{snakeScore}</span>
                  </div>
                  <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-gray-800">
                    HIGH: <span className="text-amber-700 font-extrabold">{snakeHighScore}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-2.5 py-1 rounded bg-white/70 hover:bg-white text-xs border border-black/10 font-mono transition-colors"
                >
                  {soundEnabled ? "🔊 Sound On" : "🔇 Muted"}
                </button>
              </div>

              {/* Snake Canvas Area */}
              <div className="relative aspect-square w-full max-w-sm mx-auto bg-[#eef8ed] rounded-lg border-2 border-emerald-900/30 shadow-inner overflow-hidden">
                <canvas
                  ref={snakeCanvasRef}
                  width={320}
                  height={320}
                  className="w-full h-full block"
                />

                {/* Start / Game Over Modal */}
                {(!isSnakePlaying || isSnakeGameOver) && (
                  <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center p-4 text-center text-white animate-fade-in">
                    {isSnakeGameOver ? (
                      <>
                        <p className="text-3xl font-bold font-handwriting text-rose-300 mb-1">
                          Hit a Mountain Ridge!
                        </p>
                        <p className="text-sm text-emerald-200 mb-3">
                          Final Score: <strong className="text-white text-lg">{snakeScore}</strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl font-bold font-handwriting text-amber-200 mb-1">
                          🏔️ Ready for the Trail?
                        </p>
                        <p className="text-xs text-emerald-200 max-w-[210px] mb-4">
                          Use Arrow keys or W/A/S/D to gather pine treats!
                        </p>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={startSnakeGame}
                      className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                    >
                      {isSnakeGameOver ? "🔄 Try Again" : "▶ Start Game"}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile D-Pad Controls */}
              <div className="mt-3 flex flex-col items-center gap-1 sm:hidden">
                <button
                  type="button"
                  onClick={() => setSnakeDir("UP")}
                  className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                >
                  ▲
                </button>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSnakeDir("LEFT")}
                    className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnakeDir("DOWN")}
                    className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnakeDir("RIGHT")}
                    className="w-12 h-10 rounded bg-emerald-800 text-white font-bold flex items-center justify-center shadow-md active:scale-95"
                  >
                    ▶
                  </button>
                </div>
              </div>

              {/* Trail Pace selector */}
              <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-xs text-gray-700">
                <span className="font-semibold">Trail Pace:</span>
                <div className="flex gap-1.5">
                  {[
                    { label: "Gentle", spd: 150 },
                    { label: "Alpine", spd: 110 },
                    { label: "Rush", spd: 80 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setSnakeSpeed(p.spd)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        snakeSpeed === p.spd
                          ? "bg-emerald-800 text-white font-bold"
                          : "bg-white hover:bg-white text-gray-800 border border-black/10"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ================================================= */
            /* VIEW C: GAME 2 - MOUNTAIN BRICK BREAKER           */
            /* ================================================= */
            <div>
              {/* Score & Lives bar */}
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <div className="flex gap-2 items-center">
                  <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-gray-800">
                    SCORE: <span className="text-sky-700 font-extrabold">{brickScore}</span>
                  </div>
                  <div className="bg-white/80 px-2.5 py-1 rounded border border-black/10 font-bold text-rose-600">
                    LIVES: {"❤️".repeat(Math.max(0, brickLives))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-2.5 py-1 rounded bg-white/70 hover:bg-white text-xs border border-black/10 font-mono transition-colors"
                >
                  {soundEnabled ? "🔊 Sound" : "🔇 Muted"}
                </button>
              </div>

              {/* Brick Breaker Canvas */}
              <div className="relative aspect-square w-full max-w-sm mx-auto bg-[#0f172a] rounded-lg border-2 border-sky-900/40 shadow-inner overflow-hidden cursor-ew-resize">
                <canvas
                  ref={brickCanvasRef}
                  width={320}
                  height={320}
                  onMouseMove={handlePaddleMouseMove}
                  onTouchMove={handlePaddleTouchMove}
                  className="w-full h-full block"
                />

                {/* Start / Game Over Modal */}
                {(!isBrickPlaying || isBrickGameOver || isBrickVictory) && (
                  <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 text-center text-white animate-fade-in">
                    {isBrickVictory ? (
                      <>
                        <span className="text-4xl block mb-1">🎉</span>
                        <p className="text-2xl font-bold font-handwriting text-amber-300 mb-1">
                          Mountain Cleared!
                        </p>
                        <p className="text-xs text-sky-200 mb-3">
                          Total Score: <strong className="text-white text-base">{brickScore + 100}</strong> (+100 Victory Bonus!)
                        </p>
                      </>
                    ) : isBrickGameOver ? (
                      <>
                        <p className="text-3xl font-bold font-handwriting text-rose-300 mb-1">
                          Out of Lives!
                        </p>
                        <p className="text-xs text-sky-200 mb-3">
                          Final Score: <strong className="text-white text-base">{brickScore}</strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold font-handwriting text-sky-200 mb-1">
                          🧱 Mountain Brick Breaker
                        </p>
                        <p className="text-xs text-sky-300 max-w-[210px] mb-4">
                          Move your mouse or finger to slide the paddle and smash the bricks!
                        </p>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={startBrickGame}
                      className="px-6 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                    >
                      {isBrickGameOver || isBrickVictory ? "🔄 Play Again" : "▶ Start Smash"}
                    </button>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-gray-700 mt-2 font-mono">
                💡 Move mouse or swipe finger across the board to slide the paddle!
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* POPUP MODAL: RECORD SCORE ON LEADERBOARD           */}
          {/* ================================================= */}
          {pendingScore && (
            <div className="mt-4 p-3 bg-amber-100 rounded-lg border-2 border-amber-300 shadow-md animate-bounce-short">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-950 font-mono">
                  🌟 New High Run: {pendingScore.score} pts in {pendingScore.game}!
                </span>
                <button
                  type="button"
                  onClick={() => setPendingScore(null)}
                  className="text-gray-500 hover:text-gray-800 text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitScore} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter your name / handle"
                  value={playerNameInput}
                  onChange={(e) => setPlayerNameInput(e.target.value)}
                  className="flex-1 bg-white border border-amber-400 rounded px-2.5 py-1 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-mono shadow-xs transition-colors"
                >
                  📌 Save Score
                </button>
              </form>
            </div>
          )}
        </StickyNote>
      </div>
    </section>
  );
}

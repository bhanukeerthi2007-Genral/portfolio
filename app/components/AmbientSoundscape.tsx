"use client";

import React, { useState, useRef } from "react";

export type SoundTrack = "wind" | "rain" | "lofi" | "ocean" | "chimes";

interface TrackOption {
  id: SoundTrack;
  label: string;
  icon: string;
  desc: string;
}

export const SOUND_TRACKS: TrackOption[] = [
  { id: "wind", label: "Pine Breeze", icon: "🌲", desc: "Soothing alpine wind through mountain needles" },
  { id: "rain", label: "Gentle Rain", icon: "🌧️", desc: "Rhythmic calming raindrops on mountain leaves" },
  { id: "lofi", label: "Lo-Fi Zen", icon: "🎵", desc: "Relaxing generative pentatonic melody & soft ambient chords" },
  { id: "ocean", label: "Night Waves", icon: "🌊", desc: "Slow rhythmic oceanic shore surges and surf" },
  { id: "chimes", label: "Wind Chimes", icon: "🔔", desc: "Delicate crystal wind chimes in the mountain breeze" },
];

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>("lofi");
  const [volume, setVolume] = useState<number>(0.6);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeSourcesRef = useRef<AudioNode[]>([]);
  const loopIntervalRef = useRef<number | null>(null);

  const stopAllAudio = () => {
    if (loopIntervalRef.current) {
      window.clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }

    activeSourcesRef.current.forEach((src) => {
      try {
        if ("stop" in src && typeof (src as AudioScheduledSourceNode).stop === "function") {
          (src as AudioScheduledSourceNode).stop();
        }
      } catch {
        // ignore
      }
    });
    activeSourcesRef.current = [];

    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    setIsPlaying(false);
  };

  const startTrack = (track: SoundTrack, vol: number = volume) => {
    stopAllAudio();

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(vol * 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      if (track === "wind") {
        // Procedural Alpine Wind (Filtered Noise)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.8;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        noiseSrc.connect(filter);
        filter.connect(masterGain);
        noiseSrc.start();
        activeSourcesRef.current.push(noiseSrc);
      } else if (track === "rain") {
        // Procedural Rain Drops
        loopIntervalRef.current = window.setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
          const osc = ctx.createOscillator();
          const dropGain = ctx.createGain();
          const freq = 550 + Math.random() * 850;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          dropGain.gain.setValueAtTime(0.015 + Math.random() * 0.025, ctx.currentTime);
          dropGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
          osc.connect(dropGain);
          dropGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.07);
        }, 38);
      } else if (track === "lofi") {
        // Generative Lo-Fi Ambient Pentatonic Chords
        // Pentatonic Scale frequencies: C4 (261.6), D4 (293.7), E4 (329.6), G4 (392.0), A4 (440.0), C5 (523.3)
        const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
        let noteIndex = 0;

        loopIntervalRef.current = window.setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;

          // Pick harmonic notes
          const freq = scale[Math.floor(Math.random() * scale.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = Math.random() > 0.5 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const duration = 1.8 + Math.random() * 1.2;
          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.25);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

          // Warm filter for lo-fi tape texture
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(750, ctx.currentTime);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + duration);
          noteIndex++;
        }, 650);
      } else if (track === "ocean") {
        // Slow Rhythmic Ocean Swell
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        const swellGain = ctx.createGain();
        swellGain.gain.setValueAtTime(0.02, ctx.currentTime);

        // Modulate swell like ocean waves
        let waveTime = 0;
        loopIntervalRef.current = window.setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
          waveTime += 0.08;
          const swell = (Math.sin(waveTime) + 1) * 0.5; // 0 to 1
          filter.frequency.setValueAtTime(180 + swell * 280, ctx.currentTime);
          swellGain.gain.setValueAtTime(0.01 + swell * 0.04, ctx.currentTime);
        }, 100);

        noiseSrc.connect(filter);
        filter.connect(swellGain);
        swellGain.connect(masterGain);
        noiseSrc.start();
        activeSourcesRef.current.push(noiseSrc);
      } else if (track === "chimes") {
        // Crystal Wind Chimes
        const chimeFreqs = [784.0, 880.0, 987.77, 1174.66, 1318.51, 1567.98];

        loopIntervalRef.current = window.setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
          if (Math.random() < 0.35) {
            const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
            const osc = ctx.createOscillator();
            const chimeGain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            chimeGain.gain.setValueAtTime(0.025, ctx.currentTime);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

            osc.connect(chimeGain);
            chimeGain.connect(masterGain);

            osc.start();
            osc.stop(ctx.currentTime + 2.2);
          }
        }, 320);
      }

      setIsPlaying(true);
      setCurrentTrack(track);
    } catch {
      // Audio might need direct user gesture
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      startTrack(currentTrack, volume);
    }
  };

  const handleSelectTrack = (track: SoundTrack) => {
    setCurrentTrack(track);
    if (isPlaying) {
      startTrack(track, volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(val * 0.12, audioCtxRef.current.currentTime);
    }
  };

  if (isMinimized) {
    return (
      <aside aria-label="Audio player mini button" className="fixed bottom-5 right-5 z-40 font-sans">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="bg-[#0c1e38]/95 border border-blue-500/40 text-sky-200 px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-mono backdrop-blur-md hover:scale-105 transition-transform"
        >
          <span>🎵</span>
          <span>{isPlaying ? "Playing Music" : "Audio Studio"}</span>
          {isPlaying && (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-1 bg-sky-400 rounded-xs animate-bounce h-2" />
              <span className="w-1 bg-sky-300 rounded-xs animate-bounce h-3 delay-75" />
            </span>
          )}
        </button>
      </aside>
    );
  }

  const activeOption = SOUND_TRACKS.find((t) => t.id === currentTrack) || SOUND_TRACKS[0];

  return (
    <aside aria-label="Alpine Audio and Music Studio" className="fixed bottom-5 right-5 z-40 font-sans">
      <div className="bg-[#0a182d]/95 border border-blue-600/40 text-sky-100 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs transition-all flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-blue-800/40 pb-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">{activeOption.icon}</span>
            <div>
              <span className="font-bold text-sky-200 font-mono block leading-none">
                Alpine Audio Studio
              </span>
              <span className="text-[10px] text-sky-400/80 font-mono">
                {activeOption.label}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-white text-xs px-1.5 py-0.5 rounded hover:bg-blue-900/40 transition-colors"
            title="Minimize audio box"
          >
            ✕
          </button>
        </div>

        {/* Play/Pause & Animated Frequency Waves */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
              isPlaying
                ? "bg-sky-400 text-sky-950 hover:bg-sky-300 scale-102"
                : "bg-blue-900/80 hover:bg-blue-800 text-sky-100 border border-blue-700/50"
            }`}
          >
            <span>{isPlaying ? "⏸ Pause Music" : "▶ Play Music"}</span>
          </button>

          {/* Equalizer animation */}
          <div className="flex items-end gap-1 h-5 px-2">
            <span
              className={`w-1 bg-sky-400 rounded-xs transition-all ${
                isPlaying ? "animate-bounce h-3" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-1 bg-sky-300 rounded-xs transition-all ${
                isPlaying ? "animate-bounce h-5 delay-75" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-1 bg-sky-400 rounded-xs transition-all ${
                isPlaying ? "animate-bounce h-2.5 delay-150" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-1 bg-cyan-300 rounded-xs transition-all ${
                isPlaying ? "animate-bounce h-4 delay-100" : "h-1 opacity-40"
              }`}
            />
          </div>
        </div>

        {/* 5 Track Switcher Buttons */}
        <div>
          <label className="block text-[10px] uppercase font-mono text-sky-300/80 mb-1">
            Select Track:
          </label>
          <div className="grid grid-cols-3 gap-1 text-[11px]">
            {SOUND_TRACKS.map((t) => {
              const isActive = t.id === currentTrack;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTrack(t.id)}
                  className={`px-2 py-1 rounded text-center transition-all flex items-center justify-center gap-1 border ${
                    isActive
                      ? "bg-blue-800 text-white font-bold border-sky-400/60 shadow-xs"
                      : "bg-blue-950/60 text-sky-300 hover:bg-blue-900/60 border-blue-900/40"
                  }`}
                  title={t.desc}
                >
                  <span>{t.icon}</span>
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Volume Slider */}
        <div className="pt-1 border-t border-blue-900/40 flex items-center justify-between gap-2 text-[11px] text-sky-300/80">
          <span className="font-mono flex items-center gap-1">
            <span>🔊</span>
            <span>{Math.round(volume * 100)}%</span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-28 h-1.5 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
            title="Adjust volume"
          />
        </div>
      </div>
    </aside>
  );
}

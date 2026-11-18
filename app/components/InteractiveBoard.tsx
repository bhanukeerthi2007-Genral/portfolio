"use client";

import React, { useState, useEffect } from "react";
import StickyNote, { StickyColor, PinStyle } from "./StickyNote";

interface VisitorNote {
  id: string;
  name: string;
  message: string;
  color: StickyColor;
  pinStyle: PinStyle;
  rotation: number;
  date: string;
  likes: number;
}

export default function InteractiveBoard() {
  const [notes, setNotes] = useState<VisitorNote[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<StickyColor>("yellow");
  const [selectedPin, setSelectedPin] = useState<PinStyle>("pin");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load visitor notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bhanu_visitor_notes");
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveNotes = (updated: VisitorNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem("bhanu_visitor_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    // Slight random organic rotation between -2.5 and +2.5 deg
    const randomRot = parseFloat((Math.random() * 4 - 2).toFixed(1));

    const newNote: VisitorNote = {
      id: Date.now().toString(),
      name: authorName.trim(),
      message: message.trim(),
      color: selectedColor,
      pinStyle: selectedPin,
      rotation: randomRot,
      date: "Just now",
      likes: 1,
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);

    setAuthorName("");
    setMessage("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLike = (id: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, likes: n.likes + 1 } : n
    );
    saveNotes(updated);
  };

  const clearMyNotes = () => {
    saveNotes([]);
  };

  return (
    <section id="community-board" className="py-12 max-w-6xl mx-auto px-4 relative">
      <div className="text-center mb-10">
        <span className="px-3.5 py-1 rounded-full bg-blue-900/80 text-sky-300 border border-blue-700/50 text-xs font-mono inline-flex items-center gap-1.5">
          <span>📌</span> Interactive Corkboard
        </span>
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-3 mt-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>💬</span> Pin Your Own Note on My Board!
        </h2>
        <p className="text-sky-200/80 text-sm max-w-lg mx-auto mt-1">
          Leave a message, feedback, or say hi! Pick your sticky paper, pin style, and post it to the community wall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Creator Form */}
        <div className="lg:col-span-5">
          <StickyNote
            color={selectedColor}
            rotation={-0.8}
            pinStyle={selectedPin}
            pinColor={
              selectedColor === "yellow"
                ? "#DC2626"
                : selectedColor === "green"
                ? "#059669"
                : selectedColor === "blue"
                ? "#2563EB"
                : "#D97706"
            }
            title="Write a New Sticky Note"
            badge="Interactive"
            className="p-5 sm:p-7 shadow-2xl"
          >
            <form onSubmit={handleAddNote} className="space-y-3.5">
              {/* Paper color selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  1. Pick Note Paper:
                </label>
                <div className="flex gap-2">
                  {(["yellow", "green", "pink", "blue", "purple", "orange"] as StickyColor[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border border-black/20 transition-transform ${
                        selectedColor === c ? "scale-125 ring-2 ring-blue-700 shadow-md" : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor:
                          c === "yellow"
                            ? "#FEF08A"
                            : c === "green"
                            ? "#BBF7D0"
                            : c === "pink"
                            ? "#FECDD3"
                            : c === "blue"
                            ? "#BAE6FD"
                            : c === "purple"
                            ? "#E9D5FF"
                            : "#FED7AA",
                      }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Pin / Tape selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  2. Fastener Style:
                </label>
                <div className="flex gap-2 text-xs">
                  {[
                    { id: "pin", label: "🔴 Pushpin" },
                    { id: "tape", label: "🏷️ Tape" },
                    { id: "clip", label: "📎 Clip" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedPin(f.id as PinStyle)}
                      className={`px-2.5 py-1 rounded border transition-all ${
                        selectedPin === f.id
                          ? "bg-gray-900 text-white font-bold"
                          : "bg-white/70 text-gray-800 hover:bg-white border-black/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name field */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Your Name or Handle:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya / @frontend_dev"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-white/75 border border-black/15 rounded px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Your Note:
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Leave words of encouragement, project ideas, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/75 border border-black/15 rounded px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none font-sans"
                />
              </div>

              {showSuccess && (
                <div className="p-2 rounded bg-emerald-800 text-emerald-100 text-xs font-medium text-center animate-fade-in">
                  🎉 Your sticky note has been posted to the board!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#1a3d6b] hover:bg-[#132f54] text-sky-50 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span>📌</span> Stick It on the Board!
              </button>
            </form>
          </StickyNote>
        </div>

        {/* The Live Board Display */}
        <div className="lg:col-span-7">
          {notes.length === 0 ? (
            <div className="flex justify-center py-8">
              <StickyNote
                color="yellow"
                rotation={0}
                pinStyle="tape"
                className="p-8 text-center max-w-md w-full border-dashed border-2 border-amber-300 shadow-xl"
              >
                <div className="space-y-2 py-4">
                  <span className="text-4xl block animate-bounce">📌</span>
                  <h4 className="font-bold text-xl font-handwriting text-amber-950">
                    The Board is Fresh & Ready!
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    No notes are pinned yet. Be the very first person to write and stick a note onto the board using the form on the left!
                  </p>
                </div>
              </StickyNote>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-xs text-sky-300 font-mono">
                  Pinned Notes ({notes.length})
                </span>
                <button
                  onClick={clearMyNotes}
                  className="text-[11px] text-gray-400 hover:text-rose-300 underline font-mono transition-colors"
                >
                  Clear Board
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <StickyNote
                    key={note.id}
                    color={note.color}
                    rotation={note.rotation}
                    pinStyle={note.pinStyle}
                    pinColor={note.color === "yellow" ? "#DC2626" : "#2563EB"}
                    title={note.name}
                    badge={note.date}
                    className="flex flex-col justify-between"
                  >
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
                      &ldquo;{note.message}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-gray-500 font-mono">
                        By {note.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLike(note.id)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 hover:bg-white text-rose-600 font-semibold border border-black/10 transition-transform active:scale-125"
                        title="Cheer / Like this note"
                      >
                        <span>❤️</span>
                        <span>{note.likes}</span>
                      </button>
                    </div>
                  </StickyNote>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

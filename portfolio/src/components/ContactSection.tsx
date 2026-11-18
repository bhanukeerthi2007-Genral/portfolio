import React, { useState } from "react";
import { portfolioData, SocialLink } from "../data/portfolioData";
import StickyNote, { NoteColor } from "./StickyNote";

export default function ContactSection() {
  const { socialLinks, personal } = portfolioData;

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<NoteColor>("yellow");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleStickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Simulate sending / sticking
    setStatusMessage("✨ Note pinned! Thanks for reaching out — I'll get back to you shortly.");
    setTimeout(() => {
      setSenderName("");
      setSenderEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-5xl font-bold text-emerald-100 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>📬</span> Pin a Message / Connect
        </h2>
        <p className="text-emerald-300/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Interested in working together, discussing an internship, or just want to talk about nature and code? Find me across the web or leave a note below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Accounts & Social Links as Pinned Mini-Notes */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-emerald-200 font-bold text-lg mb-2 flex items-center gap-2">
            <span>🔗</span> Connected Profiles & Inboxes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {socialLinks.map((link: SocialLink, idx: number) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <StickyNote
                  color={link.noteColor}
                  rotation={link.rotation}
                  pinStyle="tape"
                  className="p-3.5 hover:scale-[1.03] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{link.platform}</p>
                      <p className="text-xs text-gray-600 font-mono">{link.username}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </StickyNote>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Interactive Sticky Note Contact Pad */}
        <div className="lg:col-span-7">
          <StickyNote
            color={selectedColor}
            rotation={1}
            pinStyle="pin"
            pinColor="#DC2626"
            title="Leave a Pinned Note on My Board"
            badge="Direct Message"
            className="p-6 sm:p-8"
          >
            <form onSubmit={handleStickNote} className="space-y-4">
              {/* Color Picker for Note */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                <span>Pick note paper:</span>
                {(["yellow", "green", "pink", "blue", "purple", "orange"] as NoteColor[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`w-5 h-5 rounded-full border border-black/20 transition-transform ${
                      selectedColor === c ? "scale-125 ring-2 ring-emerald-600" : "hover:scale-110"
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
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Your Email / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. jane@example.com or @handle"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Note Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Drop a note, share project feedback, or ask a question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none font-sans"
                />
              </div>

              {statusMessage && (
                <div className="p-2.5 rounded bg-emerald-800 text-emerald-100 text-xs font-medium text-center">
                  {statusMessage}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-600">
                  Direct contact: <a href={`mailto:${personal.avatarUrl}`} className="font-semibold underline">email</a>
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#2D5A3F] hover:bg-[#1E3E2B] text-emerald-50 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>📌</span> Stick Note
                </button>
              </div>
            </form>
          </StickyNote>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-emerald-800/40 text-center text-xs text-emerald-400/60 font-mono">
        <p>🍃 Designed with sticky notes & nature vibes &bull; Next.js & Tailwind CSS &bull; {personal.name}</p>
      </footer>
    </section>
  );
}

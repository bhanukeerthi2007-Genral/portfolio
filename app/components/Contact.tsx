import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import StickyNote from "./StickyNote";

export default function Contact() {
  const { about } = portfolioData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-10">
        <h2
          className="text-3xl sm:text-5xl font-bold text-sky-100 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          <span>📬</span> Contact Me
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Have an opportunity, a question, or want to collaborate? Send me a note or reach out through my links!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Email & Social Links */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-emerald-200 font-bold text-lg mb-2 flex items-center gap-2">
            <span>🔗</span> Connect & Inboxes
          </h3>

          {/* Email Note */}
          <a
            href={`mailto:${about.email}`}
            className="block group"
          >
            <StickyNote
              color="green"
              rotation={1}
              pinStyle="tape"
              className="p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-emerald-950 text-sm">Direct Email</p>
                  <p className="text-xs text-gray-700 font-mono">{about.email}</p>
                </div>
                <span className="text-sm font-bold text-emerald-900 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </StickyNote>
          </a>

          {/* GitHub Note */}
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <StickyNote
              color="yellow"
              rotation={-1.5}
              pinStyle="pin"
              pinColor="#DC2626"
              className="p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-950 text-sm">GitHub</p>
                  <p className="text-xs text-gray-700 font-mono">@bhanukeerthi2007-Genral</p>
                </div>
                <span className="text-sm font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </StickyNote>
          </a>

          {/* LinkedIn Note */}
          <a
            href={about.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <StickyNote
              color="blue"
              rotation={1.2}
              pinStyle="clip"
              className="p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sky-950 text-sm">LinkedIn</p>
                  <p className="text-xs text-gray-700 font-mono">in/bhanukeerthi-vinod</p>
                </div>
                <span className="text-sm font-bold text-sky-900 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </StickyNote>
          </a>

          {/* Twitter / X */}
          <a
            href={about.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <StickyNote
              color="pink"
              rotation={-1}
              pinStyle="tape"
              className="p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-pink-950 text-sm">Twitter / X</p>
                  <p className="text-xs text-gray-700 font-mono">Thoughts & tech updates</p>
                </div>
                <span className="text-sm font-bold text-pink-900 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </StickyNote>
          </a>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7">
          <StickyNote
            color="yellow"
            rotation={0.5}
            pinStyle="pin"
            pinColor="#2563EB"
            title="Leave a Pinned Message"
            badge="Quick Contact"
            className="p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What's on your mind? Tell me about your project, questions, or opportunities..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/70 border border-black/15 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none font-sans"
                />
              </div>

              {submitted && (
                <div className="p-2.5 rounded bg-blue-900 text-sky-100 text-xs font-medium text-center">
                  ✨ Note pinned successfully! I'll get back to you soon.
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-600 font-mono">
                  Direct: {about.email}
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#1a3d6b] hover:bg-[#132f54] text-sky-50 font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>📌</span> Send Message
                </button>
              </div>
            </form>
          </StickyNote>
        </div>
      </div>
    </section>
  );
}

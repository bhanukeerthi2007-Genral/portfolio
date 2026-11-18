import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinod A | Portfolio & Real-Time Crafts",
  description: "A unique nature-themed sticky-notes portfolio featuring real-time projects, skill proficiency, timeline, and aspirations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Inter:wght@300;400;500;600;700&family=Kalam:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="nature-bg nature-overlay min-h-screen text-gray-900 selection:bg-amber-300 selection:text-amber-950">
        {children}
      </body>
    </html>
  );
}

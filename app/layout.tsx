import type { Metadata } from "next";
// @ts-ignore: Next.js resolves global CSS imports during build.
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhanukeerthi vinod | Portfolio (Sticky Notes & Mountains)",
  description: "Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, featuring a mountain nature theme with sticky notes.",
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="nature-bg min-h-screen text-gray-900 selection:bg-amber-300 selection:text-amber-950">
        {children}
      </body>
    </html>
  );
}

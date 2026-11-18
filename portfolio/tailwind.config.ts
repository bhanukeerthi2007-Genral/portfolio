import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          darkest: "#0B1D12",
          dark: "#142F21",
          deep: "#1C3F2D",
          forest: "#244E38",
          moss: "#346247",
          sage: "#4A7C59",
          mist: "#8EB897",
          dew: "#D9E9DE",
        },
        sticky: {
          yellow: "#FEF9C3",
          yellowBorder: "#FDE047",
          green: "#DCFCE7",
          greenBorder: "#86EFAC",
          pink: "#FFE4E6",
          pinkBorder: "#FDA4AF",
          blue: "#E0F2FE",
          blueBorder: "#7DD3FC",
          purple: "#F3E8FF",
          purpleBorder: "#D8B4FE",
          orange: "#FFEDD5",
          orangeBorder: "#FDBA74",
          kraft: "#EFE6D5",
          kraftBorder: "#D4C5A9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        handwriting: ["Caveat", "Kalam", "cursive", "sans-serif"],
      },
      boxShadow: {
        note: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        "note-hover": "0 20px 35px -5px rgba(0, 0, 0, 0.35), 0 10px 15px -5px rgba(0, 0, 0, 0.25)",
        pin: "0 3px 6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.8)",
        tape: "0 1px 3px rgba(0,0,0,0.15)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out 3s infinite",
        "leaf-sway": "sway 12s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        sway: {
          "0%": { transform: "rotate(-3deg) translateY(0px)" },
          "100%": { transform: "rotate(3deg) translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

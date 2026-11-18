/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          bg: "#0B1D12",
          card: "#142F21",
          deep: "#1C3F2D",
          forest: "#244E38",
          moss: "#346247",
          sage: "#4A7C59",
          mist: "#8EB897",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        handwriting: ["Caveat", "cursive", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
      },
    },
  },
  plugins: [],
};

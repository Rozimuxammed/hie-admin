// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        dot1: "bounceDot 1.4s infinite",
        dot2: "bounceDot 1.4s infinite 0.2s",
        dot3: "bounceDot 1.4s infinite 0.4s",
      },
    },
  },
  plugins: [],
};

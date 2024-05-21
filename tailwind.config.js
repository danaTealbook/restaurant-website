/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": {
            textShadow: "0 0 10px #C81E1E",
          },
          "50%": {
            textShadow: "0 0 20px #F9FAFB",
          },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

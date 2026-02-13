/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        romance: ["Great Vibes", "cursive"],
        script: ["Parisienne", "cursive"],
        serif: ["Cormorant Garamond", "serif"],
        display: ["Playfair Display", "serif"]
      },
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe6ef",
          200: "#ffc8dc",
          300: "#ffa6c9",
          400: "#ff7fb1",
          500: "#ff5c9c"
        },
        peach: {
          100: "#ffe2d6",
          200: "#ffcbb6",
          300: "#ffb090",
          400: "#ff9369"
        },
        ink: {
          500: "#8f3d64",
          600: "#7d2f55"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 123, 178, 0.35)",
        page: "0 12px 30px rgba(255, 126, 173, 0.22)",
        cover: "0 18px 50px rgba(193, 57, 104, 0.35)"
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      sans: ["Raleway, sans"],
      heading: ["Playfair Display, serif"],
    },
    extend: {
      content: {
        checked: 'url("http://localhost:5173/images/icons8-done.svg")',
      },
      keyframes: {
        goUp: {
          "0%": { transform: "translateY(50px)" },
          "100%": { transform: "translateY(0)" },
        },
        goDown: {
          "0%": { transform: "translateY(-50px)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out",
      },
    },
  },
  plugins: [],
};

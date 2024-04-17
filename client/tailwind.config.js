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
          "0%": { transform: "translateY(42px)" },
          "100%": { transform: "translateY(-42px)" },
        },
        goDown: {
          "0%": { transform: "translateY(-42px)" },
          "100%": { transform: "translateY(42px)" },
        },

        rightIn: {
          "0%": { transform: "translateX(50px)" },
          "100%": { transform: "translateX(-50px)" },
        },

        rightOut: {
          "0%": { transform: "translateX(-50px)" },
          "100%": { transform: "translateX(50px)" },
        },
      },
      animation: {
        goUp: "goUp .45s ease-out both",
        goDown: "goDown .45s ease-out .25s both",
        rightInF: "rightIn .35s ease-out .1s both",
        rightInM: "rightIn .35s ease-out .13s both",
        rightInL: "rightIn .35s ease-out .17s both",
        rightOutF: "rightOut .35s ease-out .1s both",
        rightOutM: "rightOut .35s ease-out .13s both",
        rightOutL: "rightOut .35s ease-out .17s both",
      },
    },
  },
  plugins: [],
};

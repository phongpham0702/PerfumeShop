/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      sans: ["Roboto, sans-serif"],
      heading: ["Roboto, sans-serif"],
      inter: ["Inter, sans-serif"],
      space: ["Space Grotesk, sans-serif"],
    },
    extend: {
      content: {
        checked: 'url("./images/icons8-done.svg")',
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
        fadeIn: {
          "0%": {
            transform: "translateX(5px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(-5px)",
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            transform: "translateX(-5px)",
            opacity: 1,
            "z-index": 20,
          },
          "100%": {
            transform: "translateX(5px)",
            opacity: 0,
            "z-index": -10,
          },
        },
        goIn: {
          "0%": {
            transform: "translateX(320px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        goOut: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
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
        fadeIn: "fadeIn 0.35s ease-out both",
        fadeOut: "fadeOut 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};

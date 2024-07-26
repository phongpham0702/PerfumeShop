/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const config = {
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
          "100%": { transform: "translateX(-500px)" },
        },

        iConRightIn: {
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

        goInRight: {
          "0%": { transform: "translateX(50px)" },
          "100%": { transform: "translateX(-50px)" },
        },
        leftIn: {
          "0%": { transform: "translateX(-300px)" },
          "100%": { transform: "translateX(0)" },
        },
        leftOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-300px)" },
        },
        galleryRotate:{
          "0%":{ transform: "perspective(1200px) rotateY(0deg)"},
          "100%":{ transform: "perspective(1200px) rotateY(360deg)"}
        }

      },
      animation: {
        rightIn: "rightIn .85s ease-out both",
        goUp: "goUp .45s ease-out both",
        goDown: "goDown .45s ease-out .25s both",
        rightInF: "iConRightIn .35s ease-out .1s both",
        rightInM: "iConRightIn .35s ease-out .13s both",
        rightInL: "iConRightIn .35s ease-out .17s both",
        rightOutF: "rightOut .35s ease-out .1s both",
        rightOutM: "rightOut .35s ease-out .13s both",
        rightOutL: "rightOut .35s ease-out .17s both",
        fadeIn: "fadeIn 0.35s ease-out both",
        fadeOut: "fadeOut 0.35s ease-out both",
        galleryRotate:"galleryRotate 25s linear infinite"
      },
    },
  },
  plugins: [],
};

export default withMT(config);

/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "neu-shadow": "5px 5px 0px black",
      },
      colors: {
        "neu-white": "rgb(255,255,244)",
        "neu-yellow": "rgb(219,253,0)",
        "neu-black": "rgb(39,36,30)",
      },
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        neu: ['"Roboto"', '"sans-serif"'],
      },
    },
  },
  plugins: [],
};

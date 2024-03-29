const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  daisyui: {
    themes: [
      "light",
      "dark",
      "black",
      "dracula",
      {
        gruvbox: {
          primary: "#b16286",
          secondary: "#d65d0e",
          accent: "#d5c4a1",
          neutral: "#fbf1c7",
          "base-100": "#282828",
          info: "#458588",
          success: "#689d6a",
          warning: "#fabd2f",
          error: "#cc241d",
        },
      },
      {
        oxocarbon: {
          primary: "#ff7eb6",
          secondary: "#d65d0e",
          accent: "#d5c4a1",
          neutral: "#ffffff",
          "base-100": "#161616",
          info: "#33b1ff",
          success: "#42be65",
          warning: "#ffe97b",
          error: "#ee5396",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

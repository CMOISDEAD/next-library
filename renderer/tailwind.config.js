const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2lg": "1070px",
      },
      colors: {
        warmGray: {
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#D6D3D1",
          500: "#78716C",
          600: "#57534E",
          700: "#57534E",
          800: "#57534E",
          900: "#1C1917",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

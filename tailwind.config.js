/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg"],
  theme: {
    extend: {
      colors: {
        husky: {
          50: "#f4fdfa", // very pale greenish-white
          100: "#dff5ef",
          200: "#bfe7db",
          300: "#9cd5c5",
          400: "#77bfae",
          500: "#57a395", // base mint green — soft and natural
          600: "#46857a",
          700: "#386961",
          800: "#2d504c",
          900: "#223d3a",
          950: "#11201e", // earthy, almost forest green-black
        },
      },
    },
  },
  plugins: [],
};

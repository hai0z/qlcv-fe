const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    "./src/**/*.{html,js,jsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};

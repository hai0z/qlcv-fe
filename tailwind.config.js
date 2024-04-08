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
  theme: {},
  plugins: [
    nextui({
      themes: {
        flat: {
          extend: "dark",
          colors: {
            primary: "#ff7ac6",
            secondary: "#bf95f9",
            background: "#272935",
            success: "#52fa7c",
            warning: "#ffbd2e",
            danger: "#ff5757",
            content1: "#21232d",
          },
        },
        plus: {
          extend: "light",
          colors: {
            primary: "#65c3c8",
            secondary: "#ef9fbc",
            background: "#faf7f5",
            info: "#3abff8",
            success: "#36d399",
            warning: "#fbbd23",
            danger: "#f87272",
            content1: "#f8fafc",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
};

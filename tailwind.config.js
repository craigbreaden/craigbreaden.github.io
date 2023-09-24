/** @type {import('tailwindcss').Config} */
const defaultTheme = require ('tailwindcss/defaultConfig')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.jsx",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  // theme: {
  //   ... defaultTheme,
  //   colors: {
  //     ...defaultTheme.colors,
  //     primary: "#38816F",
  //     white: "#ffffff",
  //     text: {
  //       DEFAULT: "#1F2937",
  //       lighter: "6C7281",ß
  //     },
  //     light: {
  //       DEFAULT: "#FAFBFC",
  //       lighter: "#F3F4F6" 
  //     }, 
  //   },
  //   extend: {},
  // },
  plugins: [],
}


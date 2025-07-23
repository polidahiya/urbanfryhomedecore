/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        theme: "var(--theme)",
        footercolor: "var(--footercolor)",
        adminbg: "var(--adminbg)",
      },
      fontFamily: {
        tenor: ['"Tenor Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

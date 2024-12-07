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
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme: "#8e766e",
        footercolor: "#e7e2de",
      },
      fontFamily: {
        tenor: ['"Tenor Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      BasicTextColor: "#5a5a5a",
      HeadingTextColor: "#121212",
      ReadableBgColor: "#f7f7f5",
    },
    fontFamily: {
      OldEngTextMT: ["old-english-text-mt-regular", "serif"],
      Georgia: ["Georgia", "serif"],
      Inter: ["Inter", "sans-serif"],
      JetBrainsMono: ["JetBrains Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};

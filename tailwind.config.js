/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      BasicTextColor: "#5a5a5a",
      HeadingTextColor: "#121212",
      ReadableBgColor: "#f7f7f5",
      DarkModeBgColor: "#323236",
    },
    fontFamily: {
      OldEngTextMT: ["old-english-text-mt-regular", "serif"],
      Georgia: ["Georgia", "serif"],
      JetBrainsMono: ["JetBrains Mono", "monospace"],
      Inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};

export default tailwindConfig;

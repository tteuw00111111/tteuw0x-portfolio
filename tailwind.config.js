module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
        },
        header: {
          gradientStart: "var(--header-gradient-start)",
          gradientEnd: "var(--header-gradient-end)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

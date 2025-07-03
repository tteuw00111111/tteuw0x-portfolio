/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
      },
      screens: {
        xs: "375px", // optional – helps with very narrow phones
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        hd: "1920px", // 🆕 anything ≥ 1920 px
      },

      colors: {
        "terminal-red": "#c31727",
        "terminal-header": "#1a1a1a",
        "terminal-body": "#0d0d0d",
      },

      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },

      animation: {
        blink: "blink 1.2s infinite step-end",
      },
    },
  },

  plugins: [],
};

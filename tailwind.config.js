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
      container: {
        center: true,
      },
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "1.75rem",
        lg: "2.5rem",
        xl: "4rem",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        hd: "1920px",
        "4k": "2560px",
      },
      fontSize: {
        fluidBase: ["clamp(1rem, 2.2vw, 1.4rem)", { lineHeight: "1.5" }],
        fluidH2: ["clamp(1.75rem, 3.8vw, 2.5rem)", { lineHeight: "1.25" }],
        fluidH1: ["clamp(2.4rem, 6vw, 4rem)", { lineHeight: "1.15" }],
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};

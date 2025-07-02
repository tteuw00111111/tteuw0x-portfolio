/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specifies all the files where you'll be writing Tailwind classes.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // The core of your design system.
  theme: {
    // Use 'extend' to add your customizations without overriding Tailwind's defaults.
    extend: {
      // Defines custom font families using the CSS variables from next/font.
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
      },

      // Defines custom colors for your project.
      colors: {
        "terminal-red": "#c31727", // Example red from your design
        "terminal-header": "#1a1a1a",
        "terminal-body": "#0d0d0d",
      },

      // Defines the steps for a custom animation.
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },

      // Makes the keyframes usable as a utility class (e.g., 'animate-blink').
      animation: {
        blink: "blink 1.2s infinite step-end",
      },
    },
  },

  // Used to add official and third-party plugins.
  plugins: [],
};

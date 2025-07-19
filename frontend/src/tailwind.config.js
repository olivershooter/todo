// tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary (Vibrant Teal)
        electric: {
          50: "#e6fffa",
          100: "#b2f5ea",
          200: "#81e6d9",
          300: "#4fd1c5",
          400: "#38b2ac",
          500: "#319795", // Base
          600: "#2c7a7b",
          700: "#285e61",
          800: "#234e52",
          900: "#1d4044",
        },

        // Secondary (Energetic Coral)
        coral: {
          50: "#fff5f5",
          100: "#fed7d7",
          200: "#feb2b2",
          300: "#fc8181",
          400: "#f56565",
          500: "#e53e3e",
          600: "#c53030",
          700: "#9b2c2c",
          800: "#822727",
          900: "#63171b",
        },

        // Accent (Vivid Purple)
        royal: {
          50: "#faf5ff",
          100: "#e9d8fd",
          200: "#d6bcfa",
          300: "#b794f4",
          400: "#9f7aea",
          500: "#805ad5", // Base
          600: "#6b46c1",
          700: "#553c9a",
          800: "#44337a",
          900: "#322659",
        },

        // Neutral with personality
        pearl: {
          50: "#f8f0fc",
          100: "#f5e9ff",
          200: "#f0dbff",
          300: "#e5ccf0",
          400: "#d5bde6",
          500: "#c0aedd", // Base
          600: "#a08ec4",
          700: "#7a6e9b",
          800: "#5a5072",
          900: "#3a3449",
        },

        // Success (Emerald)
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#319795", // electric-500
          "primary-content": "#ffffff",

          secondary: "#f56565", // coral-400
          "secondary-content": "#ffffff",

          accent: "#805ad5", // royal-500
          "accent-content": "#ffffff",

          neutral: "#a08ec4", // pearl-600
          "neutral-content": "#3a3449",

          "base-100": "#f8f0fc", // pearl-50
          "base-200": "#f0dbff", // pearl-200
          "base-300": "#e5ccf0", // pearl-300
          "base-content": "#3a3449", // pearl-900

          info: "#38b2ac", // electric-400
          success: "#10b981", // emerald-500
          warning: "#f6ad55",
          error: "#e53e3e", // coral-500
        },
        dark: {
          primary: "#4fd1c5", // electric-300
          "primary-content": "#1d4044",

          secondary: "#fc8181", // coral-300
          "secondary-content": "#63171b",

          accent: "#9f7aea", // royal-400
          "accent-content": "#322659",

          neutral: "#5a5072", // pearl-800
          "neutral-content": "#f5e9ff",

          "base-100": "#3a3449", // pearl-900
          "base-200": "#322659", // royal-900
          "base-300": "#2d3748",
          "base-content": "#f0dbff", // pearl-200

          info: "#81e6d9", // electric-200
          success: "#6ee7b7", // emerald-300
          warning: "#fbd38d",
          error: "#fc8181", // coral-300
        },
      },
    ],
  },
};

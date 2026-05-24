import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFCF8",
          100: "#FBF6EE",
          200: "#F5ECD9",
        },
        warmwhite: "#FAF7F2",
        pinky: {
          50: "#FFF5F6",
          100: "#FCE7EB",
          200: "#F9D2DA",
          300: "#F2B3C0",
          400: "#E891A4",
          500: "#D26C84",
        },
        lavender: {
          50: "#F7F3FB",
          100: "#EDE3F5",
          200: "#DCC9EC",
          300: "#C7AADD",
          400: "#A989C8",
          500: "#8C6BB1",
        },
        beige: {
          50: "#FBF8F3",
          100: "#F2EBDD",
          200: "#E6D9BF",
        },
        ink: {
          50: "#F8F6F2",
          200: "#D8D2C7",
          400: "#8A8275",
          600: "#52483A",
          900: "#2A241D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(160, 130, 130, 0.18)",
        glow: "0 10px 40px -12px rgba(210, 108, 132, 0.35)",
        card: "0 2px 14px -6px rgba(120, 100, 90, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right": "slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(135deg, #FFF5F6 0%, #F7F3FB 50%, #FBF8F3 100%)",
        "warm-gradient":
          "linear-gradient(135deg, #FCE7EB 0%, #EDE3F5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

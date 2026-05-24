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
          50: "#FBF7EC",
          100: "#F5EFE0",
          200: "#EFE6CB",
        },
        warmwhite: "#FBF7EC",
        // Baby Mo signature green
        grass: {
          50: "#EAF7EC",
          100: "#CCEBD2",
          200: "#9BD7A6",
          300: "#5FC371",
          400: "#2BB14C",
          500: "#1F9A3F",
          600: "#178533",
          700: "#0F6826",
          800: "#0A4D1B",
          900: "#073A14",
        },
        // Warm playful orange
        tangerine: {
          50: "#FFF2E5",
          100: "#FFE0C2",
          200: "#FFC68F",
          300: "#FFA85C",
          400: "#F58A2E",
          500: "#E07020",
          600: "#C5651C",
        },
        // Sunny yellow highlight
        sunny: {
          200: "#FFE57A",
          300: "#FFD93D",
          400: "#F5C518",
        },
        // Soft pastel sky used in tiny accents
        sky: {
          100: "#E5F2FF",
          200: "#BFE0FF",
        },
        // Deep forest text
        ink: {
          50: "#F1F5EE",
          200: "#C8D2BD",
          400: "#6E7E66",
          600: "#3B5036",
          700: "#27381F",
          900: "#162818",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Fredoka",
          "Baloo 2",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Nunito",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 6px 20px -8px rgba(23, 133, 51, 0.22)",
        glow: "0 12px 40px -14px rgba(43, 177, 76, 0.45)",
        card: "0 3px 16px -6px rgba(23, 56, 31, 0.18)",
        pop: "0 4px 0 0 #178533",
        "pop-orange": "0 4px 0 0 #C5651C",
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
        wiggle: "wiggle 1s ease-in-out infinite",
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
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        "hero-grass":
          "radial-gradient(circle at 20% 20%, #5FC371 0%, #2BB14C 45%, #1F9A3F 100%)",
        "warm-gradient":
          "linear-gradient(135deg, #FFE0C2 0%, #FFC68F 100%)",
        "soft-gradient":
          "linear-gradient(135deg, #FBF7EC 0%, #F5EFE0 50%, #EAF7EC 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

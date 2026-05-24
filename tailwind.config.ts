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
        tangerine: {
          50: "#FFF2E5",
          100: "#FFE0C2",
          200: "#FFC68F",
          300: "#FFA85C",
          400: "#F58A2E",
          500: "#E07020",
          600: "#C5651C",
        },
        sunny: {
          200: "#FFE57A",
          300: "#FFD93D",
          400: "#F5C518",
        },
        sky: {
          100: "#E5F2FF",
          200: "#BFE0FF",
        },
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
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      // iOS-style refined shadows — small, layered, soft
      boxShadow: {
        ios: "0 1px 2px rgba(15,30,15,0.04), 0 4px 16px -6px rgba(15,30,15,0.10)",
        "ios-lg":
          "0 1px 2px rgba(15,30,15,0.05), 0 12px 36px -10px rgba(15,30,15,0.16)",
        "ios-xl":
          "0 2px 4px rgba(15,30,15,0.06), 0 24px 60px -16px rgba(15,30,15,0.22)",
        "ios-inset": "inset 0 1px 0 rgba(255,255,255,0.6)",
        "ios-grass":
          "0 6px 20px -6px rgba(31,154,63,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
        "ios-tangerine":
          "0 6px 20px -6px rgba(245,138,46,0.45), inset 0 1px 0 rgba(255,255,255,0.20)",
      },
      borderRadius: {
        // continuous-feeling radii
        ios: "1.125rem",
        "ios-lg": "1.5rem",
        "ios-xl": "1.75rem",
        "ios-2xl": "2rem",
        "ios-3xl": "2.5rem",
        "ios-4xl": "3rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up":
          "slideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right":
          "slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "press-in": "pressIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(28px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pressIn: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.96)" },
        },
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(180deg, #FBF7EC 0%, #F5EFE0 100%)",
        "hero-cream":
          "radial-gradient(110% 80% at 50% 0%, #FFFFFF 0%, #FBF7EC 55%, #F5EFE0 100%)",
        "grass-fade":
          "linear-gradient(135deg, #2BB14C 0%, #1F9A3F 100%)",
        "tangerine-fade":
          "linear-gradient(135deg, #F58A2E 0%, #E07020 100%)",
        // Subtle vibrant aurora — used in hero
        "aurora":
          "radial-gradient(60% 60% at 15% 20%, rgba(95,195,113,0.40) 0%, transparent 60%), radial-gradient(60% 60% at 85% 10%, rgba(245,168,92,0.35) 0%, transparent 60%), radial-gradient(70% 70% at 50% 100%, rgba(255,217,61,0.20) 0%, transparent 70%)",
      },
      // iOS-style spring transition timing
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Festive Palette
        maroon: {
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f9d0d9",
          300: "#f4a9b9",
          400: "#ed7694",
          500: "#e14b72",
          600: "#cd2a5c",
          700: "#ac1e4a",
          800: "#8b1a3f",  // Primary maroon
          900: "#6d1a36",
          950: "#3f0919",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#d4a017", // Primary gold
          600: "#b8860b",
          700: "#92700c",
          800: "#785d10",
          900: "#654d14",
          950: "#3a2907",
        },
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        festival: {
          cream: "#FFF8F0",
          ivory: "#FFFFF0",
          night: "#0F0A1A",
          deep: "#1A0E2E",
          wine: "#722F37",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "gradient-festive":
          "linear-gradient(135deg, #8b1a3f 0%, #6d1a36 30%, #1A0E2E 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #d4a017 0%, #b8860b 50%, #92700c 100%)",
        "gradient-warm":
          "linear-gradient(180deg, #0F0A1A 0%, #1A0E2E 50%, #2D1B4E 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "count-up": "countUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 160, 23, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 160, 23, 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        countUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

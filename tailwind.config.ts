import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // True black with subtle warmth
        ink: {
          DEFAULT: "#0A0A0A",
          softer: "#141414",
          line: "#1F1F1F",
        },
        // Pure white with paper warmth
        paper: {
          DEFAULT: "#FFFFFF",
          softer: "#F8F8F8",
          line: "#E5E5E5",
        },
        // Bold red accent — confident, premium
        crimson: {
          DEFAULT: "#DC2626",
          deep: "#991B1B",
          glow: "#EF4444",
        },
        muted: {
          DEFAULT: "#737373",
          dark: "#525252",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

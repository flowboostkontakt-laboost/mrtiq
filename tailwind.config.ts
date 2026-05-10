import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          900: "#0a0a0a",
          800: "#111114",
          700: "#16171c",
          600: "#1d1f25",
        },
        bone: {
          DEFAULT: "#f5f5f7",
          dim: "#e9e9ee",
          mute: "#a8a8b3",
        },
        cyan: { neon: "#00E5C5" },
        magenta: { neon: "#FF2DAA" },
        electric: { yellow: "#FFE600" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tightest-2": "-0.05em",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.65" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spin12: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        scan: "scan 6s linear infinite",
        flicker: "flicker 4s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        ticker: "ticker 60s linear infinite",
        spin12: "spin12 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

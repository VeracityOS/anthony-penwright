import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF8F4",
        ink: "#111111",
        muted: "#5A5A55",
        hairline: "#E8E4DB",
        accent: {
          DEFAULT: "#C8532C",
          soft: "#E87A50",
        },
        oxford: "#0A2540",
        wash: {
          peach: "#FFE8E0",
          lavender: "#EDE7F6",
          mint: "#E4F1EA",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        label: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;

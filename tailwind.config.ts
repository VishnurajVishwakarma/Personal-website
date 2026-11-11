import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Kevin Sans Hand"', '"Kevin Sans"', "var(--font-sans)", "system-ui", "sans-serif"],
        hand: ['"Kevin Sans Hand"', '"Kevin Sans"', "system-ui", "sans-serif"],
        script: ['"Kevin Sans Script"', '"Kevin Sans"', "system-ui", "sans-serif"],
        type: ['"Kevin Sans Type"', "var(--font-mono)", "monospace"],
        mono: ["var(--font-mono)", '"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: {
          DEFAULT: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          surface: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        fg: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          hover: "var(--accent-primary-hover)",
          foreground: "var(--accent-foreground)",
          subtle: "var(--accent-subtle)",
          warm: "var(--accent-warm)",
        },
        hairline: {
          DEFAULT: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        ll: {
          desk: "var(--ll-desk)",
          paper: "var(--ll-paper)",
          "paper-shade": "var(--ll-paper-shade)",
          slip: "var(--ll-slip)",
          card: "var(--ll-card)",
          graph: "var(--ll-graph)",
          kraft: "var(--ll-kraft)",
          check: "var(--ll-check)",
          pad: "var(--ll-pad)",
          ink: "var(--ll-ink)",
          "ink-soft": "var(--ll-ink-soft)",
          "ink-muted": "var(--ll-ink-muted)",
          "ink-you": "var(--ll-ink-you)",
          "pencil-text": "var(--ll-pencil-text)",
          "pencil-mark": "var(--ll-pencil-mark)",
          marker: "var(--ll-marker)",
          "orange-text": "var(--ll-orange-text)",
          hi: "var(--ll-hi)",
          green: "var(--ll-green)",
          red: "var(--ll-red)",
        },
        ink: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          800: "#343a40",
          900: "#1a1d20",
          950: "#101214",
        },
      },
    },
  },
  plugins: [],
};

export default config;

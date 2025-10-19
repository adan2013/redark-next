import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: "#d40000",
        "primary-dark": "#b30000",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
        sans: ["Helvetica Neue", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        "page-container":
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      },
      screens: {
        mobile: "768px",
      },
    },
  },
  plugins: [],
} satisfies Config;

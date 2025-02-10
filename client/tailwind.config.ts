import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        offBlack: "#28261B",
        darkOffWhite: "#F3F1E7",
        hgGray: "#B7B4A6",
        hgBlue: "#0CA5E9",
        hgLightBlue: "#E0F2FE",
        hgDarkBlue: "#04415C",
        hgGreen: "#ABC635",
        hgLightGreen: "#E6E797",
        hgPurple: "#A88BFA",
        hgLightPurple: "#DDD6FE",
      },
    },
  },
  plugins: [],
} satisfies Config;

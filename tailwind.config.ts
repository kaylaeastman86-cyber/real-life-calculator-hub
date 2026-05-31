import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        calm: "#0f766e",
        skywash: "#e8f4ff",
        leafwash: "#eaf7f1",
        peachwash: "#fff4eb"
      }
    }
  },
  plugins: []
};

export default config;

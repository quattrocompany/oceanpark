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
        primary: "#4A137B",      // Roxo Escuro
        purpleBrand: "#7629BB",  // Roxo
        accent: "#FFBA00",       // Amarelo
        orangeBrand: "#F77A2C",  // Laranja
        textMain: "#333333",
      },
    },
  },
  plugins: [],
};

export default config;
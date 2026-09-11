/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#EFEAE1",
        stone: "#E3DCCF",
        pine: { DEFAULT: "#233529", dark: "#374F3F" },
        moss: "#6E8567",
        brass: "#B08D4F",
        ink: "#20241F",
        line: "#D9D0BE",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Jost", "sans-serif"],
      },
      boxShadow: {
        lift: "0 20px 40px -20px rgba(32,36,31,0.25)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};

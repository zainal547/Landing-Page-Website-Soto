/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Pastikan jalurnya benar ke file HTML kamu
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef4e6",
          100: "#fde7c2",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
      },
    },
  },
  plugins: [],
}
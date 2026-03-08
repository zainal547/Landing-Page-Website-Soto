/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"], // Pastikan jalurnya benar
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#ea580c', // Pastikan warna orange Anda terdaftar
        }
      }
    },
  },
  plugins: [],
}
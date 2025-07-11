/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A4E4',
        secondary: {
          600: '#006FBA',
          900: '#001F4E'
        },
        background: {
          light: '#FFFFFF',
          blue: '#DFF3FD'
        },
        divider: '#F1F1F1'
      }
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#EC4899',
        gold: '#F59E0B',
        darkNavy: '#0F172A',
        oceanTeal: '#0D9488'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}

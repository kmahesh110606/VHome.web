/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // use class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], 
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a78bfa',  // soft purple
          DEFAULT: '#7c3aed', // medium purple
          dark: '#5b21b6',   // dark purple
        },
        background: {
          light: '#faf5ff',
          dark: '#1e1b4b',
        },
        text: {
          light: '#1f2937',  // gray‐700
          dark: '#e5e7eb',   // gray‐200
        },
      },
      boxShadow: {
        glow: '0 0 1.5rem rgba(124, 58, 237, 0.6)', // purple glow
      },
      scale: {
        105: '1.05',
      },
    },
  },
  plugins: [],
}

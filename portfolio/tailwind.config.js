/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1C2D', // Navy Blue
          light: '#1B2C3D',
          dark: '#050E17',
        },
        secondary: {
          DEFAULT: '#2563EB', // Electric Blue
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#9CA3AF', // Silver Gray
          light: '#D1D5DB',
          dark: '#4B5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

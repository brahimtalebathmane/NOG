/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006633',
          dark: '#004d26',
          light: '#00994C',
        },
        secondary: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          light: '#FFED4E',
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
        latin: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

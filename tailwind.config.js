/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e85d04',
          dark: '#dc2f02',
          light: '#f48c06',
        },
        neutral: {
          850: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
    },
  },
  plugins: [],
}

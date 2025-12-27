/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutalist: {
          black: '#000000',
          white: '#FFFFFF',
          accent: '#FF0000', // Optional accent color
        }
      },
      boxShadow: {
        'brutalist': '8px 8px 0px 0px #000000',
        'brutalist-lg': '12px 12px 0px 0px #000000',
        'brutalist-sm': '4px 4px 0px 0px #000000',
      },
      fontWeight: {
        'black': '900',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      }
    },
  },
  plugins: [],
}
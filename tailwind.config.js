/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#111111',
          800: '#1a1a1a',
          700: '#262626',
        },
        brand: {
          dark: '#1A1A1A',
          cream: '#FAFAFA',
          sand: '#F4F1EA',
          gold: '#C5A880',
          muted: '#767676',
          border: '#E5E5E5',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
      },
    },
  },
  plugins: [],
};

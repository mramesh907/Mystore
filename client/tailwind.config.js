/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-200': '#2ca5c7',
        'primary-100': '#0c8cf5',
        'secondary-200': '#00b050',
        'secondary-100': '#0b1a78',
        'primary-400': '#ffbf00', 
        'primary-300': '#ffc929'
      },
    },
  },
  plugins: [],
};

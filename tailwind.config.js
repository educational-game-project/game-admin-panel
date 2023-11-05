/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '.625rem',
        '1.5xs': '13px',
        8: '2rem',
      },
      spacing: {
        0.75: '0.1875rem',
        4.5: '1.125rem',
      },
    },
  },
  plugins: [],
};

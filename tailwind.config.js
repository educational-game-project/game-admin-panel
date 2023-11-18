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
        '3.25xs': '13px',
        8: '2rem',
      },
      spacing: {
        0.75: '0.1875rem',
        4.5: '1.125rem',
      },
      screens: {
        xs: '390px',
        xsm: '480px',
        '2xsm': '576px',
        sm: '640px',
        md: '768px',
        xmd: '840px',
        '2md': '960px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-fast': 'spin 0.75s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};

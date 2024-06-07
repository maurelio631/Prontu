/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        azul:{
          900: '#5A9CDA',
          800: '#F6FAFD',
          700: '#F0F9FF'
        },
        cinza:{
          950: '#404040',
          900: '#A3A3A3',
          800: '#EFEFEF',
          700: '#e0e0e0'
        },
        verde:{
          900:'#46DB5E'
        },
        vermelho: {
          900: '#DA1C1C'
        }
      },
      fontFamily:{
        'sans':["'Montserrat'", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
  ],
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
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
        },


        dark:{
          900: '#121212',
          800: '#1d2022',
          700: '#1b2226',

          600: '#383b40',
          500: '#1b2226',
          100: '#272a2b',
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

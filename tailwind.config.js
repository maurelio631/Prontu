/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'branco': '#000000',
        'cor-secundaria': '#ffffff',
        'azul-principal': '#5A9CDA',
        'azul-transp': '#5a9cda33',
        'cinza-claro': '#EFEFEF',
        'cinza-escuro': '#A3A3A3',
        'verde-claro': '#46DB5E'
      },
      fontFamily:{
        'sans':["'Montserrat'", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};

const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        indigo: colors.indigo,
        truegray: colors.gray,
      },
    },
  },
  variants: {},
  plugins: [],

    theme: {
    // ...
  },
  plugins: [
    require('@shrutibalasa/tailwind-grid-auto-fit'),
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    // ...
  ],
}

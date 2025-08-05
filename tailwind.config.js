/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"GFS Didot"', 'Georgia', 'serif'],
      },
      colors: {
        base: '#F5F5F5',
        navbar: '#EEEEEE',
        card: '#FFFFFF',
        search: '#E9E9E9',
        text: '#333333',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
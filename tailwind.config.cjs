/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};

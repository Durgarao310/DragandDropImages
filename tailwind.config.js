module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'backColor': '#0a1929',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

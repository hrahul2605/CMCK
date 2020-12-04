module.exports = {
  purge: ['./src/**/*.tsx', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#2b2b28',
      pink: '#c19898',
      secondary: '#ebebe3',
      grey: '#4a4a48',
      white: '#ffffff'
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};

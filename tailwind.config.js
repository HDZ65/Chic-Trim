/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #D7DDE8, #757F9A)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 300000000000000s linear infinite',
      },
      colors: {
        'primary': '#6DE0D3', 
        'secondary': '#E092DB', 
        'background': '#f2f2f2', 
        'text': '#0a0e0d', 
      },
      fontFamily: {
        'FjallaOne': ['Fjalla One', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
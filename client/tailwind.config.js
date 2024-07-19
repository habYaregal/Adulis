/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main:{
          50: '#E0F2F9',
          100: "#B3E1F2",
          200: "#80CCEA",
          300: "#4DB7E2",
          400: "#26A7DB",
          500: '#075A85',
          600: '#064D72',
          700: '#053F5F',
          800: '#04334D',
          900: '#03263A'
        }
      }
    },
  },
  plugins: [
    //require('@tailwindcss/forms'),
  ],
}

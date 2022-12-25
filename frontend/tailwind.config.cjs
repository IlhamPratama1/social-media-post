/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quick: 'Quicksand',
      },
      dropShadow: {
        main: '0 0 40px rgba(112, 144, 176, 0.025)',
        purple: '0 10px 20px rgba(195, 197, 255, 0.5)',
        snack: '0 12px 40px rgba(61, 64, 91, 0.05)',
      },
      colors: {
        'blue-s': '#FAFBFD',
        'white-m': '#FFFFFF',
        'purple-m': '#3F2CBD',
        'purple-s': '#5D60EF',
        'purple-t': '#D8D5F2',
      },
    },
  },
  plugins: [],
};

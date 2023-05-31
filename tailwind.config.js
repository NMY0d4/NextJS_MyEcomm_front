/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#11999E',        
        primaryLight: '#68d6da',
        primaryDark: '#107275',
        secondary: '#31d4ac',
        secondaryLight: '#61f3cf',
        secondaryDark: '#2ead8e',
        tertiary: '#E4F9F5',
        gray: '#40514E',
        grayLight:'#96ada9',
        grayDark:'#24312f',

      },
    },
  },
  plugins: [],
}

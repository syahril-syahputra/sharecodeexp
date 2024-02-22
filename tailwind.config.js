/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // './node_modules/flowbite-react/**/*.js',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
    extend: {
      borderWidth: {
        3: '3.2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      lineHeight: {
        'home-letter': '10.278rem',
        'paragraph-letter': '1.741rem',
      },
      letterSpacing: {
        'home-spacing': '30%',
      },
      colors: {
        'secondary-white': '#c7c7c7',
        'sub-header': '#3730A3',
        'top-navbar': '#03072B',
        'footer-resources': '#3B82F6',
        // dark: '#1b1b1b',
        light: '#fff',
        // accent: '#7B00D3',
        // accentDark: '#ffdb4d',
        // gray: '#747474',
        purple: '#340135',
      },
      backgroundColor: {
        'sub-content': '#DCDEEE',
      },
      fontFamily: {
        mr: ['var(--font-mr)'],
        in: ['var(--font-in)'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

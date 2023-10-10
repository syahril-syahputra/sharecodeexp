/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
    ],
    theme: {
        extend: {
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
            },
            backgroundColor: {
                'sub-content': '#DCDEEE',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                carbon: {
                    light: '#2C2C2C',
                    DEFAULT: '#1C1C1C',
                    dark: '#000000',
                },
                gold: {
                    light: '#E5C048',
                    DEFAULT: '#D4AF37',
                    dark: '#B08D1A',
                },
                paper: {
                    light: '#F5F5F7',
                    DEFAULT: '#FDFAF4',
                    dark: '#2A2A2E',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                mono: ['Courier Prime', 'monospace'],
                hand: ['Caveat', 'cursive'],
                title: ['Britani', 'serif'],
            }
        },
    },
    plugins: [],
}

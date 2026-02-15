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
                brand: {
                    orange: '#FF851B', // Vibrant, friendly Orange
                    green: '#2ECC40',  // Futuristic, fresh Green
                    darkOrange: '#D35400',
                    darkGreen: '#27AE60',
                },
                paper: {
                    light: '#F8F9FA', // Cleaner, more modern light grey/white
                    DEFAULT: '#FFFFFF',
                    dark: '#121212',  // Deep dark for futuristic feel
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                mono: ['Courier Prime', 'monospace'],
                hand: ['Caveat', 'cursive'],
                title: ['Brittany', 'serif'],
            }
        },
    },
    plugins: [],
}

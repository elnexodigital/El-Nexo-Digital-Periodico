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
                zen: {
                    bg: '#FAF9F6', // Ivory
                    tan: '#F5F5DC', // Beige/Tan
                    bamboo: '#A9BA9D',
                    earth: '#D2B48C',
                    charcoal: '#333333',
                    steel: '#4682B4',
                    emerald: '#50C878',
                },
                industrial: {
                    orange: '#FB923C',
                    slate: '#1E293B',
                    gray: '#94A3B8',
                    cream: '#FAF9F6',
                    green: '#10B981'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                serif: ['Playfair Display', 'serif'],
                signature: ['Brittany', 'cursive'],
            }
        },
    },
    plugins: [],
}

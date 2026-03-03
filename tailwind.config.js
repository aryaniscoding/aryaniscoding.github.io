/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                surface: '#0a0a0a',
                'surface-light': '#111111',
                'surface-lighter': '#1a1a1a',
                border: '#222222',
                'cyan-neon': '#00f5ff',
                'purple-neon': '#7c3aed',
                'green-neon': '#39ff14',
                'cyan-neon-dim': 'rgba(0, 245, 255, 0.15)',
                'purple-neon-dim': 'rgba(124, 58, 237, 0.15)',
                'green-neon-dim': 'rgba(57, 255, 20, 0.15)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'glitch': 'glitch 0.3s ease-in-out',
                'slide-up': 'slide-up 0.5s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'border-glow': 'border-glow 3s linear infinite',
                'typewriter': 'typewriter 3.5s steps(40) 1s forwards',
                'blink': 'blink 0.75s step-end infinite',
                'spin-slow': 'spin 8s linear infinite',
                'grain': 'grain 8s steps(10) infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 5px rgba(0, 245, 255, 0.3), 0 0 10px rgba(0, 245, 255, 0.1)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(0, 245, 255, 0.2)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'glitch': {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'border-glow': {
                    '0%, 100%': { borderColor: '#00f5ff' },
                    '33%': { borderColor: '#7c3aed' },
                    '66%': { borderColor: '#39ff14' },
                },
                'typewriter': {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                'blink': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#00f5ff' },
                },
                'grain': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '20%': { transform: 'translate(-15%, 5%)' },
                    '30%': { transform: 'translate(7%, -25%)' },
                    '40%': { transform: 'translate(-5%, 25%)' },
                    '50%': { transform: 'translate(-15%, 10%)' },
                    '60%': { transform: 'translate(15%, 0%)' },
                    '70%': { transform: 'translate(0%, 15%)' },
                    '80%': { transform: 'translate(3%, 35%)' },
                    '90%': { transform: 'translate(-10%, 10%)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}

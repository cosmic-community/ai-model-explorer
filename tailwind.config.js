/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        card: '#141414',
        'card-foreground': '#ffffff',
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        secondary: '#262626',
        'secondary-foreground': '#ffffff',
        muted: '#404040',
        'muted-foreground': '#a3a3a3',
        border: '#262626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1a1a2e',
          foreground: '#e5e7eb',
        },
        accent: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1f1f2e',
          foreground: '#9ca3af',
        },
        border: '#2d2d44',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
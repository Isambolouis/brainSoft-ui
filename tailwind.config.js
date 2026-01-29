/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#0052A3',
        },
        secondary: {
          DEFAULT: '#00B8A9',
        },
        accent: {
          DEFAULT: '#FFB81C',
        },
        text: {
          primary: '#1A202C',
          secondary: '#718096',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F7FAFC',
        },
        danger: '#E53E3E',
        success: '#00B8A9',
        warning: '#FFB81C',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        light: '0 1px 3px rgba(0,0,0,0.08)',
        medium: '0 2px 8px rgba(0,0,0,0.12)',
        heavy: '0 4px 16px rgba(0,0,0,0.16)',
      },
    },
  },
  plugins: [],
}

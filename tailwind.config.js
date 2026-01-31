/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        surface: {
          800: 'rgba(30, 41, 59, 0.7)',
          900: 'rgba(15, 23, 42, 0.85)',
          glass: 'rgba(30, 41, 59, 0.5)',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          muted: 'rgba(139, 92, 246, 0.15)',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 12px 40px -8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

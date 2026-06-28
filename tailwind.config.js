/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pool: {
          50: '#eefcff',
          100: '#d4f5ff',
          200: '#b0edff',
          300: '#79e2ff',
          400: '#38cdf4',
          500: '#0eb3e0',
          600: '#018fbd',
          700: '#067299',
          800: '#0d5e7d',
          900: '#104e6a',
          950: '#083349',
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(8, 51, 73, 0.25)',
      },
      keyframes: {
        wave: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

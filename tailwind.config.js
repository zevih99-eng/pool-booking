/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1d1d1f',
        ink80: '#333333',
        ink48: '#7a7a7a',
        accent: '#0066cc',
        'accent-focus': '#0071e3',
        'accent-dark': '#2997ff',
        canvas: '#ffffff',
        parchment: '#f5f5f7',
        pearl: '#fafafc',
        hairline: '#e0e0e0',
        'divider-soft': '#f0f0f0',
        tile: '#1d1d1f',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        xs: '5px',
        sm: '8px',
        md: '11px',
        lg: '18px',
        pill: '9999px',
      },
      boxShadow: {
        // The single product/photo shadow from the Apple system — used sparingly.
        product: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0',
      },
    },
  },
  plugins: [],
}

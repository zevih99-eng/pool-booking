/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Institutional "glacial" palette for Iceland Industrial Group
        ink: '#0a1726', // near-black navy — primary text & dark sections
        navy: '#0d2440', // deep brand navy
        slate: '#41566b', // muted body text
        steel: '#6b7c8f', // secondary / captions
        glacier: '#1f5fa8', // primary accent (deep ice blue)
        ice: '#6fa8dc', // light accent
        frost: '#f4f7fa', // light section background
        mist: '#e7edf3', // hairlines / soft fills
        hairline: '#dde4ec',
        canvas: '#ffffff',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '20px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 36, 64, 0.04), 0 8px 30px rgba(13, 36, 64, 0.06)',
        lift: '0 12px 40px rgba(13, 36, 64, 0.12)',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
    },
  },
  plugins: [],
}

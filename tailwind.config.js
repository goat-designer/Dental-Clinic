/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,html}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#003459', // Prussian blue
          700: '#00171F', // Rich black
          800: '#007EA7', // Cerulean
          900: '#00A8E8', // Picton Blue
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Merriweather', 'Georgia', 'serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        'outline-blue': '0 0 0 3px rgba(0, 52, 89, 0.45)',
      },
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#cc1a1a',
          'red-dark': '#a01414',
          'red-light': '#e53030',
          blue: '#0d2a6e',
          'blue-light': '#1a4a9e',
          sky: '#5b9bd5',
          steel: '#1c2a3a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'slide-down': 'slideDown 0.4s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 6s ease infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { from: { opacity: '0', transform: 'translateX(40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(204,26,26,0.5)' },
          '50%': { boxShadow: '0 0 30px 10px rgba(204,26,26,0.15)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: { xs: '2px' },
      backgroundSize: { '200': '200% 100%' },
    },
  },
  plugins: [],
}

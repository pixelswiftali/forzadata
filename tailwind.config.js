/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        foreground: '#F1F5F9',
        card: '#1E293B',
        'card-hover': '#334155',
        accent: '#00D9FF',
        'accent-secondary': '#FF0055',
        'text-muted': '#E2E8F0',
        border: '#334155',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'stat-fill': 'stat-fill 1.5s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' },
        },
        'stat-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--stat-width)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 217, 255, 0.3)',
        'neon-red': '0 0 15px rgba(255, 0, 85, 0.3)',
      },
    },
  },
  plugins: [],
};

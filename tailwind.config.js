/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f4f7fb',
        surface: '#ffffff',
        surface2: '#eef2ff',
        ink: '#132238',
        muted: '#5d6b82',
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#eaf1ff'
        },
        accent: {
          DEFAULT: '#ff7a00',
          dark: '#e56900'
        },
        border: '#dce4f0'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px rgba(19, 34, 56, 0.1)',
        card: '0 10px 30px rgba(19, 34, 56, 0.08)',
        lift: '0 24px 48px rgba(37, 99, 235, 0.18)'
      },
      keyframes: {
        floatIn: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.18)' },
          '50%': { boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.04)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      },
      animation: {
        floatIn: 'floatIn 0.6s ease forwards',
        drift: 'drift 6s ease-in-out infinite',
        glowPulse: 'glowPulse 2.4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite'
      }
    }
  },
  plugins: []
};

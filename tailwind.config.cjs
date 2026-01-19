/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapped "Night" to Deep Red, "Royal" to White/Pink
        night: "#9f1239",      // Deep Rose Red (Was Black)
        deepnight: "#881337",  // Darker Red (Was Deep Purple)
        surface: "#be185d",    // Pink Surface
        royal: "#ffffff",      // White (Accents)
        deeproyal: "#fce7f3",  // Soft Pink
        neonpink: "#ffffff",   // White (For Glowing Text)
        heartred: "#ff0000",   // Pure Red
        textsoft: "#fff1f2",   // Very Light Pink/White text
        muted: "#fbcfe8",      // Muted Pink
        borderpurple: "rgba(255,255,255,0.3)", // White Border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cursive: ['Great Vibes', 'cursive'], // Added for "Baraa" font
      },
      backgroundImage: {
        // The Red -> Pink -> White Gradient
        'hero-gradient': "linear-gradient(180deg, #881337 0%, #db2777 50%, #fce7f3 100%)",
        'primary-gradient': "linear-gradient(90deg, #ffffff 0%, #fce7f3 100%)",
        'card-glow': "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 60%)",
        'special-gradient': "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,200,200,0.1))",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.4)',
        'pink-glow': '0 0 30px rgba(255, 255, 255, 0.5)',
        'red-glow': '0 0 25px rgba(255, 0, 80, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 15s linear infinite', // Added for the Heart Tunnel
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}

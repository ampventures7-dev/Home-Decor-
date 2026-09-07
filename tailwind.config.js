/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm palette tokens
        walnut: {
          DEFAULT: "#2C1E18", // Walnut brown
          dark: "#1E1510",
          light: "#48362B",
          muted: "#6B5548"
        },
        charcoal: {
          DEFAULT: "#1D1B1A", // Charcoal
          soft: "#2A2726",
          muted: "#45413E"
        },
        beige: {
          DEFAULT: "#E5DDD0", // Warm Beige
          light: "#F0E9DF",
          dark: "#CBBFA9",
          border: "#D6CAB7"
        },
        offwhite: {
          DEFAULT: "#FAF7F2", // Off-white
          pure: "#FDFBF8",
          tint: "#F5F0E8"
        },
        // Handcrafted accents
        terracotta: {
          DEFAULT: "#A85C3A",
          dark: "#8C492B",
          light: "#C1724E"
        },
        brass: {
          DEFAULT: "#D4A373",
          light: "#E6B87D"
        },
        sage: {
          DEFAULT: "#6F7560",
          light: "#8B927A"
        },
        // Legacy aliases
        ivory: "#FAF7F2",
        wood: "#2C1E18"
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        display: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "sans-serif"]
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(44, 30, 24, 0.08)',
        'warm-md': '0 8px 24px -4px rgba(44, 30, 24, 0.12)',
        'warm-lg': '0 16px 36px -6px rgba(44, 30, 24, 0.16)'
      }
    }
  },
  plugins: []
};
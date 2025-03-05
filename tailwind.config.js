/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FA7F35",
      },
      fontFamily: {
        Jakarta: ["PlusJakartaSans-Regular", "sans-serif"],
        JakartaMedium: ["PlusJakartaSans-Medium", "sans-serif"],
        JakartaSemiBold: ["PlusJakartaSans-SemiBold", "sans-serif"],
        JakartaBold: ["PlusJakartaSans-Bold", "sans-serif"],
        JakartaExtraBold: ["PlusJakartaSans-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

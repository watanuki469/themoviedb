/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
}


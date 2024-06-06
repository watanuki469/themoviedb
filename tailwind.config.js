/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js"

  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    extend: {
      keyframes: {
        orbit: {
          to: { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        orbit: 'orbit 30s linear infinite',
        // Customize the duration for different elements if needed
      }
    }
  }
}


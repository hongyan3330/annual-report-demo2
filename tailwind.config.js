/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./*.vue",
        "./components/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                theme: '#FFF6E9'
            }
        },
    },
    plugins: [],
}

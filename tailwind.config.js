/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,hbs}"],
  // content: ["./views/Home.hbs","./views/layouts/main.hbs", "./views/register.hbs"],
  theme: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')],
}


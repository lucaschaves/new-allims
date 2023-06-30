/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/template/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: "300px auto",
                "sidebar-collapsed": "64px auto",
            },
            transitionProperty: {
                width: "width",
                height: "height",
            },
            boxShadow: {
                select: "inset rgb(49 139 225 / 51%) 0px 0px 1px 1px",
            },
            colors: {
                "blue-main": "#14335b",
            },
        },
    },
    plugins: [],
};

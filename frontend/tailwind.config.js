/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				Orbitron: ['"Orbitron"', ...defaultTheme.fontFamily.sans],
				Montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.mono],
			},
			keyframes: {
				"fade-slide-up": {
					"0%": { opacity: "0", transform: "translateY(10rem)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				"fade-slide-up": "fade-slide-up 0.3s ease-out forwards",
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"spin-slow": "spin 1.5s linear infinite",
				"spin-fast": "spin 0.75s linear infinite",
				"pulse-fast": "pulse 1s linear infinite",
			},
			blur: {
				2: "0.5rem",
				40: "10rem",
			},
			borderRadius: {
				8.5: "2.125rem",
				half: "50%",
			},
			borderWidth: {
				3: "3px",
			},
			boxShadow: {
				"solid-slate-100": "0 -12px 0 0 rgb(241,245,249)",
				"solid-gray-900": "0 -12px 0 0 rgb(17,24,39)",
			},
			content: {
				empty: '""',
			},
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				"2xs": ".625rem",
				"3.25xs": "13px",
				8: "2rem",
			},
			scale: {
				104: "1.04",
				115: "1.15",
			},
			screens: {
				xs: "390px",
				xsm: "480px",
				"2xsm": "576px",
				sm: "640px",
				md: "768px",
				xmd: "840px",
				"2md": "960px",
				lg: "1024px",
				xl: "1200px",
				"2xl": "1440px",
				"3xl": "1536px",
			},
			spacing: {
				0.125: "0.03125rem",
				0.75: "0.1875rem",
				1.6375: "0.409375rem",
				4.5: "1.125rem",
				5.5: "1.375rem",
				6.5: "1.625rem",
				18: "4.5rem",
				30: "7.5rem",
				31: "7.75rem",
				34: "8.5rem",
				46: "11.5rem",
				58: "14.5rem",
				10.8: "2.7rem",
				106: "26.5rem",
				112.5: "28.125rem",
			},
			transitionDuration: {
				400: "400ms",
			},
			zIndex: {
				full: 9999,
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class", // only generate classes
		}),
	],
	darkMode: "class",
};

import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	theme: {
		fontSize: {
			xs: ["12px", "17px"],
			sm: ["14px", "20px"],
			base: ["16px", "22px"],
			lg: ["18px", "24px"],
			xl: ["20px", "28px"],
			"2xl": ["22px", "30px"],
		},
		extend: {
			colors: {
				primary: "#08BEBE",
				danger: "#E04949",
			},
		},
	},
	shortcuts: {
		root: "w-screen h-screen overflow-auto",
		"x-center": "flex items-center justify-center",
		"custom-input": "leading-24px px-16px py-14px text-[#666] resize-none",
	},
	extract: {
		include: ["index.html", "src/**/*.{vue,html,jsx,tsx}"],
		exclude: ["node_modules/**/*", ".git/**/*"],
	},
});

import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import type { ThemeState } from "../types";

const getTheme = () => {
	const theme = localStorage.getItem("themeKogGame");
	if (theme) {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.setAttribute("data-color-mode", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.setAttribute("data-color-mode", "light");
		}
		return theme;
	}
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		document.documentElement.classList.add("dark");
		document.documentElement.setAttribute("data-color-mode", "dark");
		return "dark";
	} else {
		document.documentElement.classList.remove("dark");
		document.documentElement.setAttribute("data-color-mode", "light");
		return "light";
	}
};

const initialState: ThemeState = {
	theme: getTheme() as "light" | "dark",
};

export const themeSlice = createSlice({
	name: "themes",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
			if (state.theme === "dark") {
				document.documentElement.classList.add("dark");
				document.documentElement.setAttribute("data-color-mode", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				document.documentElement.setAttribute("data-color-mode", "light");
			}
			localStorage.setItem("themeKogGame", state.theme);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.themes.theme;

export default themeSlice.reducer;

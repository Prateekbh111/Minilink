import { createSlice } from "@reduxjs/toolkit";

const initialState = { themeMode: "light" };

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setDarkMode(state, action) {
			state.themeMode = "dark";
		},
		setLightMode(state, action) {
			state.themeMode = "light";
		},
	},
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;

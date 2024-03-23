import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./theme.slice";
import authenticationSliceReducer from "./authentication.slice";

const store = configureStore({
	reducer: {
		theme: themeSliceReducer,
		authentication: authenticationSliceReducer,
	},
});

export default store;

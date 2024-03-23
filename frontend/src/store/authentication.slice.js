import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk();

const initialState = {
	auth: null,
};

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		setAuth(state, action) {
			state.auth = action.payload.auth;
		},
	},
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;

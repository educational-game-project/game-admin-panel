import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import type { AuthState, Token, UserAuth } from "../types";

const authCredential = JSON.parse(
	localStorage.getItem("userKogGame") || "null"
) as AuthState;

const initialState: AuthState = authCredential
	? authCredential
	: { user: null, token: null, isAuth: null };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (
			state,
			action: PayloadAction<{ user: UserAuth; tokens: Token }>
		) => {
			const { user, tokens } = action.payload;
			localStorage.setItem(
				"userKogGame",
				JSON.stringify({
					user: user,
					token: tokens,
					isAuth: true,
				})
			);
			state.user = user;
			state.token = tokens;
			state.isAuth = true;
		},
		setUnAuth: (state) => {
			localStorage.removeItem("userKogGame");
			state.user = null;
			state.token = null;
			state.isAuth = false;
		},
	},
});

export const { setAuth, setUnAuth } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const isAuthenticated = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;

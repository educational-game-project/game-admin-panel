import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import type { ToastState } from "../types";

const initialState: ToastState = {
	isAllowed: false,
};

export const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		setAllowedToast: (state) => {
			state.isAllowed = true;
		},
		setNotAllowedToast: (state) => {
			state.isAllowed = false;
		},
	},
});

export const { setAllowedToast, setNotAllowedToast } = toastSlice.actions;

export const selectIsAllowedToast = (state: RootState) => state.toast.isAllowed;

export default toastSlice.reducer;

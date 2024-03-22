import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import type { Breadcrumb, BreadcrumbState } from "../types";

const initialState: BreadcrumbState = {
	breadcrumbs: [],
};

export const breadcrumbSlice = createSlice({
	name: "breadcrumb",
	initialState,
	reducers: {
		setBreadcrumb: (state, action: PayloadAction<Breadcrumb[]>) => {
			state.breadcrumbs = action.payload;
		},
	},
});

export const { setBreadcrumb } = breadcrumbSlice.actions;

export const selectBreadcrumb = (state: RootState) =>
	state.breadcrumb.breadcrumbs;

export default breadcrumbSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { Breadcrumb, BreadcrumbState } from '../types';

const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<Breadcrumb[]>) => {
      state.breadcrumbs = action.payload;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;

export const selectBreadcrumb = (state: RootState) =>
  state.breadcrumb.breadcrumbs;

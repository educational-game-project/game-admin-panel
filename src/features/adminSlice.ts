import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';
import type { AdminState } from '../types';

const initialState: AdminState = {
  admin: null,
  page: null,
  status: 'idle',
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const { data, page } = action.payload;
      state.admin = data;
      state.page = page;
      state.status = 'success';
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admin.admin;
export const selectAdminPage = (state: RootState) => state.admin.page;
export const selectAdminStatus = (state: RootState) => state.admin.status;

export default adminSlice.reducer;

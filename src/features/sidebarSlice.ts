import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
  showSidebar: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

export const selectExpanded = (state: RootState) => state.sidebar.showSidebar;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { ToastState } from '../types';

const initialState: ToastState = {
  isAllowed: false,
};

export const toastSlice = createSlice({
  name: 'toast',
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

export default toastSlice.reducer;

export const selectIsAllowedToast = (state: RootState) => state.toast.isAllowed;

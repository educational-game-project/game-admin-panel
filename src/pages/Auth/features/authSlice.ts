import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    setUnAuth: (state) => {
      state.user = null;
    },
  },
});

export const { setAuth, setUnAuth } = authSlice.actions;
export default authSlice.reducer;

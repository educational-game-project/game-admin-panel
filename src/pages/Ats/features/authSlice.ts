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
    setUnauth: (state) => {
      state.user = null;
    },
  },
});

export const { setAuth, setUnauth } = authSlice.actions;
export default authSlice.reducer;

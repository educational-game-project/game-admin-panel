import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;

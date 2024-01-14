import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import { AuthState, Token, User } from '../../../types';

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; tokens: Token }>) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.token = tokens;
    },
    setUnAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, setUnAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { AuthState, Token, User } from '../types';

const authCredential = JSON.parse(
  localStorage.getItem('userKogGame') || 'null'
) as {
  user: User | null;
  token: Token | null;
};

const initialState: AuthState = authCredential
  ? authCredential
  : { user: null, token: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; tokens: Token }>) => {
      const { user, tokens } = action.payload;
      localStorage.setItem(
        'userKogGame',
        JSON.stringify({
          user: user,
          token: tokens,
        })
      );
      state.user = user;
      state.token = tokens;
    },
    setUnAuth: (state) => {
      localStorage.removeItem('userKogGame');
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, setUnAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { getBaseUrl } from '../utilities/api';
import { LoginRequest, LoginSuccessResponse } from '../types';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token.accessToken}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

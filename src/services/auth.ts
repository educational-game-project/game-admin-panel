import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginSuccessResponse } from '../types/api';

interface LoginCredential {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // baseUrl: 'http://34.87.161.233:3000/admin',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginCredential>({
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

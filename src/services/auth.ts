import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginSuccessResponse } from '../types/api';

const BASE_URL =
  import.meta.env.VITE_MODE === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_URL;

interface LoginCredential {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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

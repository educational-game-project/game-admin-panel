import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginCredential {
  email: string;
  password: string;
}

interface UserProps {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  images: string[];
  school: string;
}

interface TokenProps {
  accessToken: string;
  refreshToken: string;
}

interface LoginSuccessResponse {
  status_code: number;
  success: true;
  status: 'success';
  message: 'auth_login_success';
  server_time: string;
  data: {
    user: UserProps;
    tokens: TokenProps;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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

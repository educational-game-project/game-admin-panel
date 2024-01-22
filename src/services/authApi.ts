import { coreApi } from '../api/coreApi';
import { LoginRequest, LoginSuccessResponse, SuccessResponse } from '../types';

export const authApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<SuccessResponse, void>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;

import { coreApi } from '../api/coreApi';
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginSuccessResponse,
  SuccessResponse,
} from '../types';

export const authApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Profile'],
    }),
    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<SuccessResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;

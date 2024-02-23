import { coreApi } from '../api/coreApi';

import type {
  AdminIdRequest,
  AdminListSuccessResponse,
  DataTableGetRequest,
  SuccessResponse,
} from '../types';

export const adminApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.mutation<AdminListSuccessResponse, DataTableGetRequest>({
      query: (data) => ({
        url: '/user/admin/find',
        method: 'POST',
        body: data,
      }),
    }),
    deleteAdmin: builder.mutation<SuccessResponse, AdminIdRequest>({
      query: (id) => ({
        url: `/user/admin`,
        method: 'DELETE',
        body: id,
      }),
    }),
  }),
});

export const { useDeleteAdminMutation, useGetAdminMutation } = adminApi;

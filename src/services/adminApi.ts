import { coreApi } from '../api/coreApi';

import type { AdminListSuccessResponse, DataTableGetRequest } from '../types';

export const adminApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.mutation<AdminListSuccessResponse, DataTableGetRequest>({
      query: (data) => ({
        url: '/user/admin/find',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAdminMutation } = adminApi;

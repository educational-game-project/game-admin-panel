import { coreApi } from '../api/coreApi';

import type {
  AdminIdRequest,
  AdminListSuccessResponse,
  AdminSuccessResponse,
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
    getAdminById: builder.mutation<AdminSuccessResponse, AdminIdRequest>({
      query: (id) => ({
        url: '/user/admin/detail',
        method: 'POST',
        body: id,
      }),
    }),
    getActiveAdmin: builder.query({
      query: () => '/user/active',
    }),
    addAdmin: builder.mutation({
      query: (data) => {
        const formAddAdmin = new FormData();
        formAddAdmin.append('name', data.name);
        formAddAdmin.append('email', data.email);
        formAddAdmin.append('phoneNumber', data.phoneNumber);
        formAddAdmin.append('password', data.password);
        formAddAdmin.append('schoolId', data.school);
        if (data?.media) {
          formAddAdmin.append('media', data?.media[0] || '');
        }
        return {
          url: '/user/admin',
          method: 'POST',
          body: formAddAdmin,
          formData: true,
        };
      },
    }),
    updateAdmin: builder.mutation({
      query: (data) => {
        const formEditAdmin = new FormData();
        formEditAdmin.append('id', data.id);
        formEditAdmin.append('name', data.name);
        formEditAdmin.append('email', data.email);
        formEditAdmin.append('phoneNumber', data.phoneNumber);
        formEditAdmin.append('schoolId', data.school);
        if (data?.media) {
          formEditAdmin.append('media', data?.media[0] || '');
        }
        return {
          url: '/user/admin',
          method: 'PUT',
          body: formEditAdmin,
          formData: true,
        };
      },
      invalidatesTags: ['Student'],
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

export const {
  useGetActiveAdminQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetAdminByIdMutation,
  useGetAdminMutation,
  useUpdateAdminMutation,
} = adminApi;

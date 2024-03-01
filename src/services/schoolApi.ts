import { coreApi } from '../api/coreApi';

import type {
  DataTableGetRequest,
  SchoolIdRequest,
  SchoolListSuccessResponse,
  SchoolSuccessResponse,
  SuccessResponse,
} from '../types';

export const schoolApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchool: builder.mutation<SchoolListSuccessResponse, DataTableGetRequest>(
      {
        query: (data) => ({
          url: '/schools/find',
          method: 'POST',
          body: data,
        }),
      }
    ),
    getSchoolById: builder.mutation<SchoolSuccessResponse, SchoolIdRequest>({
      query: (id) => ({
        url: '/schools/detail',
        method: 'POST',
        body: id,
      }),
    }),
    addSchool: builder.mutation({
      query: (data) => {
        const formAddSchool = new FormData();
        formAddSchool.append('name', data.name);
        formAddSchool.append('address', data.address);
        if (data?.media) {
          formAddSchool.append('media', data?.media[0] || '');
        }
        return {
          url: '/schools',
          method: 'POST',
          body: formAddSchool,
          formData: true,
        };
      },
      invalidatesTags: ['School', 'Dashboard'],
    }),
    updateSchool: builder.mutation({
      query: (data) => {
        const formEditSchool = new FormData();
        formEditSchool.append('id', data.id);
        formEditSchool.append('name', data.name);
        formEditSchool.append('address', data.address);
        if (data?.media) {
          formEditSchool.append('media', data?.media[0] || '');
        }
        return {
          url: '/schools',
          method: 'PUT',
          body: formEditSchool,
          formData: true,
        };
      },
      invalidatesTags: ['School', 'Dashboard'],
    }),
    deleteSchool: builder.mutation<SuccessResponse, SchoolIdRequest>({
      query: (id) => ({
        url: '/schools',
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['School', 'Dashboard'],
    }),
  }),
});

export const {
  useGetSchoolMutation,
  useGetSchoolByIdMutation,
  useAddSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolApi;

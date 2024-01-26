import { coreApi } from '../api/coreApi';
import {
  DataTableGetRequest,
  SchoolIdRequest,
  SchoolSuccessResponse,
  SuccessResponse,
} from '../types';

export const schoolApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchool: builder.mutation<SchoolSuccessResponse, DataTableGetRequest>({
      query: (data) => ({
        url: '/schools/find',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['School'],
    }),
    getSchoolById: builder.mutation({
      query: (id) => ({
        url: '/user/school/detail',
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['School'],
    }),
    addSchool: builder.mutation({
      query: (data) => {
        const formAddSchool = new FormData();
        formAddSchool.append('name', data.name);
        formAddSchool.append('email', data.email);
        formAddSchool.append('phoneNumber', data.phoneNumber);
        formAddSchool.append('address', data.address);
        formAddSchool.append('media', data.media[0]);
        return {
          url: '/user/school',
          method: 'POST',
          body: formAddSchool,
          formData: true,
        };
      },
      invalidatesTags: ['School'],
    }),
    updateSchool: builder.mutation({
      query: (data) => {
        const formEditSchool = new FormData();
        formEditSchool.append('name', data.name);
        formEditSchool.append('email', data.email);
        formEditSchool.append('phoneNumber', data.phoneNumber);
        formEditSchool.append('address', data.address);
        formEditSchool.append('media', data.media[0]);
        return {
          url: '/user/school',
          method: 'POST',
          body: formEditSchool,
          formData: true,
        };
      },
      invalidatesTags: ['School'],
    }),
    deleteSchool: builder.mutation<SuccessResponse, SchoolIdRequest>({
      query: (id) => ({
        url: '/school',
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['School'],
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

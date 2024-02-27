import { coreApi } from '../api/coreApi';

import type {
  DataTableGetRequest,
  StudentIdRequest,
  StudentListSuccessResponse,
  StudentSuccessResponse,
  SuccessResponse,
} from '../types';

export const studentApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.mutation<
      StudentListSuccessResponse,
      DataTableGetRequest
    >({
      query: (data) => ({
        url: '/user/student/find',
        method: 'POST',
        body: data,
      }),
    }),
    getStudentById: builder.mutation<StudentSuccessResponse, StudentIdRequest>({
      query: (id) => ({
        url: '/user/student/detail',
        method: 'POST',
        body: id,
      }),
    }),
    getActiveStudent: builder.query({
      query: () => '/user/student/active',
    }),
    addStudent: builder.mutation({
      query: (data) => {
        const formAddStudent = new FormData();
        formAddStudent.append('name', data.name);
        formAddStudent.append('email', data.email);
        formAddStudent.append('phoneNumber', data.phoneNumber);
        formAddStudent.append('schoolId', data.school);
        if (data?.media) {
          formAddStudent.append('media', data?.media[0] || '');
        }
        return {
          url: '/user/student',
          method: 'POST',
          body: formAddStudent,
          formData: true,
        };
      },
    }),
    updateStudent: builder.mutation({
      query: (data) => {
        const formEditStudent = new FormData();
        formEditStudent.append('id', data.id);
        formEditStudent.append('name', data.name);
        formEditStudent.append('email', data.email);
        formEditStudent.append('phoneNumber', data.phoneNumber);
        formEditStudent.append('schoolId', data.school);
        if (data?.media) {
          formEditStudent.append('media', data?.media[0] || '');
        }
        return {
          url: '/user/student',
          method: 'PUT',
          body: formEditStudent,
          formData: true,
        };
      },
    }),
    deleteStudent: builder.mutation<SuccessResponse, StudentIdRequest>({
      query: (id) => ({
        url: '/user/student',
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useGetActiveStudentQuery,
  useGetStudentMutation,
  useGetStudentByIdMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

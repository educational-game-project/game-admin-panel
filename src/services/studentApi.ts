import { coreApi } from '../api/coreApi';
import {
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
      invalidatesTags: ['Student'],
    }),
    getStudentById: builder.mutation<StudentSuccessResponse, StudentIdRequest>({
      query: (id) => ({
        url: '/user/student/detail',
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['Student'],
    }),
    addStudent: builder.mutation({
      query: (data) => {
        const formAddStudent = new FormData();
        formAddStudent.append('name', data.name);
        formAddStudent.append('email', data.email);
        formAddStudent.append('phoneNumber', data.phoneNumber);
        formAddStudent.append('schoolId', data.schoolId);
        formAddStudent.append('media', data.media[0]);
        return {
          url: '/user/student',
          method: 'POST',
          body: formAddStudent,
          formData: true,
        };
      },
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation({
      query: (data) => {
        const formEditStudent = new FormData();
        formEditStudent.append('name', data.name);
        formEditStudent.append('email', data.email);
        formEditStudent.append('phoneNumber', data.phoneNumber);
        formEditStudent.append('schoolId', data.schoolId);
        formEditStudent.append('media', data.media[0]);
        return {
          url: '/user/student',
          method: 'POST',
          body: formEditStudent,
          formData: true,
        };
      },
      invalidatesTags: ['Student'],
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
  useGetStudentMutation,
  useGetStudentByIdMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

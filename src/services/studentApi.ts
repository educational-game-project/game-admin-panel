import { coreApi } from '../api/coreApi';
import {
  StudentDeleteRequest,
  StudentGetRequest,
  StudentSuccessResponse,
  SuccessResponse,
} from '../types';

export const studentApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.mutation<StudentSuccessResponse, StudentGetRequest>({
      query: (data) => ({
        url: '/user/student/find',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentById: builder.query<StudentSuccessResponse, string>({
      query: (id) => `/student/${id}`,
      providesTags: ['Student'],
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
      query: (data) => ({
        url: `/student/${data.id}`,
        method: 'PUT',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['Student'],
    }),
    deleteStudent: builder.mutation<SuccessResponse, StudentDeleteRequest>({
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
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

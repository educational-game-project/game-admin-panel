import { coreApi } from '../api/coreApi';
import type {
  LogIdRequest,
  SuccessResponse,
  DataTableGetRequest,
  LogListSuccessResponse,
} from '../types';

export const logApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.mutation<LogListSuccessResponse, DataTableGetRequest>({
      query: (data) => ({
        url: '/logs',
        method: 'POST',
        body: data,
      }),
    }),
    deleteLog: builder.mutation<SuccessResponse, LogIdRequest>({
      query: (id) => ({
        url: '/logs',
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Activity'],
    }),
  }),
});

export const { useDeleteLogMutation, useGetLogsMutation } = logApi;

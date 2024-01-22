import { coreApi } from '../api/coreApi';

import { ProfileSuccessResponse } from '../types';

export const profileApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileSuccessResponse, void>({
      query: () => '/user/profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;

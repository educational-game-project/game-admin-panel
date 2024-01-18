import { coreApi } from '../api/coreApi';

import { ProfileSuccessData } from '../types';

export const userApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileSuccessData, void>({
      query: () => '/user/profile',
    }),
  }),
});

export const { useGetProfileQuery } = userApi;

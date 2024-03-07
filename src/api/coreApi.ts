import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../utilities/apiUtils';
import { RootState } from '../app/store';
import { setAuth, setUnAuth } from '../features/authSlice';
import { Mutex } from 'async-mutex';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { LoginSuccessData } from '../types';
import { setAllowedToast } from '../features/toastSlice';
import { showErrorToast } from '../components/Toast';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token.accessToken}`);
    }
    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQuery(
            '/auth/refresh-token',
            api,
            extraOptions
          );
          if (refreshResult.data) {
            const { user, tokens } = refreshResult.data as LoginSuccessData;
            api.dispatch(setAuth({ user, tokens }));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(setAllowedToast());
            showErrorToast('Token expired. Silahkan login kembali');
            api.dispatch(setUnAuth());
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      if (result.error.status === 403) {
        api.dispatch(setAllowedToast());
        showErrorToast('You are not authorized to perform this action');
      }
    }
  }
  return result;
};

export const coreApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Admin',
    'Auth',
    'Dashboard',
    'Game',
    'Profile',
    'School',
    'Score',
    'Student',
  ],
  endpoints: () => ({}),
});

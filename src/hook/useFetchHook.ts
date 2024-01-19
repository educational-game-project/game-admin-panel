import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { AuthState } from '../types';
import { getBaseUrl } from '../utilities/api';

interface IPropUseFetchHook {
  url: string;
  method?: string;
  options?: AxiosRequestConfig;
  payload?: Record<string, any>;
}

const useFetchHook = <T>({ url, method, options, payload }: IPropUseFetchHook): { data: T | null; error: Error | null; loading: boolean, setStartFetching: Dispatch<SetStateAction<boolean>> } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startFetching, setStartFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (startFetching) {
          const createAxiosInstance = axios.create({ baseURL: getBaseUrl(), method: method ?? "POST" });

          const getLocalData: string | null = localStorage.getItem('userKogGame');

          if (!getLocalData) return handleUnauthorized();

          const user: AuthState = JSON.parse(getLocalData);

          createAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user?.token?.accessToken}`;

          const response = await createAxiosInstance({ ...options, url, data: { ...payload } })

          if (response.status === 401) return handleUnauthorized();

          const result = response;

          setData(result.data);
        }

      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
        setStartFetching(false)
      }
    };

    const handleUnauthorized = (): void => {
      localStorage.removeItem('userKogGame');
      window.location.replace('/login');
    };

    fetchData();
  }, [startFetching]);

  return { data, error, loading, setStartFetching };
};
export default useFetchHook;
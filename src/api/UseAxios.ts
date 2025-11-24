import { useState } from 'react';
import { api } from './api';

type useAxiosProps = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authToken?: boolean;
  useBaseURL?: boolean;
};

export function useAxios<T>({
  url,
  method = 'GET',
  authToken = true,
  useBaseURL = true,
}: useAxiosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const genRequest = async (
    body?: any
  ): Promise<T | { success: false; errorMessage: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api({
        baseURL: useBaseURL ? api.defaults.baseURL : '',
        url,
        method,
        data: body,
        authToken,
      });

      setData(res.data);
      return res.data;
    } catch (err: any) {
      const backendError =
        err.response?.data?.errorMessage || err.response?.data || err.message;

      setError(backendError);

      return {
        success: false,
        errorMessage: backendError,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, genRequest, data, error };
}

import { useState } from 'react';
import { api } from './api';

type useAxiosProps = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
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

  const genRequest = async (body?: any) => {
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
      console.log('response');
      console.log(res);

      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, genRequest, data, error };
}

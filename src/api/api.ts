import { login, logout } from '@/store/slices/authSlice';
import { store } from '@/store/store';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const api = axios.create({
  baseURL:
    import.meta.env.LOCKBASE_API_BASE_URL || 'http://localhost:8080/lockbase',
  withCredentials: true,
});

async function doRefresh(): Promise<string> {
  const res = await api.post('/auth/refresh', {}, { authToken: false as any });
  const newAccessToken = res.data?.accessToken as string;

  if (!newAccessToken) throw new Error('Refresh did not return accessToken');

  const currentUser = store.getState().auth.user;
  store.dispatch(login({ user: currentUser, token: newAccessToken }));

  return newAccessToken;
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { skipAuth?: boolean }) => {
    if (!config.skipAuth) {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original: any = error.config;

    if (!original) return Promise.reject(error);

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = doRefresh().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise!;
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (refreshErr) {
        store.dispatch(logout());
        window.location.href = '/sign-in';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

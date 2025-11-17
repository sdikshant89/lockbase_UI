import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const api = axios.create({
  baseURL:
    import.meta.env.LOCKBASE_API_BASE_URL || 'http://localhost:8080/lockbase',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { authToken?: boolean }) => {
    const sendToken = config.authToken !== false;

    if (sendToken) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config;

    if (error.response?.status === 401 && original) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('access_token', newAccessToken);

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(original);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

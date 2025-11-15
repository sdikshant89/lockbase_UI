import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    authToken?: boolean;
  }
}

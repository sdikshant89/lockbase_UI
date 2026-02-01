import { RootState } from '@/store/store';
import {
  countryCodes,
  loginRequest,
  loginResponse,
  refreshResponse,
  securityQuestions,
  signUpResponse,
  verifyOtpRequest,
} from './Types';
import { useAxios } from './UseAxios';

export const useCountryCodes = () => {
  const { genRequest, isLoading, data, error } = useAxios<countryCodes>({
    url: 'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
    method: 'GET',
    skipAuth: true,
    useBaseURL: false,
  });

  const getCountryCode = () => genRequest();

  return { getCountryCode, isLoading, data, error };
};

export const useSecurityQuestions = () => {
  const { genRequest, isLoading, data, error } = useAxios<securityQuestions>({
    url: '/SecQue/get_all_questions',
    method: 'GET',
    skipAuth: true,
    useBaseURL: true,
  });

  const getSecurityQuestions = () => genRequest();

  return { getSecurityQuestions, isLoading, data, error };
};

export const useSignUp = () => {
  const { genRequest, isLoading, data, error } = useAxios<signUpResponse>({
    url: '/auth/register_user',
    method: 'POST',
    skipAuth: true,
    useBaseURL: true,
  });

  const registerUser = (requestObject: RootState['signUp']) =>
    genRequest(requestObject);

  return { registerUser, isLoading, data, error };
};

export const useVerifyOtp = () => {
  const { genRequest, isLoading, data, error } = useAxios<signUpResponse>({
    url: '/auth/verify_otp',
    method: 'POST',
    skipAuth: true,
    useBaseURL: true,
  });

  const verifyOtp = (requestObject: verifyOtpRequest) =>
    genRequest(requestObject);

  return { verifyOtp, isLoading, data, error };
};

export const useResendOtp = () => {
  const { genRequest, isLoading, data, error } = useAxios<signUpResponse>({
    url: '/auth/resend_otp',
    method: 'PATCH',
    skipAuth: true,
    useBaseURL: true,
  });

  const resendOtp = (requestObject: verifyOtpRequest) =>
    genRequest(requestObject);

  return { resendOtp, isLoading, data, error };
};

export const useLogin = () => {
  const { genRequest, isLoading, data, error } = useAxios<loginResponse>({
    url: '/auth/login',
    method: 'POST',
    skipAuth: true,
    useBaseURL: true,
  });

  const loginUser = (body: loginRequest) => genRequest(body);
  return { loginUser, isLoading, data, error };
};

export const useRefresh = () => {
  const { genRequest, isLoading, data, error } = useAxios<refreshResponse>({
    url: '/auth/refresh',
    method: 'POST',
    skipAuth: true,
    useBaseURL: true,
  });

  const refresh = () => genRequest();
  return { refresh, isLoading, data, error };
};

export const useLogout = () => {
  const { genRequest, isLoading, data, error } = useAxios<any>({
    url: '/auth/logout',
    method: 'POST',
    skipAuth: true,
    useBaseURL: true,
  });

  const logoutUser = () => genRequest();
  return { logoutUser, isLoading, data, error };
};

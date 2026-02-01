import {
  useCountryCodes,
  useLogin,
  useLogout,
  useRefresh,
  useResendOtp,
  useSecurityQuestions,
  useSignUp,
  useVerifyOtp,
} from './Requests';

export const useLockbaseApi = () => ({
  countryCodesAPI: useCountryCodes(),
  securityQuestionsAPI: useSecurityQuestions(),
  signUpAPI: useSignUp(),
  verifyOtpAPI: useVerifyOtp(),
  resendOtpAPI: useResendOtp(),

  loginAPI: useLogin(),
  logoutAPI: useLogout(),
  refreshAPI: useRefresh(),
});

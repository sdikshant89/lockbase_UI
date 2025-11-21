import {
  useCountryCodes,
  useSecurityQuestions,
  useSignUp,
  useVerifyOtp,
} from './Requests';

export const useLockbaseApi = () => ({
  countryCodesAPI: useCountryCodes(),
  securityQuestionsAPI: useSecurityQuestions(),
  signUpAPI: useSignUp(),
  verifyOtpAPI: useVerifyOtp(),
});

import { useCountryCodes, useSecurityQuestions, useSignUp } from './Requests';

export const useLockbaseApi = () => ({
  countryCodesAPI: useCountryCodes(),
  securityQuestionsAPI: useSecurityQuestions(),
  signUpAPI: useSignUp(),
});

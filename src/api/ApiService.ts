import { useCountryCodes, useSecurityQuestions } from './Requests';

export const useLockbaseApi = () => ({
  countryCodesAPI: useCountryCodes(),
  securityQuestionsAPI: useSecurityQuestions(),
});

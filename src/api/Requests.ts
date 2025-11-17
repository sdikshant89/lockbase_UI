import { countryCodes, securityQuestions } from './Types';
import { useAxios } from './UseAxios';

export const useCountryCodes = () => {
  const { genRequest, isLoading, data, error } = useAxios<countryCodes>({
    url: 'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
    method: 'GET',
    authToken: false,
    useBaseURL: false,
  });

  // Just for code consistency, and if needed can add body in genRequest (taking from useCountryCodes function's parameter)
  const getCountryCode = () => genRequest();

  return { getCountryCode, isLoading, data, error };
};

export const useSecurityQuestions = () => {
  const { genRequest, isLoading, data, error } = useAxios<securityQuestions>({
    url: '/SecQue/get_all_questions',
    method: 'GET',
    authToken: false,
    useBaseURL: true,
  });

  const getSecurityQuestions = () => genRequest();

  return { getSecurityQuestions, isLoading, data, error };
};

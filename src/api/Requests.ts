import { RootState } from '@/store/store';
import { countryCodes, securityQuestions, signUpResponse } from './Types';
import { useAxios } from './UseAxios';

export const useCountryCodes = () => {
  const { genRequest, isLoading, data, error } = useAxios<countryCodes>({
    url: 'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json',
    method: 'GET',
    authToken: false,
    useBaseURL: false,
  });

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

export const useSignUp = () => {
  const { genRequest, isLoading, data, error } = useAxios<signUpResponse>({
    url: '/auth/register_user',
    method: 'POST',
    authToken: false,
    useBaseURL: true,
  });

  const registerUser = (requestObject: RootState['signUp']) =>
    genRequest(requestObject);

  return { registerUser, isLoading, data, error };
};

import { useCountryCodes } from './Requests';

export const useLockbaseApi = () => {
  const {
    // destructoring renaming
    getCountryCode,
    isLoading: getCountryCodeLoading,
    data: countryCodeData,
    error: countryCodeError,
  } = useCountryCodes();

  return {
    // returning object, key-value
    getCountryCodes: {
      request: getCountryCode,
      isLoading: getCountryCodeLoading,
      data: countryCodeData,
      error: countryCodeError,
    },
  };
};

// for useCountryCodes
type countryObject = {
  name: string;
  dial_code: string;
  code: string;
};

type countryCodes = countryObject[];

// for securityQuestions
type securityQuestion = {
  id: number;
  question: string;
};

type securityQuestions = securityQuestion[];

type signUpResponse = {
  email: string;
  status: string;
  message: string;
  errorMessage: string | null;
  success: boolean;
  otpExpiry: string;
};

export type { countryCodes, securityQuestions, signUpResponse };

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

export type { countryCodes, securityQuestions };

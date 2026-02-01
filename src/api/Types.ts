type countryObject = {
  name: string;
  dial_code: string;
  code: string;
};

type countryCodes = countryObject[];

type securityQuestion = {
  id: number;
  question: string;
};

type securityQuestions = securityQuestion[];

type loginRequest = {
  email: string;
  password: string;
};

type loginResponse = {
  accessToken: string;
  encPrkPass: string;
  saltPass: string;
  ivPass: string;
  userId: number;
  email: string;
  username: string;
};

type signUpResponse = {
  email: string;
  status: string;
  message: string;
  errorMessage: string | null;
  success: boolean;
  otpExpiry: string;
};

type refreshResponse = {
  accessToken: string;
};

type verifyOtpRequest = {
  email: string;
  otp: string;
};

export type {
  countryCodes,
  loginRequest,
  loginResponse,
  refreshResponse,
  securityQuestions,
  signUpResponse,
  verifyOtpRequest,
};

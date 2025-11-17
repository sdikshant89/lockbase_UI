export type signUpState = {
  username: string;
  email: string;
  password: string;
  cellNumber: string;
  countryCode: string;
  securityQueAns: SecurityAnswer[];
};

export type SecurityAnswer = {
  questionId: number;
  answer: string;
};

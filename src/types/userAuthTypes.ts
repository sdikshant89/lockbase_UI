interface AuthState {
  user: User | null;
  token?: string;
  isAuthenticated: boolean;
}

interface SecurityQuestion {
  id?: number;
  question: string;
  answer?: string;
}

interface User {
  id?: number;
  username?: string;
  email: string;
  // Do we need to store the password or no?
  password: string;
  securityQuestions?: SecurityQuestion[];
  countryCode?: string;
  phoneNumber?: number;
}

export type { AuthState, User };

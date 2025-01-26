interface AuthState {
    user: User | null;
    token?: string;
    isAuthenticated: boolean;
}
  
interface User {
    id?: number;
    username?: string;
    email: string;
    password: string;
    countryCode?: string;
    phoneNumber?: number;
}

export type { AuthState, User };

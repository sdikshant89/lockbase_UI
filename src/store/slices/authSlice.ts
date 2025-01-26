import { AuthState } from '@/types/userAuthTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // This is called only when the user is authenticated, if not code won't reach here.
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

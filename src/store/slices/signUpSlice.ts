import { SecurityAnswer, signUpState } from '@/types/signUpTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: signUpState = {
  username: '',
  email: '',
  password: '',
  cellNumber: '',
  countryCode: '',
  securityQueAns: [],
  isVerified: false,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    saveBasicInfo: (state, action) => {
      const { username, email, password, countryCode, cellNumber } =
        action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
      state.countryCode = countryCode;
      state.cellNumber = cellNumber;
    },
    setSecurityAnswers: (state, action: PayloadAction<SecurityAnswer[]>) => {
      state.securityQueAns = action.payload;
    },
    setVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    resetSignUp: () => initialState,
  },
});

export const { saveBasicInfo, setSecurityAnswers, resetSignUp, setVerified } =
  signUpSlice.actions;

export default signUpSlice.reducer;

import { SecurityAnswer, signUpState } from '@/types/signUpTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: signUpState = {
  username: '',
  email: '',
  password: '',
  cellNumber: '',
  countryCode: '',
  securityQueAns: [],
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
    resetSignUp: () => initialState,
  },
});

export const { saveBasicInfo, setSecurityAnswers, resetSignUp } =
  signUpSlice.actions;

export default signUpSlice.reducer;

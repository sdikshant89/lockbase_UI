import { signUpState } from '@/types/signUpTypes';
import { createSlice } from '@reduxjs/toolkit';

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
    addSecurityAnswer: (state, action) => {
      state.securityQueAns.push(action.payload);
    },
    updateSecurityAnswer: (state, action) => {
      const index = state.securityQueAns.findIndex(
        (ans) => ans.questionId === action.payload.questionId
      );
      if (index !== -1) {
        state.securityQueAns[index] = action.payload;
      }
    },
    resetSignUp: () => initialState,
  },
});

export const {
  saveBasicInfo,
  addSecurityAnswer,
  updateSecurityAnswer,
  resetSignUp,
} = signUpSlice.actions;

export default signUpSlice.reducer;

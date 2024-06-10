import { createSlice } from '@reduxjs/toolkit';

const resetPassSlice = createSlice({
  name: 'resetPass',
  initialState: {
    isPassword: '',
    isPasswordSubmit: '',
    isMsg: '',
  },
  reducers: {
    isPassword(state, action) {
      state.isPassword = action.payload.isPassword;
    },
    isPasswordSubmit(state, action) {
      state.isPasswordSubmit = action.payload.isPasswordSubmit;
    },
    isMsg(state, action) {
      state.isMsg = action.payload.isMsg;
    },
  },
});

export const { isPassword, isPasswordSubmit, isMsg } = resetPassSlice.actions;
export default resetPassSlice.reducer;

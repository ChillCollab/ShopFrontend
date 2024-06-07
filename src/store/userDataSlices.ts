import { createSlice } from '@reduxjs/toolkit';

const userDataSlices = createSlice({
  name: 'userData',
  initialState: {
    isLogin: '',
  },
  reducers: {
    isLogin(state, action) {
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const { isLogin } = userDataSlices.actions;
export default userDataSlices.reducer;

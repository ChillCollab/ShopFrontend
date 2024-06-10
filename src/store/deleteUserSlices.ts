import { createSlice } from '@reduxjs/toolkit';

const deleteUserSlices = createSlice({
  name: 'deleteUser',
  initialState: {
    isDeleteLogin: [],
    isDeleteId: [],
  },
  reducers: {
    isDeleteLogin(state, action) {
      state.isDeleteLogin = action.payload.isDeleteLogin;
    },
    isDeleteId(state, action: { payload: any; type: string | [number] }) {
      state.isDeleteId = action.payload.isDeleteId;
    },
  },
});

export const { isDeleteLogin, isDeleteId } = deleteUserSlices.actions;
export default deleteUserSlices.reducer;

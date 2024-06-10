import { createSlice } from '@reduxjs/toolkit';

const deleteUserSlices = createSlice({
  name: 'deleteUser',
  initialState: {
    isDeleteLogin: [],
    isDeleteId: [0],
  },
  reducers: {
    isDeleteLogin(state, action) {
      state.isDeleteLogin = action.payload.isDeleteLogin;
    },
    isDeleteId(state, action: { payload: { isDeleteId: never[] | number[] }; type: string | [number] }) {
      state.isDeleteId = action.payload.isDeleteId;
    },
  },
});

export const { isDeleteLogin, isDeleteId } = deleteUserSlices.actions;
export default deleteUserSlices.reducer;

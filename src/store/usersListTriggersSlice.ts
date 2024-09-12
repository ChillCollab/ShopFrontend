import { createSlice } from '@reduxjs/toolkit';

const usersListTriggerSlice = createSlice({
  name: 'usersListTriggers',
  initialState: {
    usersList: [],
  },
  reducers: {
    usersListTrigger(state, action) {
      state.usersList = action.payload.usersList;
    },
  },
});

export const { usersListTrigger } = usersListTriggerSlice.actions;
export default usersListTriggerSlice.reducer;

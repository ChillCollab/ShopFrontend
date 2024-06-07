import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  isError: boolean;
  isErrorMsg: string;
  isSuccess: boolean;
  isSuccessMsg: string;
}

const initialState: AlertState = {
  isError: false,
  isErrorMsg: '',
  isSuccess: false,
  isSuccessMsg: '',
};

const systemAlertSlices = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ isError: boolean }>) {
      state.isError = action.payload.isError;
    },
    setErrorMsg(state, action: PayloadAction<{ isErrorMsg: string }>) {
      state.isErrorMsg = action.payload.isErrorMsg;
    },
    setSuccess(state, action: PayloadAction<{ isSuccess: boolean }>) {
      state.isSuccess = action.payload.isSuccess;
    },
    setSuccessMsg(state, action: PayloadAction<{ isSuccessMsg: string }>) {
      state.isSuccessMsg = action.payload.isSuccessMsg;
    },
  },
});

export const { setError, setErrorMsg, setSuccess, setSuccessMsg } = systemAlertSlices.actions;
export default systemAlertSlices.reducer;

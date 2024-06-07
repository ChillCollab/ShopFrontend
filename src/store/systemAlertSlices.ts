import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alert {
  id: number;
  message: string;
  type: 'error' | 'success';
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

let nextAlertId = 0;

const systemAlertSlices = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<{ message: string; type: 'error' | 'success' }>) => {
      state.alerts.push({
        id: nextAlertId++,
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeAlert: (state, action: PayloadAction<{ id: number }>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload.id);
    },
  },
});

export const { addAlert, removeAlert } = systemAlertSlices.actions;
export default systemAlertSlices.reducer;

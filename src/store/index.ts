import { configureStore } from '@reduxjs/toolkit';
import resetPassReducer from './resetPassSlices';
import systemAlertSlices from './systemAlertSlices.ts';

export const store = configureStore({
  reducer: {
    resetPass: resetPassReducer,
    alert: systemAlertSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

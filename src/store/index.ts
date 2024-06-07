import { configureStore } from '@reduxjs/toolkit';
import resetPassReducer from './resetPassSlices';
import systemAlertSlices from './systemAlertSlices.ts';
import navbarSlices from './navbarSlices.ts';
import userDataSlices from './userDataSlices.ts';

export const store = configureStore({
  reducer: {
    resetPass: resetPassReducer,
    alert: systemAlertSlices,
    navbar: navbarSlices,
    userData: userDataSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

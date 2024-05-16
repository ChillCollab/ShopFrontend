import { configureStore } from '@reduxjs/toolkit';
import resetPassReducer from './resetPassSlices';

export default configureStore({
  reducer: {
    resetPass: resetPassReducer,
  },
});

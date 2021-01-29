/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './slices/dataSlice';
import authSlice from './slices/authSlice';

export default configureStore({
  reducer: {
    data: dataSlice,
    auth: authSlice,
  },
});

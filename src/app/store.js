import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '../services/dummyApi';

export const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware),
});

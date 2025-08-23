
import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '../services/dummyApi';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware),
});

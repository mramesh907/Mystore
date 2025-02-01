import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartProductReducer from './cartProduct.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartProduct: cartProductReducer,
  },
});

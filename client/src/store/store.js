import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartProductReducer from './cartProduct.js';
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartProduct: cartProductReducer,
    addresses: addressReducer,
    oders: orderReducer
  },
});

import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    cartProduct : []
}
const cartProductSlice = createSlice({
  name: 'cartProduct',
  initialState: initialValue,
  reducers: {
    addProduct: (state, action) => {
      state.cartProduct =action.payload;
    },
    clearCart: (state) => {
      state.cartProduct = []; // Clear cart on logout
    },
  },
});
export const { addProduct, clearCart } = cartProductSlice.actions;
export default cartProductSlice.reducer
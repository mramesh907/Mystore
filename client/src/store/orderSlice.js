import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    order : [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialValue,
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrders: (state) => {
      state.order = []; // Clear cart on logout
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    address : []
}
const addressSlice = createSlice({
  name: 'address',
  initialState: initialValue,
  reducers: {
    setAddress(state, action) {
      state.address =action.payload;
    },
    clearAddress(state) {
      state.address = []; // Clear cart on logout
    },
  },
});

export const { setAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer
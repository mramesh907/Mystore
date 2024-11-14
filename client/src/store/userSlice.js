import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  _id: '',
  name: '',
  email: '',
  avatar: '',
  mobile: '',
  verifyEmail: '',
  lastLoginDate: '',
  status: "",
  addressDetails: [],
  shoppingCart: [],
  orderHistory: [],
  role : "",

};

const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar
      state.mobile = action.payload?.mobile
      state.verifyEmail = action.payload?.verifyEmail
      state.lastLoginDate = action.payload?.lastLoginDate
      state.status = action.payload?.status
      state.addressDetails = action.payload?.addressDetails
      state.shoppingCart = action.payload?.shoppingCart
      state.orderHistory = action.payload?.orderHistory
      state.role = action.payload?.role

    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload
      
    },
    logout: (state,action)=>{
      state._id = "";
      state.name ="";
      state.email = "";
      state.avatar = "";
      state.mobile = "";
      state.verifyEmail = "";
      state.lastLoginDate = "";
      state.status = "";
      state.addressDetails = [];
      state.shoppingCart = [];
      state.orderHistory = [];
      state.role = "";
    }
  },
});

export const { setUserDetails, logout, updateAvatar } = userSlice.actions;

export default userSlice.reducer;

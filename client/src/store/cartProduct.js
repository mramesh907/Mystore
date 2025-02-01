import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    cartProduct : []
}
const cartProductSlice = createSlice({
    name : "cartProduct",
    initialState : initialValue,
    reducers : {
        addProduct : (state,action) => {
            state.cartProduct = [...action.payload]
        }
    }
})
export const {addProduct} = cartProductSlice.actions
export default cartProductSlice.reducer
import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    order : [],
}

const orderSlice = createSlice({
    name : "order",
    initialState : initialValue,
    reducers : {
        addOrder : (state, action) => {
            state.order = [...action.payload];
        }
    }
})

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;
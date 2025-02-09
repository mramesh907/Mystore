import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    address : []
}
const addressSlice = createSlice({
    name : "address",
    initialState : initialValue,
    reducers : {
        setAddress(state, action){
            state.address = [...action.payload]
        }
    }
})

export const {setAddress} = addressSlice.actions
export default addressSlice.reducer
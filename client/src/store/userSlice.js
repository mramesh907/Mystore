import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id : "",
    name : "",
    email : "",
}

const userSlice = createSlice({
    name : "user",
    initialState : initialValue,
    reducers : {
        setUserDetails : (state,action) =>{
            state = {...action.payload}
        }
    }
})

export const { setUserDetails } = userSlice.actions

export default userSlice.reducer
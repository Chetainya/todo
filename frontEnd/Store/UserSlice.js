import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "User Data",
    initialState : {user : null},
    reducers : {
        userData(state , action){
            
            state.user = action.payload;
        },
        clearData(state){
            state.user = null;
        }
    }
})

export default UserSlice;
export const UserSliceActions = UserSlice.actions;
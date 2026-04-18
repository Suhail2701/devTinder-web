import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state, action)=>{
            return action.payload;
        },
        removeRequests:(state, action)=>{
            return null;
        },
        removeSelectedRequest:(state, action)=>{
            let requestId = action.payload;
            return state.filter((request)=> request._id !== requestId);
        }       
    }
})

export default requestSlice.reducer;
export const {addRequests, removeRequests, removeSelectedRequest} = requestSlice.actions;
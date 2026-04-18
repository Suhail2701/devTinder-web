import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state, action)=>{
            return action.payload
        },
        removeFeed:(state, action)=>{
            return null;
        },
        removeSelectedFeed:(state, action)=>{
            let feedId = action.payload;
            return state.filter((feed)=> feed._id !== feedId);
        }
    }
});

export const{ addFeed, removeFeed, removeSelectedFeed} = feedSlice.actions;
export default feedSlice.reducer;
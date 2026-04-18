import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import feedSlice from "./slices/feedSlice";
import connectionReducer from "./slices/connectionSlice";
import requestReducer from "./slices/requestSlice";

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedSlice,
        connections:connectionReducer,
        requests:requestReducer
    }
});

export default appStore;
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";



const store = configureStore({
    reducers: {
        auth: authSliceReducer
    }
})

export default store;
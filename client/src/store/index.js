import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import uiSliceReducer from './ui-slice';
import postSliceReducer from './post-slice';
import userSliceReducer from './user-slice';


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        ui: uiSliceReducer,
        post: postSliceReducer,
        user: userSliceReducer
    }
})

export default store;
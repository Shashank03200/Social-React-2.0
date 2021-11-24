import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./authSlice";
import uiSliceReducer from "./UISlice";
import feedSliceReducer from "./feedSlice";

const store = configureStore({
  reducer: {
    user: authSliceReducer,
    UISlice: uiSliceReducer,
    feed: feedSliceReducer,
  },
});

export default store;

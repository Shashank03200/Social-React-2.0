import { configureStore } from "@reduxjs/toolkit";

import userSliceReducer from "./userInfoSlice";
import uiSliceReducer from "./UISlice";
import feedSliceReducer from "./feedSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    UISlice: uiSliceReducer,
    feed: feedSliceReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UISlice",
  initialState: {
    toastData: {
      isActive: false,
      title: undefined,
      status: undefined,
    },
  },
  reducers: {
    setToastData(state, action) {
      console.log(action.payload);
      state.toastData.isActive = action.payload.isActive;
      state.toastData.title = action.payload.title;
      state.toastData.status = action.payload.status;
    },
    resetToastData(state) {
      state.toastData.isActive = false;
      state.toastData.title = undefined;
      state.toastData.status = undefined;
    },
  },
});

export const UISliceActions = UISlice.actions;

export default UISlice.reducer;

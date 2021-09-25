import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UISlice",
  initialState: {
    UIError: {
      status: undefined,
      type: undefined,
      message: undefined,
    },
  },
  reducers: {
    setError(state, action) {
      state.UIError.status = action.payload.error;
      state.UIError.type = action.payload.type;
      state.UIError.message = action.payload.msg;
    },
    dismissError(state) {
      state.UIError.status = false;
      state.UIError.message = undefined;
    },
  },
});

export const UISliceActions = UISlice.actions;

export default UISlice.reducer;

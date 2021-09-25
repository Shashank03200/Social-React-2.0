import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { token: localStorage.getItem("token") },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
    },
    removeToken(state) {
      state.token = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || undefined,
    refreshToken: localStorage.getItem("refreshToken") || undefined,
  },
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    removeToken(state) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;

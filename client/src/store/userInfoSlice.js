import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAccessTokenValid: undefined,
  },
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
      state.isUserValid = true;
    },
    removeToken(state) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isUserValid = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setAccessTokenInvalid(state) {
      state.isAccessTokenValid = false;
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;

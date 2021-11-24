import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isLoggedIn = true;
    },
    removeUser(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isLoggedIn = false;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
    },
    loginUser(state) {
      state.isLoggedIn = true;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;

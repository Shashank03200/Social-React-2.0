import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoggedIn: false,
    authBtnLoading: false
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
    setAuthLoadingBtnState(state, action){
      console.log('authSlice.js',action.payload);
      state.authBtnLoading = action.payload
    }
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;

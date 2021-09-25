import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed Slice",
  initialState: {
    userId: null,
    userProfileImage: null,
    userName: null,
  },
  reducers: {
    setUserData(state, action) {
      const { _id, profileImage, username } = action.payload;
      state.userId = _id;
      state.userProfileImage = profileImage;
      state.userName = username;
    },
  },
});

export const feedSliceActions = feedSlice.actions;

export default feedSlice.reducer;

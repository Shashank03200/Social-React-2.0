import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed Slice",
  initialState: {
    userId: null,
    userProfileImage: null,
    userName: null,
    pageNo: 1,
    morePosts: true,
    timelinePosts: [],
  },

  reducers: {
    setUserData(state, action) {
      const { _id, profileImage, username } = action.payload;
      state.userId = _id;
      state.userProfileImage = profileImage;
      state.userName = username;
    },

    setTimelinePosts(state, action) {
      state.timelinePosts = [...state.timelinePosts, ...action.payload];
    },
    incrementPage(state) {
      state.pageNo += 1;
      console.log(state.pageNo);
    },
    setMorePostsBoolean(state, action) {
      state.morePosts = action.payload;
    },
    addNewPost(state, action) {
      state.timelinePosts.unshift(action.payload);
    },
  },
});

export const feedSliceActions = feedSlice.actions;

export default feedSlice.reducer;

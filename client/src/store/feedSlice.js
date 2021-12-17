import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed Slice",
  initialState: {
    userId: null,
    userProfileImage: null,
    userName: null,
    userFullName: null,
    pageNo: 1,
    bio: undefined,
    followers: undefined,
    following: undefined,
    suggestedUsers: undefined,
    morePosts: true,
    timelinePosts: [],
  },

  reducers: {
    setUserData(state, action) {
      const { _id, profileImage, name, followers, following, username, bio } =
        action.payload;
      console.log("Followers", followers);
      console.log("Followings", following);
      state.userId = _id;
      state.userFullName = name;
      state.userProfileImage = profileImage;
      state.followers = followers;
      state.following = following;
      state.userName = username;
      state.bio = bio;
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
    resetUserData(state) {
      state.userId = null;
      state.userProfileImage = null;
      state.userName = null;
      state.pageNo = 1;
      state.morePosts = true;
      state.timelinePosts = [];
    },
    setSuggestedUsers(state, action) {
      state.suggestedUsers = action.payload;
    },
    resetSuggestedUsers(state) {
      state.suggestedUsers = undefined;
    },
  },
});

export const feedSliceActions = feedSlice.actions;

export default feedSlice.reducer;

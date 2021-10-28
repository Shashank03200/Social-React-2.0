import { UISliceActions } from "./UISlice";
import { feedSliceActions } from "./feedSlice";
import axios from "axios";
import { userSliceActions } from "./userInfoSlice";
import routeInstance from "../routes.instance";

export const loadUserDataUsingToken = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        method: "get",
        url: "/api/auth/user",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log(response);
      if (response.status !== 200) {
        dispatch(userSliceActions.removeToken());
        throw new Error("Please login again");
      } else {
        const data = await response.data;
        console.log("Userdata " + data);
        dispatch(feedSliceActions.setUserData({ ...data }));
      }
    } catch (err) {
      dispatch(userSliceActions.removeToken());
    }
  };
};

export const loadTimelinePosts = (accessToken, page) => {
  console.log(page);
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        url: `api/posts/timeline?page=${page}&count=2`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.data;
      console.log("Fetched Data", data);
      if (response.status === 200) {
        if (data.length === 0) {
          dispatch(feedSliceActions.setMorePostsBoolean(false));
        } else dispatch(feedSliceActions.setTimelinePosts(data));
      } else {
        throw new Error("Error in loading timeline");
      }
    } catch (err) {
      dispatch(feedSliceActions.setMorePostsBoolean(false));
    }
  };
};

export const loadSuggestedUsers = (
  userId,
  accessToken,
  setSuggestedUsersList
) => {
  return async (dispatch) => {
    try {
      let currentUserFollowingList = [];
      const headers = { Authorization: "Bearer " + accessToken };
      routeInstance.get("/api/auth/user", { headers }).then((response) => {
        currentUserFollowingList = response.data.following;
      });
      console.log("Current User followings: ", currentUserFollowingList);
      const response = await routeInstance("api/users/all", { headers });
      const allUsers = await response.data;

      const suggestedUsers = allUsers.filter(
        (user) =>
          user._id !== userId && !currentUserFollowingList.includes(user._id)
      );

      setSuggestedUsersList(suggestedUsers);
    } catch (err) {
      console.log(err);
    }
  };
};

// export const loadUserInfoOfPost = (
//   postUserId,
//   setUserProfileSrc,
//   setUsername
// ) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`api/users/${postUserId}`);

//       const data = await response.data;

//       setUserProfileSrc(data.profileImage);
//       setUsername(data.username);
//     } catch (error) {}
//   };
// };

export const followUser =
  (accessToken, userId, isFollowing) => async (dispatch) => {
    try {
      const response = await routeInstance({
        url: `/api/users/${userId}/${isFollowing ? "un" : ""}follow`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.data;
    } catch (err) {
      console.log(err);
    }
  };

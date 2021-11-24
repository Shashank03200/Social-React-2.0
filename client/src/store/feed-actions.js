import { UISliceActions } from "./UISlice";
import { feedSliceActions } from "./feedSlice";

import routeInstance from "../routes.instance";
import authSlice from "./authSlice";

export const loadUserDataUsingToken = () => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access Token: ", accessToken);
      const response = await routeInstance({
        method: "get",
        url: "/api/auth/user",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log("Response: ", response);
        console.log("Response Status: ", response.status);

        if (response.status !== 200) {
          throw Error(response.error);
        } else {
          const data = await response.data;
          console.log("Userdata " + data);
          dispatch(feedSliceActions.setUserData({ ...data }));
        }
      }
    } catch (error) {
      dispatch(
        UISliceActions.setToastData({
          isActive: true,
          title: error.message,
          status: "warning",
        })
      );
    }
  };
};

export const loadTimelinePosts = (page) => {
  console.log(page);
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await routeInstance({
        url: `api/posts/timeline?page=${page}&count=2`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    } catch (error) {
      dispatch(feedSliceActions.setMorePostsBoolean(false));
      dispatch(
        UISliceActions.setToastData({
          isActive: true,
          title: error.message,
          status: "warning",
        })
      );
    }
  };
};

export const loadSuggestedUsers = (userId, setSuggestedUsersList) => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("function: loadSuggestedUsers", accessToken);
      let currentUserFollowingList = [];
      const headers = { Authorization: "Bearer " + accessToken };
      routeInstance.get("/api/auth/user").then((response) => {
        currentUserFollowingList = response.data.following;
      });
      console.log("Current User followings: ", currentUserFollowingList);
      const response = await routeInstance("api/users/all");
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

export const followUser = (userId, isFollowing) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await routeInstance({
      url: `/api/users/${userId}/${isFollowing ? "un" : ""}follow`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(response.error);
    }

    const data = await response.data;
  } catch (err) {
    console.log(err);
    UISliceActions.setToastData({
      isActive: true,
      title: err.message,
      status: "warning",
    });
  }
};

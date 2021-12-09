import { UISliceActions } from "./UISlice";
import { feedSliceActions } from "./feedSlice";

import routeInstance from "../routes.instance";


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

export const loadSuggestedUsers = ( setSuggestedUsers) => {
  return async (dispatch) => {
    try {
      
      console.log("function: loadSuggestedUsers");
      
      
      const response = await routeInstance({
        url:"api/users/suggested-users",
        method:'get',
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      const data = response.data;

      setSuggestedUsers(data.result);
    } catch (err) {
      console.log(err);
    }
  };
};

export const followUser = (userId, isFollowing, setFollowProcessLoading, setIsFollowing) => async (dispatch) => {
  try {

    setFollowProcessLoading(true);
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

    dispatch(UISliceActions.setToastData({
      isActive: true,
      title: response.data,
      status: "success",
    }))
    setIsFollowing(prevState => !prevState);
    setFollowProcessLoading(false);
    
  } catch (err) {
    console.log(err);
    const backendErrorMsg = err.response.data.error.message;
    dispatch(UISliceActions.setToastData({
      isActive: true,
      title: backendErrorMsg,
      status: "warning",
    }))
    setFollowProcessLoading(false);

  }
};

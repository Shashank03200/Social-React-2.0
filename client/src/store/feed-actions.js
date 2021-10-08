import { UISliceActions } from "./UISlice";
import { feedSliceActions } from "./feedSlice";
import axios from "axios";

export const loadUserDataUsingToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();

      dispatch(feedSliceActions.setUserData({ ...data }));
    } catch (err) {
      dispatch(
        UISliceActions.setError({ error: true, msg: "Client Side Error" })
      );
    }
  };
};

export const loadTimelinePosts = (token, page) => {
  console.log(page);
  return async (dispatch) => {
    try {
      const response = await fetch(`api/posts/timeline?page=${page}&count=2`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
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

export const loadSuggestedUsers = (userId, token, setSuggestedUsersList) => {
  return async (dispatch) => {
    try {
      let currentUserFollowingPeopleList = [];
      const headers = { Authorization: token };
      axios
        .get("/api/auth/user", { headers })
        .then(
          (response) =>
            (currentUserFollowingPeopleList = response.data.following)
        );

      const response = await axios("api/users/all");
      const data = await response.data;
      const suggestedUsers = data.filter(
        (user) =>
          user._id !== userId &&
          !currentUserFollowingPeopleList.includes(user._id)
      );

      setSuggestedUsersList(suggestedUsers);
    } catch (err) {
      console.log(err);
    }
  };
};

export const loadUserInfoOfPost = (
  postUserId,
  setUserProfileSrc,
  setUsername
) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`api/users/${postUserId}`);

      const data = await response.data;

      setUserProfileSrc(data.profileImage);
      setUsername(data.username);
    } catch (error) {}
  };
};

export const followUser = (token, userId, isFollowing) => async (dispatch) => {
  try {
    const response = await fetch(
      `/api/users/${userId}/${isFollowing ? "un" : ""}follow`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
  } catch (err) {
    console.log(err);
  }
};

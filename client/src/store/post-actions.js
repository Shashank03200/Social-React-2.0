import routeInstance from "../routes.instance";

import { feedSliceActions } from "./feedSlice";
import { UISliceActions } from "./UISlice";

export const loadImageFromDisk =
  (formData, setImageSrc) => async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      routeInstance
        .post("api/posts/newpost", formData, {
          headers: {},
        })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          } else {
            setImageSrc("");
            return;
          }
        })
        .then((data) => {
          setImageSrc(data.postImage);
        });
    } catch (err) {
      console.log(err);
    }
  };

export const createNewPost = (formData) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await routeInstance.post("api/posts/newpost", formData, {
      headers: {},
    });

    const data = await response.data;
    console.log("New Post Data: ", data);
    console.log(data);
    if (response.status === 200) {
      dispatch(feedSliceActions.addNewPost(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkLikeStatus = async (postId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Checking like status: ", postId);
    const response = await routeInstance(`/api/posts/${postId}/likestatus`, {
      headers: { Authorization: "Bearer " + accessToken },
    });

    const data = await response.data;
    console.log("Checking like status: data :", data);
    if (data.likeState === true) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeDislikePostHandler =
  (postId, setIsLiked) => async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await routeInstance({
        url: `api/posts/${postId}/like`,
        method: "POST",
        headers: {},
      });

      console.log(response);
      const data = await response.data;

      console.log(data);
      if (data.currentState === "liked") {
        setIsLiked(true);
      } else if (data.currentState === "disliked") {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const postDeleteActionHandler = (postId) => {
  return async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    try {
      const response = await routeInstance({
        method: "delete",
        url: `api/posts/${postId}`,
        headers: {},
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {}
  };
};

export const commentDeleteActionHandler = (commentId, postId) => {
  return async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(commentId, postId);
    const response = await routeInstance({
      method: "delete",
      url: `api/comments/${commentId}`,
      headers: {},
      data: {
        postId,
      },
    });

    if (response.status === 200) {
      console.log(response);
    } else {
      dispatch(
        UISliceActions.setToastData({
          isActive: true,
          title: "Can't update changes",
          status: "error",
        })
      );
    }
    const data = await response.data;

    console.log(data);
  };
};

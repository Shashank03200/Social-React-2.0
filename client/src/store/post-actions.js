import axios from "axios";
import routeInstance from "../routes.instance";

import { feedSliceActions } from "./feedSlice";
import { UISliceActions } from "./UISlice";

export const loadImageFromDisk =
  (accessToken, formData, setImageSrc) => async (dispatch) => {
    try {
      routeInstance
        .post("api/posts/newpost", formData, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
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

export const createNewPost = (accessToken, formData) => async (dispatch) => {
  try {
    const response = await routeInstance.post("api/posts/newpost", formData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
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

export const checkLikeStatus = async (accessToken, postId) => {
  try {
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
  (accessToken, postId, setIsLiked) => async (dispatch) => {
    try {
      const response = await routeInstance({
        url: `api/posts/${postId}/like`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
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

export const postDeleteActionHandler = (accessToken, postId) => {
  return async (dispatch) => {
    console.log(accessToken);
    try {
      const response = await routeInstance({
        method: "delete",
        url: `api/posts/${postId}`,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {}
  };
};

export const commentDeleteActionHandler = (accessToken, commentId, postId) => {
  return async (dispatch) => {
    console.log(commentId, postId);
    const response = await routeInstance({
      method: "delete",
      url: `api/comments/${commentId}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        postId,
      },
    });

    if (response.status === 200) {
      console.log(response);
    } else {
      dispatch(
        UISliceActions.setError({
          status: true,
          message: "Cant update changes.",
        })
      );
    }
    const data = await response.data;

    console.log(data);
  };
};

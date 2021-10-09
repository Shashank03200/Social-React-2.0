import { useInterval } from "@chakra-ui/hooks";
import axios from "axios";

import { Redirect } from "react-router-dom";
import { loadTimelinePosts } from "./feed-actions";
import { feedSliceActions } from "./feedSlice";
import { UISliceActions } from "./UISlice";

export const loadImageFromDisk =
  (token, formData, setImageSrc) => async (dispatch) => {
    try {
      axios
        .post("api/posts/newpost", formData, {
          headers: {
            Authorization: token,
          },
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress: ",
              Math.random(progressEvent.loaded / progressEvent.total) * 100 +
                "%"
            );
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

export const createNewPost = (token, formData, page) => async (dispatch) => {
  try {
    const response = await fetch("/api/posts/newpost", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      dispatch(feedSliceActions.addNewPost(data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkLikeStatus = async (token, postId) => {
  try {
    const response = await axios(`/api/posts/${postId}/likestatus`, {
      headers: { Authorization: token },
    });

    const data = await response.data;

    if (data.likeState === true) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeDislikePostHandler =
  (token, postId, setIsLiked) => async (dispatch) => {
    try {
      const response = await fetch(`api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });

      console.log(response);
      const data = await response.json();

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

export const postDeleteActionHandler = (token, postId) => {
  return async (dispatch) => {
    console.log(token);
    try {
      const response = await axios({
        method: "delete",
        url: `api/posts/${postId}`,
        headers: {
          Authorization: token,
        },
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {}
  };
};

export const commentDeleteActionHandler = (token, commentId, postId) => {
  return async (dispatch) => {
    console.log(commentId, postId);
    const response = await axios({
      method: "delete",
      url: `api/comments/${commentId}`,
      headers: {
        Authorization: token,
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

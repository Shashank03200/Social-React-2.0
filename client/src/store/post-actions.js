import axios from "axios";

import { Redirect } from "react-router-dom";

export const loadImageFromDisk =
  (token, formData, setImageSrc) => async (dispatch) => {
    try {
      console.log(token, formData);
      // const response = await fetch("/api/posts/newpost", {
      //   method: "POST",
      //   headers: {
      //     Authorization: token,
      //   },
      //   body: formData,
      // });

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
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

export const createNewPost = (token, formData) => async (dispatch) => {
  try {
    console.log(token, formData);
    const response = await fetch("/api/posts/newpost", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    if (response.status === 200) {
      <Redirect to="/" />;
    } else {
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

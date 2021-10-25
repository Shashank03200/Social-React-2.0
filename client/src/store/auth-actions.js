import { userSliceActions } from "./userInfoSlice";
import { UISliceActions } from "./UISlice";
import axios from "axios";

export const registerUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/register",
        data: userDetails,
      });
      if (response.status !== 200) {
        const { error } = await response.data;
        console.log(error);
        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: error.message,
            status: "warning",
          })
        );
      } else {
        const data = await response.data;
        console.log(data);
        dispatch(
          userSliceActions.setToken({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: "Account created",
            status: "success",
          })
        );
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("accessToken");
    }
  };
};

export const loginUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/api/auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userDetails),
      });
      if (response.status !== 200) {
        const error = await response.data.error;
        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: error.message,
            status: "warning",
          })
        );
      } else {
        const data = await response.data;
        console.log(data);
        dispatch(
          userSliceActions.setToken({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: "Logged in successfully",
            status: "success",
          })
        );
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("accessToken");
    }
  };
};

export const setTokens = (accessToken, refreshToken) => (dispatch) => {
  try {
    dispatch(
      userSliceActions.setToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

import { authSliceActions } from "./authSlice";
import { UISliceActions } from "./UISlice";
import axios from "axios";

export const registerUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/register",
        data: JSON.stringify(userDetails),
      });
      console.log(response);
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
          authSliceActions.setUser({
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
      authSliceActions.removeUser();
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
      if(response.status === 404){
        const error = await response.data.error;
        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: "Account not registered",
            status: "error",
          })
        );
      }
      else if (response.status !== 200) {
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
          authSliceActions.setUser({
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
      authSliceActions.removeUser();
    }
  };
};

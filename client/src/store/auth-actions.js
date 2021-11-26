import { authSliceActions } from "./authSlice";
import { UISliceActions } from "./UISlice";
import axios from "axios";

export const registerUser = (userDetails) => {

  return async (dispatch) => {
    try {
      dispatch(authSliceActions.setAuthLoadingBtnState(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/register",
        data: userDetails
      });
      console.log(response);
      if (response.status !== 200) {        
        console.log('Error');
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
      dispatch(authSliceActions.setAuthLoadingBtnState(false));

    } catch (err) {
      
      const backendErrorMsg = err.response.data.error.message;
      dispatch(
        UISliceActions.setToastData({
          isActive: true,
          title: backendErrorMsg,
          status: "warning",
        })
      );
      dispatch(authSliceActions.setAuthLoadingBtnState(false));
      authSliceActions.removeUser();
    }
  };
};

export const loginUser = (userDetails) => {
  return async (dispatch) => {
    try {
      dispatch(authSliceActions.setAuthLoadingBtnState(true));
      const response = await axios({
        url: "http://localhost:5000/api/auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: userDetails,
      });

      dispatch(authSliceActions.setAuthLoadingBtnState(false));
      if(response.status !== 200){
        console.log(response)
      }
       else {
        const data = await response.data;
        console.log(data);
        dispatch(
          authSliceActions.setUser({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(authSliceActions.setAuthLoadingBtnState(false));

        dispatch(
          UISliceActions.setToastData({
            isActive: true,
            title: "Logged in successfully",
            status: "success",
          })
        );
      }
    } catch (err) {
      const backendErrorMsg = err.response.data.error.message;
      dispatch(
        UISliceActions.setToastData({
          isActive: true,
          title: backendErrorMsg,
          status: "warning",
        })
      );
      dispatch(authSliceActions.setAuthLoadingBtnState(false));
      authSliceActions.removeUser();
    }
  };
};

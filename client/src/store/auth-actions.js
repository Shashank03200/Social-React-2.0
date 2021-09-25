import { userSliceActions } from "./userInfoSlice";
import { UISliceActions } from "./UISlice";

export const registerUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.status !== 200) {
        const data = await response.json();

        dispatch(UISliceActions.setError({ ...data }));
      } else {
        const data = await response.json();

        dispatch(userSliceActions.setToken({ ...data }));

        dispatch(
          UISliceActions.setError({ error: true, msg: "Account created" })
        );
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
  };
};

export const loginUser = (userDetails) => {
  return async (dispatch) => {
    try {
      console.log(userDetails);
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.status !== 200) {
        const data = await response.json();

        dispatch(UISliceActions.setError(data));
      } else {
        const data = await response.json();

        dispatch(userSliceActions.setToken({ ...data }));
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
  };
};

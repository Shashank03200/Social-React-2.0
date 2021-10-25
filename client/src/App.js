import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import { userSliceActions } from "./store/userInfoSlice";
import { UISliceActions } from "./store/UISlice";

function App() {
  const { accessToken, refreshToken, isAccessTokenValid } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  const toastData = useSelector((state) => state.UISlice.toastData);
  const dispatch = useDispatch();
  const isActive = toastData.isActive;
  const [isUserValid, setIsUserValid] = useState(true);
  useEffect(() => {
    if (!accessToken || !refreshToken) {
      setIsUserValid(false);
    }
  }, []);

  // useEffect(async () => {
  //   // checkAccessToken().then(() => {
  //   // if (!accessToken && refreshToken) {
  //   //   dispatch(
  //   //     UISliceActions.setToastData({
  //   //       isActive: true,
  //   //       title: "Please login again",
  //   //       status: "warning",
  //   //     })
  //   //   );
  //   //   return;
  //   // }
  //   // if (!isAccessTokenValid && refreshToken) {
  //   //   try {
  //   //     const response = await axios.post("/api/auth/refreshToken", {
  //   //       refreshToken,
  //   //     });
  //   //     dispatch(userSliceActions.setToken(response.data));
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //     dispatch(userSliceActions.removeToken());
  //   //     dispatch(
  //   //       UISliceActions.setToastData({
  //   //         isActive: true,
  //   //         title: "Please login again",
  //   //         status: "warning",
  //   //       })
  //   //     );
  //   //   }
  //   // }

  //   // });
  // }, []);

  useEffect(() => {
    if (isActive) {
      toast({
        title: toastData.title,
        status: toastData.status,
        position: "top-right",
        isClosable: true,
        duration: 2000,
      });
    }
  }, [isActive]);

  return (
    <div className="App">
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/" exact>
          {isUserValid ? <FeedPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

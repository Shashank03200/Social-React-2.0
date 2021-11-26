import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";

import { UISliceActions } from "./store/UISlice";

function App() {

  const dispatch = useDispatch();
  const toast = useToast();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toastData = useSelector((state) => state.UISlice.toastData);

  const {isActive} = toastData;

  useEffect(() => {
    if (isActive) {
      toast({
        title: toastData.title,
        status: toastData.status,
        position: "top-right",
        isClosable: true,
        duration: 2000,
      }); 

      setTimeout(()=>dispatch(UISliceActions.resetToastData(), 2000));
    }
  }, [isActive]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <FeedPage /> : <LoginPage />}
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

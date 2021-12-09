import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";

import routeInstance from "./routes.instance";

import { authSliceActions } from "./store/authSlice";
import { UISliceActions } from "./store/UISlice";


function App() {

  const dispatch = useDispatch();
  const toast = useToast();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toastData = useSelector((state) => state.UISlice.toastData);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const {isActive} = toastData;

  useEffect(()=>{

    async function checkToken() {

      const response = await routeInstance({
        url:'/api/auth/user',
        method:'GET',
        headers:{
          "Content-Type":"application/json"
        }
      });

      if(response && response.data){
        dispatch(authSliceActions.loginUser());
      }
        
    }

    if(accessToken && refreshToken){

      try{
       checkToken();
      }
      catch(err){
        dispatch(authSliceActions.removeUser());
        console.log(err)
      }
    }
  },[])

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

  console.log('isLoggedIn',isLoggedIn);
  return (
    <div className="App">
      <Switch>
      
      <Route path="/login" exact>
      {isLoggedIn ? <FeedPage /> : <LoginPage /> }
      </Route>
      <Route path="/register" exact>
      {isLoggedIn ? <FeedPage /> : <RegisterPage /> }
      </Route>  
      <Route path="/">
        {isLoggedIn ? <FeedPage /> : <LoginPage /> }
      </Route>
      </Switch>

    </div>
  );
}

export default App;

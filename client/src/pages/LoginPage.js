import { Input, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthImage from "../svg/authentication-logo.png";
import InstaLogo from "../svg/instagram-logo-medium.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth-actions";
import { UISliceActions } from "../store/UISlice";

import "./LoginPage.css";

const LoginPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.UIError);

  useEffect(() => {
    if (error.status) {
      toast({
        title: error.message,
        position: "top-right",
        duration: 3000,
      });
    }

    return () => {
      dispatch(UISliceActions.dismissError());
    };
  }, [error.status]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.user.token);

  if (token) {
    return <Redirect to="/"></Redirect>;
  }

  const loginFormHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="LoginWrapper">
      <div className="LoginLeft">
        <img
          src={AuthImage}
          alt={"authentication-banner"}
          className="LoginBanner"
        />
      </div>
      <div className="LoginRight">
        <div className="FormWrapper">
          <div className="SiteLogo">
            <img src={InstaLogo} className="InstaLogo" />
          </div>

          <form method="post" onSubmit={loginFormHandler} className="LoginForm">
            <Input
              marginY="14px"
              name="email"
              type="email"
              isRequired
              placeholder="Enter email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              marginY="14px"
              name="password"
              type="password"
              isRequired
              placeholder="Enter password"
              size="sm"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              color="white"
              size="xs"
              className="LoginButton"
            >
              Login
            </Button>
          </form>
          <div className="NewUserMessageDiv">
            Not a user?&nbsp;&nbsp; <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

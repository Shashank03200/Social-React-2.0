import { Input, Button } from "@chakra-ui/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImage from "../svg/authentication-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth-actions";

import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authBtnLoading = useSelector((state) => state.user.authBtnLoading);

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
            <img
              src={process.env.PUBLIC_URL + "/assets/uploads/posts/logo.png"}
              className="InstaLogo"
            />
          </div>

          <form
            method="post"
            onSubmit={loginFormHandler}
            className="LoginForm"
            autoComplete="off"
          >
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
              isLoading={authBtnLoading}
            >
              Login
            </Button>
          </form>
          <div className="NewUserMessageDiv">
            Not a user?&nbsp;&nbsp; <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import AuthImage from "../svg/authentication-logo.png";
import InstaLogo from "../svg/instagram-logo-medium.png";
import "./RegisterPage.css";

import { registerUser } from "../store/auth-actions";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UISliceActions } from "../store/UISlice";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector((state) => state.user.accessToken);

  if (accessToken) {
    return <Redirect to="/"></Redirect>;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser({ email, username, password }));
  };

  return (
    <div className="RegisterWrapper">
      <div className="RegisterLeft">
        <img
          src={AuthImage}
          alt={"authentication-banner"}
          className="RegisterBanner"
        />
      </div>
      <div className="RegisterRight">
        <div className="FormWrapper">
          <div className="SiteLogo">
            <img src={InstaLogo} className="InstaLogo" />
          </div>

          <form
            method="post"
            className="RegisterForm"
            onSubmit={formSubmitHandler}
          >
            <Input
              marginY="14px"
              name="email"
              type="email"
              isRequired
              placeholder="Enter email"
              size="sm"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              marginY="14px"
              name="username"
              type="text"
              isRequired
              placeholder="Enter username"
              size="sm"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <Input
              marginY="14px"
              name="password"
              type="password"
              isRequired
              placeholder="Enter password"
              size="sm"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              type="submit"
              color="white"
              size="xs"
              className="RegisterButton"
            >
              Sign Up
            </Button>
          </form>
          <div className="RegisteredUserMessageDiv">
            Already a user?&nbsp;&nbsp; <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import AuthImage from "../svg/authentication-logo.png";

import "./RegisterPage.css";

import { registerUser } from "../store/auth-actions";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authBtnLoading = useSelector((state) => state.user.authBtnLoading);
  const history = useHistory();

  const finishRegister = (res) => {
    if (res) {
      history.replace("/update");
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(email, password, username);
    dispatch(registerUser({ email, username, password }, finishRegister));
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
            <img
              src={process.env.PUBLIC_URL + "/assets/uploads/posts/logo.png"}
              className="InstaLogo"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 className="RegisterDesc">
              Sign up to see photos and videos from your friends.
            </h2>
          </div>
          <form
            method="post"
            className="RegisterForm"
            onSubmit={formSubmitHandler}
            autoComplete="off"
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
              isLoading={authBtnLoading}
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

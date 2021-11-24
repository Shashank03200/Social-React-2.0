import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";

import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserDataUsingToken } from "../store/feed-actions";

const FeedPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.feed);
  console.log("userData : ", userData);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Is Logged In", isLoggedIn);

      dispatch(loadUserDataUsingToken());
    }
  }, []);

  useEffect(() => {
    if (userData.userId) {
      setUserDataLoaded(true);
    }
  }, [userData.userId]);

  return (
    <Fragment>
      {userDataLoaded ? (
        <Fragment>
          <Navbar />
          <Box d="flex">
            <Sidebar />
            <Feed userData={userData} />
            <RightBar userData={userData} />
          </Box>
        </Fragment>
      ) : (
        <Skeleton />
      )}
    </Fragment>
  );
};

export default FeedPage;

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
  const token = useSelector((state) => state.user.token);
  const userData = useSelector((state) => state.feed);

  const [tokenLoading, setIsTokenLoading] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsTokenLoading(false);
      dispatch(loadUserDataUsingToken(token));
    }
  }, [token]);

  useEffect(() => {
    if (userData.userId) {
      setUserDataLoaded(true);
    }
  }, [userData.userId]);

  return (
    <Fragment>
      {tokenLoading ? (
        <Spinner size="xl" />
      ) : (
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
      )}
    </Fragment>
  );
};

export default FeedPage;

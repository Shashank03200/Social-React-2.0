import React from "react";
import {
  Box,
  Image,
  Grid,
  HStack,
  Link,
  Text,
  Divider,
  Center,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import routeInstance from "../routes.instance";
import { useEffect } from "react";
import { useState } from "react";
import { loadUserDataUsingToken } from "../store/feed-actions";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isImagesLoading, setImagesLoading] = useState(true);
  const [imageURLList, setImageURLList] = useState(undefined);
  const dispatch = useDispatch();
  const {
    userProfileImage,
    userName,
    userFullName,
    bio,
    followers,
    following,
  } = useSelector((state) => state.feed);

  const setPageLoadState = (val) => {
    if (val) {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    dispatch(loadUserDataUsingToken(setPageLoadState));
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setImagesLoading(true);
        const response = await routeInstance({
          method: "GET",
          url: "/api/posts/allposts",
          headers: {},
        });

        if (response.status !== 200) {
          setImagesLoading(false);
          throw Error(response.error);
        } else {
          const data = await response.data;
          setImagesLoading(false);
          setImageURLList(data);
        }
      } catch (err) {
        console.log("profilepage", err);
      }
    };

    fetchPosts();
  }, []);

  return isPageLoading ? (
    <div>Loading</div>
  ) : (
    <Box width="container.lg" mx="auto">
      <Navbar />
      <Grid height="40%" templateColumns="0.4fr 0.6fr" gap="20px" p="24px">
        <Box w="100%" h="100%" textAlign="center">
          <Avatar
            src={userProfileImage}
            boxSize={{ base: "100px", md: "180px" }}
            mx="auto"
          />
        </Box>
        <Box width="100%" height="100%" px="20px" py="4px">
          <Box className="usernameContainer" fontSize="4xl" mx="auto">
            {userName}
          </Box>
          <HStack mx="auto" spacing="40px">
            <Text> {imageURLList && imageURLList.length} posts</Text>
            <Text> {followers && followers.length} followers </Text>
            <Text> {following && following.length} following </Text>
          </HStack>

          <Box fontWeight="600" mt="12px" className="">
            {userFullName}
          </Box>
          <Box>{bio}</Box>
        </Box>
      </Grid>

      <Box mt="28px">
        <hr style={{ height: "4px" }} />
        <Center fontSize="2xl">POSTS</Center>
        <hr />

        <Box className="ProfilePage__PostsWrapper">
          {isImagesLoading ? (
            <Spinner />
          ) : (
            <Grid
              display="grid"
              className="profileImageWrapper"
              templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
              justifyItems="center"
            >
              {imageURLList &&
                imageURLList.map((image) => {
                  return (
                    <Box
                      border={{ base: "1px solid #ccc", lg: "1px solid #ccc" }}
                      className="postImageContainer"
                      d="flex"
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Image
                        src={image.postImage}
                        alt="profile-image"
                        objectFit="contain"
                        maxHeight="300px"
                      />
                    </Box>
                  );
                })}
              {imageURLList && imageURLList.length === 0 && (
                <Box alignContent="center">
                  <Text fontSize="xl">No posts found</Text>
                </Box>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;

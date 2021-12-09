import { useState } from "react";

import { Box, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import {  useDispatch } from "react-redux";
import { followUser } from "../store/feed-actions";

const SuggestedUser = (props) => {

  
  const dispatch = useDispatch();
  const [followProcessLoading, setFollowProcessLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  console.log('Followings : ', props.currentuserFollowings);


  const followHandler = () => {
    dispatch(
      followUser( props.userId, isFollowing, setFollowProcessLoading, setIsFollowing)
    );
    
  };
  return (
    <Box
      display="flex"
      border="1px solid maroon"
      padding="8px"
      rounded="md"
      width="100%"
      pos="relative"
      my="10px"
    >
      <Box mr="3">
        <Avatar size="sm" src={props.src} className="action-icon" />
      </Box>
      <Box className="action-icon">{props.username}</Box>
      <Box pos="absolute" right="10px">
        <Button size="xs"  onClick={followHandler} isLoading={followProcessLoading}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
};

export default SuggestedUser;

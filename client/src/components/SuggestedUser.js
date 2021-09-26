import { useEffect, useState } from "react";

import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Box, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { followUser } from "../store/feed-actions";

const SuggestedUser = (props) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(props.currentuserFollowings.includes(props.userId));
  }, []);

  const followHandler = () => {
    dispatch(followUser(token, props.userId, isFollowing, setIsFollowing));
    setIsFollowing((prevState) => !prevState);
  };
  return (
    <LazyLoadComponent>
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
          <Button size="xs" isLoading={props.isLoading} onClick={followHandler}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default SuggestedUser;

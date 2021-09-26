import Post from "./Post";

import { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
import { loadTimelinePosts } from "../store/feed-actions";
import { Spinner } from "@chakra-ui/spinner";

const Feed = ({ userData }) => {
  const { userId } = userData;
  const dispatch = useDispatch();
  console.log("UserId Feed.js", userId);

  const timelinePosts = useSelector((state) => state.feed.timelinePosts);

  useEffect(() => {
    if (userId) {
      dispatch(loadTimelinePosts(userId));
    }
  }, [userId]);

  return (
    <Box flex="5" marginLeft="250px">
      {!timelinePosts ? (
        <Spinner />
      ) : (
        timelinePosts.map((post, index) => (
          <Post key={index + post._id} postData={post} />
        ))
      )}
    </Box>
  );
};

export default Feed;

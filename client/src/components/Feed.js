import Post from "./Post";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
import { loadTimelinePosts } from "../store/feed-actions";
import { Spinner } from "@chakra-ui/spinner";
import { feedSliceActions } from "../store/feedSlice";
import PostSkeleton from "./PostSkeleton";

const Feed = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("Feed.js", accessToken);

  const dispatch = useDispatch();

  const timelinePosts = useSelector((state) => state.feed.timelinePosts);

  const feedData = useSelector((state) => state.feed);
  console.log("Feed Data: ", feedData);

  const page = useSelector((state) => state.feed.pageNo);
  const morePosts = useSelector((state) => state.feed.morePosts);

  console.log("Page no", page);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadTimelinePosts(page));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (page > 1) {
      dispatch(loadTimelinePosts(page));
    }
  }, [page, isLoggedIn, dispatch]);

  const fetchPostsHandler = () => {
    if (isLoggedIn) {
      dispatch(feedSliceActions.incrementPage());
    }
  };

  return (
    <Box
      flex="5"
      marginLeft={{ sm: "10px", lg: "250px" }}
      marginX={{ base: "0px" }}
      backgroundColor="feedBackground.300"
    >
      {timelinePosts === [] ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={timelinePosts.length}
          next={fetchPostsHandler}
          hasMore={morePosts}
          loader={<PostSkeleton />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You are all caught up</b>
            </p>
          }
        >
          {timelinePosts.map((post, index) => (
            <Post key={index + post._id} postData={post} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default Feed;

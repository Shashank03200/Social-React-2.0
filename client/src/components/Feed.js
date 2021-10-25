import Post from "./Post";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
import { loadTimelinePosts } from "../store/feed-actions";
import { Spinner } from "@chakra-ui/spinner";
import { feedSliceActions } from "../store/feedSlice";
import PostSkeleton from "./PostSkeleton";

const Feed = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  const timelinePosts = useSelector((state) => state.feed.timelinePosts);

  const feedData = useSelector((state) => state.feed);
  console.log("Feed Data: ", feedData);

  const page = useSelector((state) => state.feed.pageNo);
  const morePosts = useSelector((state) => state.feed.morePosts);

  console.log("Page no", page);
  useEffect(() => {
    if (accessToken) {
      dispatch(loadTimelinePosts(accessToken, page));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (page > 1) {
      dispatch(loadTimelinePosts(accessToken, page));
    }
  }, [page, accessToken, dispatch]);

  const fetchPostsHandler = () => {
    if (accessToken) {
      dispatch(feedSliceActions.incrementPage());
    }
  };

  return (
    <Box flex="5" marginLeft="250px">
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

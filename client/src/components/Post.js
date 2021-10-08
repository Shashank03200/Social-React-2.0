import { Box, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import { loadUserInfoOfPost } from "../store/feed-actions";
import { checkLikeStatus, likeDislikePostHandler } from "../store/post-actions";
import PostFooter from "./PostFooter";
import Comments from "./Comments";
import CommentInput from "./CommentInput";
import LatestComments from "./LatestComments";
import PostHeader from "./PostHeader";
import PostSkeleton from "./PostSkeleton";

const Post = ({ postData }) => {
  console.log(postData);
  const { _id: postId, deletePossible } = postData;
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  console.log(postData._id);
  const [userProfileSrc, setUserProfileSrc] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [isLiked, setIsLiked] = useState(undefined);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  const [newCommentData, setNewCommentData] = useState(undefined);
  const [isTouched, setIsTouched] = useState(false);
  console.log("Post id", postData.postId);

  useEffect(() => {
    if (postId) {
      checkLikeStatus(token, postId).then((response) => {
        console.log("Like Response", response);
        setIsLiked(response);
      });
    }
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(
        loadUserInfoOfPost(postData.userId, setUserProfileSrc, setUsername)
      );
    }
  }, [postId]);
  console.log(postId);
  const postLikeActivityHandler = () => {
    setIsTouched(true);
    dispatch(likeDislikePostHandler(token, postId, setIsLiked));
  };

  const commentsVisibilityHandler = () => {
    setCommentsVisibility((prevState) => !prevState);
  };

  const newCommentAppendHandler = (data) => {
    setNewCommentData(data);
  };

  if (!postId) {
    return <PostSkeleton />;
  }

  return (
    <LazyLoadComponent>
      <Box
        backgroundColor="white"
        width="600px"
        marginBottom="40px"
        rounded="lg"
        border="1px solid #ccc"
        mt="10px"
      >
        <Box padding="12px">
          {username && (
            <PostHeader
              username={username}
              userProfileSrc={userProfileSrc}
              postId={postId}
              deletionPossible={deletePossible}
            />
          )}

          <Box fontSize="14px">{postData.desc}</Box>

          <Box maxHeight="600px" overflow="hidden">
            <Box d="flex" justifyContent="center" alignItems="center">
              <Image
                src={`${process.env.PUBLIC_URL}/assets/uploads/posts/${postData.postImage}`}
                objectFit="cover"
                minHeight="500px"
              />
            </Box>
          </Box>

          <PostFooter
            likes={postData.likes}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            onLikeButtonClick={postLikeActivityHandler}
            commentsVisibility={commentsVisibility}
            onCommentButtonClick={commentsVisibilityHandler}
            isTouched={isTouched}
          />

          {commentsVisibility && postId && (
            <Comments
              isVisible={commentsVisibility}
              postId={postId}
              newCommentData={newCommentData}
              setCommentData={setNewCommentData}
            />
          )}
          {!commentsVisibility && postId && (
            <LatestComments
              postId={postId}
              isVisible={commentsVisibility}
              newCommentData={newCommentData}
              setCommentData={setNewCommentData}
            />
          )}
        </Box>
        <Box>
          <CommentInput
            postId={postId}
            appendComment={newCommentAppendHandler}
          />
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default Post;

import { Box, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import { checkLikeStatus, likeDislikePostHandler } from "../store/post-actions";
import PostFooter from "./PostFooter";
import Comments from "./Comments";
import CommentInput from "./CommentInput";
import LatestComments from "./LatestComments";
import PostHeader from "./PostHeader";
import PostSkeleton from "./PostSkeleton";

const Post = ({ postData }) => {
  const [isLiked, setIsLiked] = useState(undefined);

  useEffect(() => {
    console.log(isTouched);
    if (isTouched === false) {
      return;
    } else if (isLiked === true && isTouched) {
      setLikesCount((prevCount) => (prevCount += 1));
      console.log(likesCount);
    } else if (isLiked === false && isTouched) {
      setLikesCount((prevCount) => (prevCount -= 1));
    }
  }, [isLiked]);

  console.log(postData);
  const { _id: postId, postDeletePossible } = postData;
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  console.log("Post.js", accessToken);

  console.log(postData._id);

  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const [likesCount, setLikesCount] = useState(postData.likes.length);

  const [newCommentData, setNewCommentData] = useState(undefined);
  const [isTouched, setIsTouched] = useState(false);

  const { _id: userId, username } = postData.userId;
  const userProfileSrc = postData.userId.profileImage;

  useEffect(() => {
    if (postId) {
      checkLikeStatus(postId).then((response) => {
        console.log("Like Response", response);
        setIsLiked(response);
      });
    }
  }, []);

  console.log(postId);
  const postLikeActivityHandler = () => {
    setIsTouched(true);
    dispatch(likeDislikePostHandler(postId, setIsLiked));
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
        width={{ base: "100%", lg: "600px" }}
        marginBottom="40px"
        rounded={{ base: "none", lg: "lg" }}
        border={{ base: "1px solid", lg: "1px solid #ccc" }}
        borderColor={{ base: "#EEEEEE" }}
        mt="10px"
      >
        <Box>
          {username && (
            <PostHeader
              username={username}
              userProfileSrc={userProfileSrc}
              postId={postId}
              postDeletePossible={postDeletePossible}
            />
          )}

          <Box fontSize="14px" px="6px" py="4px">
            {postData.desc}
          </Box>

          <Box maxHeight={{ base: "400px", lg: "600px" }} overflow="hidden">
            <Box d="flex" justifyContent="center" alignItems="center">
              <Image
                src={`${process.env.PUBLIC_URL}/assets/uploads/posts/${postData.postImage}`}
                objectFit="cover"
                minHeight="500px"
              />
            </Box>
          </Box>

          <PostFooter
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
        <Box marginY="8px" marginLeft="4px" fontSize="13px">
          {likesCount > 0 ? `${likesCount} likes` : "No likes"}
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default Post;

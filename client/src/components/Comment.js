import { Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import {  useDispatch } from "react-redux";
import { commentDeleteActionHandler } from "../store/post-actions";

import React from "react";

function Comment(props) {
  const accessToken = localStorage.getItem("accessToken");
 
  console.log("Comment.js", accessToken);
  const dispatch = useDispatch();

  const {
    profileImage: userProfileImage,
    username,
    _id: userId,
  } = props.commentData.userId;

  const { _id: commentId, commentText, isRemovable } = props.commentData;

  const commentDeleteHandler = () => {
    dispatch(commentDeleteActionHandler(commentId, props.postId));
    props.onDelete();
  };

  return (
    <Box
      padding="2px"
      backgroundColor="white"
      marginBottom="2px"
      d="flex"
      mt="2px"
      pos="relative"
    >
      <Box padding="2px">
        <Avatar
          size="xs"
          name={`${username}`}
          src={`${process.env.PUBLIC_URL}/assets/uploads/users/${userProfileImage}`}
          mr="4px"
        />
      </Box>
      <Box
        fontWeight="bold"
        fontSize="14px"
        padding="2px"
        width="auto"
        flexShrink="0"
      >
        {username}
      </Box>

      <Box fontSize="14px" padding="2px">
        {commentText}
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
        bottom="5px"
        right="5px"
      >
        {isRemovable && (
          <DeleteIcon
            color="red.400"
            cursor="pointer"
            _hover={{ color: "red" }}
            onClick={commentDeleteHandler}
          />
        )}
      </Box>
    </Box>
  );
}

export default React.memo(Comment);

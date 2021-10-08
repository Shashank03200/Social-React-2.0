import { Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { commentDeleteActionHandler } from "../store/post-actions";

import React from "react";

function Comment(props) {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const {
    profileImage,
    username,
    commentText,
    isRemovable,
    _id: commentId,
  } = props.commentData;

  const commentDeleteHandler = () => {
    console.log("Deleting");
    dispatch(commentDeleteActionHandler(token, commentId, props.postId));
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
          src={`${process.env.PUBLIC_URL}/assets/uploads/users/${profileImage}`}
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

export default Comment;

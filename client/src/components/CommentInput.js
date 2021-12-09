import { Box, Avatar, Input, Button } from "@chakra-ui/react";

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import routeInstance from "../routes.instance";

function CommentInput(props) {
  const accessToken = localStorage.getItem("accessToken");

  console.log("CommentInput.js", accessToken);

  const { userName: username, userProfileImage: profileImage } = useSelector(
    (state) => state.feed
  );

  const [text, setText] = useState("");
  let isDisabled = true;
  if (text === "") {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  const commentPostHandler = async () => {
    try {
      const response = await routeInstance({
        url: `/api/comments/${props.postId}/new`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          commentText: text,
        },
      });

      const data = await response.data;
      console.log("Comment data: ", data);

      props.appendComment(data);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box width="100%" py="12px" d="flex" borderTop="1px solid #ccc">
      <Box p="5px">
        <Avatar
          size="xs"
          name={`${username}`}
          src={`${process.env.PUBLIC_URL}/assets/uploads/users/${profileImage}`}
          mr="4px"
        />
      </Box>
      <Box
        p="8px"
        fontWeight="bold"
        fontSize="14px"
        width="auto"
        flexShrink="0"
        d="flex"
        justifyContent="center"
        alignContent="center"
        display={{ base: "none", lg: "flex" }}
        overflow="hidden"
        maxWidth="100px"
      >
        {username}
      </Box>
      <Box padding="6px" w="100%">
        <Input
          variant="flushed"
          placeholder="Add a comment"
          fontSize="14px"
          size="sm"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </Box>
      <Box>
        <Button
          color="blue"
          textAlign="center"
          cursor="pointer"
          p="8px"
          fontSize="14px"
          disabled={isDisabled}
          onClick={commentPostHandler}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}

export default CommentInput;

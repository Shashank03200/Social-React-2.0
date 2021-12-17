import { Box, Avatar, Text } from "@chakra-ui/react";

import React from "react";

import PostContextMenu from "./PostContextMenu";

function PostHeader(props) {
  const { username, userProfileSrc } = props;

  console.log("userdata", props);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px="6px"
      py={{ base: "4px", md: "8px" }}
    >
      <Box display="flex" alignItems="center" mb="12px">
        <Avatar
          width="28px"
          height="28px"
          size="sm"
          mr="16px"
          className="action-icon"
          name={username}
          src={userProfileSrc}
        />
        <Text fontSize="14px" fontWeight="500" className="action-icon">
          {username}
        </Text>
      </Box>
      <Box className="action-icon">
        <PostContextMenu
          postId={props.postId}
          postDeletePossible={props.postDeletePossible}
        />
      </Box>
    </Box>
  );
}

export default PostHeader;

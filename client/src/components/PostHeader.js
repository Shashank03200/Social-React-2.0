import { useEffect, useState } from "react";
import { Box, Avatar, Text, Icon, Button } from "@chakra-ui/react";

import React from "react";

import PostContextMenu from "./PostContextMenu";

function PostHeader(props) {
  const { username, userProfileSrc } = props;

  console.log("userdata", props);
  return (
    <Box padding="4px" display="flex" justifyContent="space-between">
      <Box marginX="5px" display="flex" alignItems="center" mb="12px">
        <Avatar
          width="28px"
          height="28px"
          size="sm"
          name={username}
          src={`${process.env.PUBLIC_URL}/assets/uploads/users/${userProfileSrc}`}
          mr="16px"
          className="action-icon"
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

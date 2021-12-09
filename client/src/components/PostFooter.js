import { useEffect, useState } from "react";
import { Box, Icon, HStack } from "@chakra-ui/react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { MdModeComment } from "react-icons/md";

import React from "react";

function PostFooter(props) {
  console.log("Cool", props);

  return (
    <Box marginY="10px">
      <HStack spacing="10px" paddingX="6px">
        {props.isLiked ? (
          <Icon
            as={MdFavorite}
            h="32px"
            w="32px"
            className="action-icon"
            onMouseDown={props.onLikeButtonClick}
            color="heart.200"
          />
        ) : (
          <Icon
            as={MdFavoriteBorder}
            h="32px"
            w="32px"
            className="action-icon"
            onMouseDown={props.onLikeButtonClick}
            color="heart.200"
          />
        )}
        {props.commentVisibility ? (
          <Icon
            as={MdModeComment}
            h="30px"
            w="30px"
            className="action-icon"
            onClick={props.onCommentButtonClick}
            color="purple.500"
          />
        ) : (
          <Icon
            as={MdComment}
            h="30px"
            w="30px"
            className="action-icon"
            onClick={props.onCommentButtonClick}
            color="purple.500"
          />
        )}
      </HStack>
    </Box>
  );
}

export default PostFooter;

import { useEffect, useState } from "react";
import { Box, Icon, HStack, Button } from "@chakra-ui/react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { MdModeComment } from "react-icons/md";

import React from "react";

function PostFooter(props) {
  const [likesCount, setLikesCount] = useState(props.likes.length);

  console.log("Cool", props);

  useEffect(() => {
    console.log(props.isTouched);
    if (props.isTouched === false) {
      return;
    } else if (props.isLiked === true && props.isTouched) {
      setLikesCount((prevCount) => (prevCount += 1));
      console.log(likesCount);
    } else if (props.isLiked === false && props.isTouched) {
      setLikesCount((prevCount) => (prevCount -= 1));
    }
  }, [props.isLiked]);

  return (
    <Box marginY="10px">
      <HStack spacing="10px">
        {props.isLiked ? (
          <Icon
            as={MdFavorite}
            h="32px"
            w="32px"
            className="action-icon"
            onMouseDown={props.onLikeButtonClick}
          />
        ) : (
          <Icon
            as={MdFavoriteBorder}
            h="32px"
            w="32px"
            className="action-icon"
            onMouseDown={props.onLikeButtonClick}
          />
        )}
        {props.commentVisibility ? (
          <Icon
            as={MdModeComment}
            h="30px"
            w="30px"
            className="action-icon"
            onClick={props.onCommentButtonClick}
          />
        ) : (
          <Icon
            as={MdComment}
            h="30px"
            w="30px"
            className="action-icon"
            onClick={props.onCommentButtonClick}
          />
        )}
      </HStack>
      <Box marginY="8px" fontSize="13px">
        {likesCount > 0 ? `${likesCount} likes` : "No likes"}
      </Box>
    </Box>
  );
}

export default PostFooter;

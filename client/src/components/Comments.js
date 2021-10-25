import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Center, Spinner } from "@chakra-ui/react";
import routeInstance from "../routes.instance";
import Comment from "./Comment";

import axios from "axios";

function Comments(props) {
  const accessToken = useSelector((state) => state.user.accessToken);
  console.log("TOken", accessToken);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [refetchComments, setRefetchComments] = useState(false);

  useEffect(() => {
    try {
      const loadComments = async () => {
        setIsLoading(true);
        const response = await routeInstance({
          url: `/api/comments/${props.postId}/all`,
          method: "get",
          headers: { Authorization: "Bearer " + accessToken },
        });

        const data = response.data;
        setComments(data);
        setIsLoading(false);
      };

      if (props.isVisible) {
        loadComments();
      }
    } catch (err) {
      console.log(err.message);
    }

    return () => setRefetchComments(false);
  }, [refetchComments]);

  useEffect(() => {
    if (props.newCommentData && props.isVisible) {
      if (comments) {
        setComments((prevComments) => [...prevComments, props.newCommentData]);
      } else {
        setComments([props.newCommentData]);
      }
      props.setCommentData(undefined);
    }
  }, [props.newCommentData]);

  let commentList = [];
  if (comments !== []) {
    commentList = comments.map((comment) => (
      <Comment
        commentData={comment}
        key={comment._id}
        postId={props.postId}
        onDelete={() => setRefetchComments(true)}
      />
    ));
  }
  return (
    <Box
      borderBottom="1px solid #ccc"
      borderTop="1px solid #ccc"
      mx="-4px"
      py="0px"
      rounded="lg"
    >
      {isLoading ? (
        <Center>
          <Spinner size="md" />
        </Center>
      ) : (
        commentList
      )}
    </Box>
  );
}

export default Comments;

import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Spinner } from "@chakra-ui/react";
import Comment from "./Comment";
import axios from "axios";

function LatestComments(props) {
  const token = useSelector((state) => state.user.token);

  const [latestComments, setLatestComments] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const loadComments = async () => {
        setIsLoading(true);
        const response = await axios({
          url: `/api/comments/${props.postId}/latest`,
          method: "get",
          headers: { Authorization: token },
        });

        const data = await response.data;
        console.log("Latest Comments", data);
        if (data.commentsWithUserDetails) {
          setLatestComments(data.commentsWithUserDetails);
          console.log(data.commentsWithUserDetails);
          setIsLoading(false);
          console.log("Comments loaded");
        } else {
          setLatestComments([]);
          setIsLoading(false);
        }
      };

      loadComments();
    } catch (err) {
      console.log(err.message);
    }
  }, [props.postId]);

  useEffect(() => {
    if (props.newCommentData) {
      if (latestComments) {
        setLatestComments((prevComments) => [
          ...prevComments,
          props.newCommentData,
        ]);
      } else {
        setLatestComments([props.newCommentData]);
      }
      props.setCommentData(undefined);
    }
  }, [props.newCommentData]);

  let commentList = [];
  if (latestComments !== undefined) {
    commentList = latestComments.map((comment) => (
      <Comment postId={props.postId} commentData={comment} key={comment._id} />
    ));
  }
  return (
    <Box mx="-4px" py="0px">
      {latestComments ? isLoading ? <Spinner size="md" /> : commentList : null}
      {latestComments === [] && <p>No recent comments</p>}
    </Box>
  );
}

export default LatestComments;

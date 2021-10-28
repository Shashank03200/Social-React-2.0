import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Spinner } from "@chakra-ui/react";
import Comment from "./Comment";
import axios from "axios";

function LatestComments(props) {
  const accessToken = useSelector((state) => state.user.accessToken);
  console.log("LatestComments.js", accessToken);

  const [latestComments, setLatestComments] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(false);

  console.log(props.newCommentData);

  useEffect(() => {
    try {
      const loadComments = async () => {
        setIsLoading(true);
        const response = await axios({
          url: `/api/comments/${props.postId}/latest`,
          method: "get",
          headers: { Authorization: "Bearer " + accessToken },
        });

        const data = await response.data;

        if (response.status === 200) {
          setLatestComments(data);
          setIsLoading(false);
        } else {
          setLatestComments([]);
          setIsLoading(false);
        }
      };

      loadComments();
    } catch (err) {
      console.log(err.message);
    }

    return () => setRefetchData(false);
  }, [props.postId, refetchData]);

  useEffect(() => {
    if (props.newCommentData) {
      if (latestComments) {
        console.log("Heloe", props.newCommentData);
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
    commentList = latestComments.map((comment) => {
      return (
        <Comment
          postId={props.postId}
          commentData={comment}
          key={comment._id}
          onDelete={() => setRefetchData(true)}
        />
      );
    });
  }

  return (
    <Box mx="-4px" py="0px">
      {latestComments ? (
        isLoading ? (
          <Box d="flex" justifyContent="center">
            <Spinner size="md" />
          </Box>
        ) : (
          commentList
        )
      ) : null}
      {latestComments === [] && <p>No recent comments</p>}
    </Box>
  );
}

export default LatestComments;

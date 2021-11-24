import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Spinner } from "@chakra-ui/react";
import Comment from "./Comment";

import { useDispatch } from "react-redux";
import routeInstance from "../routes.instance";
import { UISliceActions } from "../store/UISlice";

function LatestComments(props) {
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("LatestComments.js", accessToken);

  const dispatch = useDispatch();
  const [latestComments, setLatestComments] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(false);

  console.log(props.newCommentData);

  useEffect(() => {
    try {
      const loadComments = async () => {
        setIsLoading(true);
        const response = await routeInstance({
          url: `/api/comments/${props.postId}/latest`,
          method: "get",
        });

        if (response) {
          if (response.status === 200) {
            const data = await response.data;
            setLatestComments(data);
            setIsLoading(false);
          } else {
            dispatch(
              UISliceActions.setToastData({
                isActive: true,
                title: "Unauthorized",
                status: "danger",
              })
            );
            setLatestComments([]);
            setIsLoading(false);
          }
        }
      };

      loadComments();
    } catch (err) {
      console.log(err.message);
    }

    return () => setRefetchData(false);
  }, []);

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

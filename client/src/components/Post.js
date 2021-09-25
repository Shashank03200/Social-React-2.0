import { Box, Avatar, Text, Icon, Image, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { FaEllipsisV } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { loadUserInfoOfPost } from "../store/feed-actions";

const Post = ({ postData }) => {
  const { _id: postId } = postData;
  const dispatch = useDispatch();

  const [userProfileSrc, setUserProfileSrc] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    if (postId) {
      dispatch(
        loadUserInfoOfPost(postData.userId, setUserProfileSrc, setUsername)
      );
    }
  }, [postId]);

  return (
    <LazyLoadComponent>
      <Box
        padding="12px"
        backgroundColor="white"
        width="600px"
        marginBottom="40px"
        rounded="lg"
        border="1px solid #ccc"
        mt="10px"
      >
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
            <Icon as={FaEllipsisV} className="action-icon" />
          </Box>
        </Box>
        <Box fontSize="14px">{postData.desc}</Box>
        <Box maxHeight="600px" overflow="hidden">
          <Box>
            <Image
              src={`${process.env.PUBLIC_URL}/assets/uploads/posts/${postData.postImage}`}
              objectFit="cover"
            />
          </Box>
        </Box>

        <Box marginY="10px">
          <HStack spacing="10px">
            <Icon
              as={MdFavoriteBorder}
              h="32px"
              w="32px"
              className="action-icon"
            />
            <Icon as={MdComment} h="30px" w="30px" className="action-icon" />
          </HStack>
          <Box marginY="8px" fontSize="13px">
            {postData.likes.length > 0
              ? `${postData.likes.length} likes`
              : "No likes"}
          </Box>
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default Post;

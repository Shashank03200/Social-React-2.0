import React from "react";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function PostSkeleton() {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      width="600px"
      marginBottom="40px"
      height="600px"
      mx="auto"
    >
      <Box d="flex">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" ml="2" width="100px" noOfLines={1} spacing="4" />
      </Box>
      <SkeletonText mt="4" ml="2" noOfLines={1} spacing="4" />
    </Box>
  );
}

export default PostSkeleton;

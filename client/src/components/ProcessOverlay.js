import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

function ProcessOverlay() {
  return (
    <Box
      height="100vh"
      width="100vh"
      zIndex="100"
      backgroundColor="blackAlpha.300"
    >
      <Text fontSize="2xl">Creating your Post</Text>
      <Box justifyContent="center" d="flex" alignItems="center">
        <Spinner size="xl"></Spinner>
      </Box>
    </Box>
  );
}

export default ProcessOverlay;

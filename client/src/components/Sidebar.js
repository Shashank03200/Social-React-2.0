import { Box } from "@chakra-ui/layout";

const Sidebar = () => {
  return (
    <Box
      pos="fixed"
      display={{ base: "none", lg: "block" }}
      top="0"
      left="0"
      height="100vh"
    ></Box>
  );
};

export default Sidebar;

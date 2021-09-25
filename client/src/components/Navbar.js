import {
  Box,
  Container,
  Image,
  Input,
  InputGroup,
  Icon,
  HStack,
  Avatar,
} from "@chakra-ui/react";

import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

const Navbar = () => {
  return (
    <Box
      borderBottom="1px solid pink"
      pos="sticky"
      top="0"
      zIndex="1"
      backgroundColor="#fff"
    >
      <Container display="flex" p="10px" maxW="container.lg">
        <Box flex="3">
          <Image
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram-logo"
            className="action-icon"
          />
        </Box>

        <Box flex="6" display="flex" alignItems="center">
          <InputGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="Search"
              variant="outline"
              size="xs"
              textAlign="center"
              maxW="200px"
              width="fit-content"
            />
          </InputGroup>
        </Box>

        <Box flex="3">
          <HStack spacing="24px" display="flex" justifyContent="flex-end">
            <Icon as={IoHomeSharp} w="24px" h="24px" className="action-icon" />
            <Icon
              as={AiOutlineMessage}
              w="24px"
              h="24px"
              className="action-icon"
            />
            <Icon as={FiHeart} w="24px" h="24px" className="action-icon" />

            <Avatar
              height="24px"
              width="24px"
              size="xs"
              src={`${process.env.PUBLIC_URL}/assets/uploads/users/profile-image.png`}
              className="action-icon"
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

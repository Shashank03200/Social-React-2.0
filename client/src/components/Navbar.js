import {
  Box,
  Container,
  Image,
  Input,
  InputGroup,
  Icon,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import NewPostIcon from "./CustomIcons/NewPostIcon";

import { FiHeart } from "react-icons/fi";
import { UISliceActions } from "../store/UISlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.UISlice.isModalOpen);
  const userProfileImage = useSelector((state) => state.feed.userProfileImage);
  const userFullname = useSelector((state) => state.feed.userFullname);
  const history = useHistory();
  const [activeIcon, setActiveIcon] = useState({
    home: true,
    suggestions: false,
    newPost: false,
  });

  const activeIconChangeHandler = (activeValue) => {
    setActiveIcon((prevState) => {
      return {
        ...prevState,
        home: activeValue === "home",
        suggestions: activeValue === "suggestions",
        newPost: activeValue === "newPost",
      };
    });
  };

  console.log("activeIcon", activeIcon);

  const toggleCreatePostModalVisibility = () => {
    activeIconChangeHandler("newPost");
    dispatch(UISliceActions.toggleModalVisibility());
  };

  return (
    <Box
      borderBottom="1px solid pink"
      pos="sticky"
      top="0"
      zIndex="1"
      backgroundColor="#fff"
    >
      <Container display="flex" p="10px" maxW="container.lg">
        <Box flex={{ base: "6", lg: "3" }}>
          <Image
            src={process.env.PUBLIC_URL + "/assets/uploads/posts/new.png"}
            objectFit="contain"
          />
        </Box>

        <Box
          flex="2"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
        >
          <InputGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
            display="none"
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

        <Box flex="2">
          <HStack spacing="24px" display="flex" justifyContent="flex-end">
            <Icon
              as={IoHomeSharp}
              w="24px"
              h="24px"
              className="action-icon"
              onClick={() => {
                history.replace("/");
              }}
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={toggleCreatePostModalVisibility}
            >
              <NewPostIcon style={isModalOpen ? "filled" : ""} />
            </span>

            <Icon
              as={IoMdHeartEmpty}
              w="24px"
              h="24px"
              className="action-icon"
              onClick={() => {
                history.replace("/update");
              }}
            />

            <Avatar
              height="24px"
              width="24px"
              size="xs"
              name={userFullname}
              src={userProfileImage}
              className="action-icon"
              onClick={() => {
                history.replace("/profile");
              }}
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

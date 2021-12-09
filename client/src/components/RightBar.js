import { Box, Text } from "@chakra-ui/layout";
import "./RightBar.css";
import { Button } from "@chakra-ui/react";

import NewPostCreator from "./NewPostCreator";
import UserDetailsCard from "./UserDetailsCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadSuggestedUsers } from "../store/feed-actions";
import { Spinner } from "@chakra-ui/spinner";
import SuggestedUserList from "./SuggestedUserList";

const RightBar = ({ userData }) => {
  const { userId } = userData;

  const dispatch = useDispatch();

  const [suggestedUsers, setSuggestedUsers] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(loadSuggestedUsers(setSuggestedUsers));
    }
  }, [userId]);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      flex="5"
      position="sticky"
      top="50px"
      height="90vh"
      d={{ base: "none", lg: "flex" }}
      flexDirection="column"
      paddingLeft="5vw"
      className="RightBarWrapper"
    >
      <UserDetailsCard userData={userData} />
      <Box
        width="40vh"
        className="rightBarComponents"
        flex="4"
        rounded="lg"
        border="1px solid #ccc"
        p="14px"
        mb="24px"
        display="flex"
        flexDirection="column"
      >
        <Text textAlign="center" fontSize="20px" mb="16px" p="5px">
          Create a new post
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow="1"
        >
          <Button
            width="100%"
            bgGradient="linear(to-r, #7928CA , #FF0080)"
            color="white"
            onClick={() => setIsModalOpen(true)}
            _hover={{
              bgGradient: "linear(to-r, #7928CA , #FF0080 )",
            }}
            _active={{
              pos: "relative",
              top: "3px",
              bgGradient: "linear(to-r, #7928CA , #FF0080)",
            }}
          >
            Create A Post
          </Button>
          <NewPostCreator
            isModalOpen={isModalOpen}
            onModalClose={onModalClose}
          />
        </Box>
      </Box>

      <Box
        borderWidth="2px"
        padding="14px"
        rounded="lg"
        border="1px solid #ccc"
        mb="24px"
        width="40vh"
        className="rightBarComponents"
        flex="6"
      >
        <Text textAlign="center" fontSize="20px" mb="16px" p="5px">
          People you may know
        </Text>
        {!suggestedUsers ? (
          <Spinner size="md" />
        ) : (
          <SuggestedUserList suggestedUsers={suggestedUsers} />
        )}
      </Box>
    </Box>
  );
};

export default RightBar;

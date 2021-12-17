import { Box, Text } from "@chakra-ui/layout";
import "./RightBar.css";
import { Button } from "@chakra-ui/react";

import NewPostCreator from "./NewPostCreator";
import UserDetailsCard from "./UserDetailsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSuggestedUsers } from "../store/feed-actions";
import { Spinner } from "@chakra-ui/spinner";
import SuggestedUserList from "./SuggestedUserList";
import { UISliceActions } from "../store/UISlice";

const RightBar = ({ userData }) => {
  const { userId } = userData;

  const dispatch = useDispatch();

  const suggestedUsers = useSelector((state) => state.feed.suggestedUsers);

  const isModalOpen = useSelector((state) => state.UISlice.isModalOpen);

  useEffect(() => {
    if (userId) {
      dispatch(loadSuggestedUsers());
    }
  }, [userId]);

  const togglePostCreatorModalVisibility = () => {
    dispatch(UISliceActions.toggleModalVisibility());
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
            backgroundColor="blue"
            color="white"
            boxShadow="0px 2px 5px gray"
            onClick={togglePostCreatorModalVisibility}
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
          <NewPostCreator />
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

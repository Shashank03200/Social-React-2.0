import { Box } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import SuggestedUser from "./SuggestedUser";

function SuggestedUserList({ suggestedUsers }) {
  const suggestedUsersList =
    suggestedUsers &&
    suggestedUsers.map((suggestedUser, index) => {
      return (
        <SuggestedUser
          key={suggestedUser + index}
          src={suggestedUser.profileImage}
          username={suggestedUser.username}
          userId={suggestedUser._id}
        />
      );
    });

  return !suggestedUsers ? (
    <Box w="100%" textAlign="center" p="12px">
      <Spinner
        size="xl"
        thickness="4px"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Box>
  ) : (
    suggestedUsersList
  );
}

export default SuggestedUserList;

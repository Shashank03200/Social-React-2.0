import { Avatar, Box, Text } from "@chakra-ui/react";

const UserDetailsCard = ({ userData }) => {
  if (!userData) {
    return <p>Loading</p>;
  } else
    return (
      <Box
        width="40vh"
        flex="1"
        background="whiteAlpha.300"
        mt="10px"
        padding="14px"
        rounded="lg"
        border="1px solid #ccc"
        mb="24px"
      >
        <Box d="flex" justifyContent="space-between">
          <Box d="flex" alignItems="center" p="10px">
            <Avatar
              size="md"
              src={`${process.env.PUBLIC_URL}/assets/image/users/${userData.userProfileImage}`}
            />

            <Box height="fit-content" ml="14px" d="flex" alignItems="center">
              {userData.userName}
            </Box>
          </Box>

          <Box mr="16px" d="flex" alignItems="center">
            Switch
          </Box>
        </Box>
      </Box>
    );
};

export default UserDetailsCard;

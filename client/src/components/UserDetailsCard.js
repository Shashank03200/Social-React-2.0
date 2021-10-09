import React, { useState } from "react";

import { Avatar, Box, Button } from "@chakra-ui/react";
import LogoutAlert from "./LogoutAlert";

const UserDetailsCard = ({ userData }) => {
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);

  console.log("UserDetailsCard", userData);

  if (!userData) {
    return <p>Loading</p>;
  } else
    return (
      <Box
        width="40vh"
        background="whiteAlpha.300"
        mt="10px"
        padding="10px"
        rounded="lg"
        border="1px solid #ccc"
        mb="24px"
        d="flex"
      >
        <Box d="flex" flex="8" alignItems="center" p="10px">
          <Avatar
            size="md"
            name={userData.username}
            src={`${process.env.PUBLIC_URL}/assets/image/users/${userData.userProfileImage}`}
          />

          <Box height="fit-content" ml="14px">
            {userData.userName}
          </Box>
        </Box>

        <Box d="flex" flex="4" justifyContent="center" alignItems="center">
          <Button
            d="flex"
            alignItems="center"
            cursor="pointer"
            height="fit-content"
            padding="2px 10px"
            onClick={() => setIsLogoutAlertVisible(true)}
          >
            Switch
          </Button>
        </Box>

        <LogoutAlert
          isOpen={isLogoutAlertVisible}
          onClose={() => setIsLogoutAlertVisible(false)}
        />
      </Box>
    );
};

export default UserDetailsCard;

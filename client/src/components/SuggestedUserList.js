import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SuggestedUser from "./SuggestedUser";
import { useSelector } from "react-redux";

import routeInstance from "../routes.instance";

function SuggestedUserList({ suggestedUsers }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [isLoadingList, setIsLoadingList] = useState(true);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Suggested UserList.js ", accessToken);
      const response = await routeInstance({
        url: "/api/auth/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response [SuggestedUserList.js]: ", response);
      setCurrentUserFollowings(response.data.following)
    };
    try {
      if (isLoggedIn) {
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const suggestedUsersList =
    suggestedUsers &&
    suggestedUsers.map((suggestedUser, index) => {
      return (
        <SuggestedUser
          key={suggestedUser + index}
          src={suggestedUser.profileImage}
          username={suggestedUser.username}
          userId={suggestedUser._id}
          isLoading={isLoadingList}
          currentuserFollowings={currentUserFollowings}
        />
      );
    });

  return !suggestedUsers ? <Spinner size="md" /> : suggestedUsersList;
}

export default SuggestedUserList;

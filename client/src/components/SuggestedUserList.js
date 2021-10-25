import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SuggestedUser from "./SuggestedUser";
import { useSelector } from "react-redux";
import axios from "axios";
import routeInstance from "../routes.instance";

function SuggestedUserList({ suggestedUsers }) {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [isLoadingList, setIsLoadingList] = useState(true);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await routeInstance({
        url: "/api/auth/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        throw new Error("Server Error");
      }
      const data = await response.data;

      setCurrentUserFollowings(data.following);
      setIsLoadingList(false);
    };
    try {
      if (accessToken) {
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [accessToken]);

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

import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SuggestedUser from "./SuggestedUser";
import { useSelector } from "react-redux";

function SuggestedUserList({ suggestedUsers }) {
  const token = useSelector((state) => state.user.token);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      setCurrentUserFollowings(data.following);
      setIsLoadingList(false);
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

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

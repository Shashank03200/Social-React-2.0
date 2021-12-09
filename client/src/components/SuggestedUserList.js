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

  return !suggestedUsers ? <Spinner size="md" /> : suggestedUsersList;
}

export default SuggestedUserList;

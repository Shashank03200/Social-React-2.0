
import './RightBar.css';
import AddIcon from '@material-ui/icons/Add';
import { Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux'
import SuggestedUser from '../SuggestedUser/SuggestedUser'
import { useEffect } from 'react';

import { getAllUsers } from '../../store/user-actions';


const RightBar = (props) => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    const users = useSelector(state => state.user.users);
    const { _id: currentUserId, following } = useSelector(state => state.auth.userData);
    let suggestedUsers = undefined;
    if (users) {
        suggestedUsers = users.filter(user => (!following.includes(user._id) && user._id !== currentUserId))
    }



    return (
        <div className="RightBarContainer">
            <div className="RightBarWrapper">
                <div className="RightBarTitle">People you may know</div>
                {!suggestedUsers && <p>Loading..</p>}
                {
                    suggestedUsers &&
                    <ul className="UsersNotFollowedList">
                        {suggestedUsers.map((user, index) => {
                            return <SuggestedUser key={index} userData={user} />
                        })}
                    </ul>
                }
            </div>
            <Button color="success" className="newPostButton" onClick={props.onToggleNewPost}><AddIcon />New Post</Button>
        </div>
    );
}

export default RightBar;
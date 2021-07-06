
import './RightBar.css';
// import NewPost from './NewPost';
import AddIcon from '@material-ui/icons/Add';
import { Button } from 'reactstrap';
// import UnknownUser from './UnknownUser';




const RightBar = (props) => {


    return (
        <div className="RightBarContainer">
            <div className="RightBarWrapper">
                <div className="RightBarTitle">People you may know</div>
                <ul className="UsersNotFollowedList">
                </ul>
            </div>
            <Button color="success" className="newPostButton" onClick={props.onToggleNewPost}><AddIcon />New Post</Button>
        </div>
    );
}

export default RightBar;
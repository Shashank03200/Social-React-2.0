import { useSelector, useDispatch } from "react-redux";
import { Button } from 'reactstrap'
import './SuggestedUser.css';

const SuggestedUser = (props) => {

    const userData = useSelector(state => state.auth.userData);
    const { name, profileImg } = userData

    return (
        <li className="SuggestedUser mb-2">
            <div className="SuggestedUser Left">
                <img className="UserImage" src />
                <span className="UserAction">
                    <span className="SuggestedUsername">{name}</span>
                </span>
            </div>
            <div className="SuggestedUser Right">
                <Button color="primary" className="FollowButton">Follow</Button>
            </div>
        </li>
    );
}

export default SuggestedUser;
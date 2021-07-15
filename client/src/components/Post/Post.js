import './Post.css';
import { useEffect, useState } from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { likePost } from '../../store/post-actions';
import { postSliceActions } from '../../store/post-slice';

const Post = ({ postData }) => {

    let token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.userData._id);
    const { _id: postId, desc, postImage, userId } = postData;

    const [name, setName] = useState('');
    const [isLiked, setIsLiked] = useState();
    const [likes, setLikes] = useState(postData.likes);
    useEffect(() => {
        const getUser = async () => {
            if (token) {
                const response = await axios.get(`/api/users/${userId}`);
                const data = await response.data;
                setName(data.name);
            }
        }
        getUser();
    }, [])

    useEffect(() => {

        const updatePost = async () => {
            const response = await fetch('/api/posts/' + postId)
            const data = await response.json();
            setLikes(data.likes);
        }
        updatePost();
    }, [isLiked])


    console.log(likes)

    useEffect(() => {
        setIsLiked(likes.includes(currentUserId));
    }, [likes, currentUserId])


    const postLikeHandler = () => {

        dispatch(likePost(currentUserId, postId))
        setIsLiked(prevState => !prevState.isLiked)

    }



    return (
        <div className="Post">
            <div className="PostWrapper">
                <div className="PostTop">
                    <div className="PostTopLeft">
                        <div alt="profileImage"

                            className="large">
                            <span className="PostUsername">
                                {name}
                            </span>

                        </div>
                    </div>
                    <div className="PostTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="PostCenter">
                    <span className="PostText">{desc}</span>
                    <img className="PostImage" src={'/uploads/' + postImage} alt="postImage" />
                </div>
                <div className="PostBottom">
                    <span onClick={postLikeHandler} style={{ cursor: 'pointer' }}>
                        {
                            !isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />
                        }
                    </span>

                    <span className="PostLikeCounter">{likes.length} people like this</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
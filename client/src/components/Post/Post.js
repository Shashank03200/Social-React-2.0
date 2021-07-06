import './Post.css';
import { useEffect, useState } from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Post = ({ postData }) => {

    return (
        <div className="Post">
            <div className="PostWrapper">
                <div className="PostTop">
                    <div className="PostTopLeft">
                        <div alt="profileImage"
                            src={process.env.PUBLIC_URL + '/assets/person/1.jpeg'}
                            className="large">
                            <span className="PostUsername">
                            </span>

                        </div>
                    </div>
                    <div className="PostTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="PostCenter">
                    <span className="PostText">Image desc</span>
                    <img className="PostImage" src={postData.photo} alt="postImage" />
                </div>
                <div className="PostBottom">
                    <FavoriteBorderIcon />
                    <FavoriteIcon />
                    <span className="PostLikeCounter">5 people like this</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
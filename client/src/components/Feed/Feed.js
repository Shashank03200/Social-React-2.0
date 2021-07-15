
import './Feed.css';
import Post from '../Post/Post';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/post-actions';

const Feed = () => {

    const posts = useSelector(state => state.post.posts)
    // const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userData._id);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts(userId));
    }, [])

    return (
        <div className="FeedContainer">
            <div className="FeedWrapper">
                {!posts && <p>Loading....</p>}
                {
                    posts && posts.map(post => {
                        return <Post key={post._id} postData={post} />
                    })
                }

            </div>
        </div>
    );
}

export default Feed;
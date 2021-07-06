
import './Feed.css';
import Post from '../Post/Post';


const Feed = ({ userId }) => {

    return (
        <div className="FeedContainer">
            <div className="FeedWrapper">
                {/* {
                    posts.map(post => {
                        return <Post key={post._id} postData={post} />
                    })
                } */}

            </div>
        </div>
    );
}

export default Feed;
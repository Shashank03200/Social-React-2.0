import { useState } from 'react';
import Sidebar from '../Sidebar/SideBar';
import RightBar from '../RightBar/RightBar';
import Feed from '../Feed/Feed'
import NewPost from '../NewPost/NewPost'
import './Layout.css'

const Layout = () => {

    const [isNewPostVisible, setIsNewPostVisible] = useState(false);

    const newPostHandler = () => {
        setIsNewPostVisible(prevState => !prevState);
    }

    return (
        <div className="LayoutContainer">
            {isNewPostVisible && <NewPost onCancel={newPostHandler} />}
            <Sidebar />
            <Feed />
            <RightBar onToggleNewPost={newPostHandler} />
        </div>
    );
}

export default Layout;
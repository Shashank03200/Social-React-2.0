import { useState } from 'react';
import Sidebar from '../Sidebar/SideBar';
import RightBar from '../RightBar/RightBar';
import Feed from '../Feed/Feed'
import NewPost from '../NewPost/NewPost'
import { UISliceActions } from '../../store/ui-slice';
import { useSelector, useDispatch } from 'react-redux';
import './Layout.css'

const Layout = () => {

    const dispatch = useDispatch();
    const newPostWindowActive = useSelector(state => state.ui.newPostWindowActive);

    const newPostWindowToggler = () => {
        dispatch(UISliceActions.toggleNewPostWindow())
    }

    return (
        <div className="LayoutContainer">
            <NewPost onCancel={newPostWindowToggler} active={newPostWindowActive} />
            <Sidebar />
            <Feed />
            <RightBar onToggleNewPost={newPostWindowToggler} />
        </div>
    );
}

export default Layout;
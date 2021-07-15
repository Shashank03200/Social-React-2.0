
import './NewPost.css';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import { UISliceActions } from '../../store/ui-slice';
import { useRef } from 'react';
import { configureNewPost, createNewPost, getPosts } from '../../store/post-actions';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, TextField } from '@material-ui/core';

const NewPost = (props) => {

    const uploadedImage = useSelector(state => state.post.uploadedImage)
    const userId = useSelector(state => state.auth.userData._id);
    const [postImage, setPostImage] = useState()
    const [postDesc, setPostDesc] = useState();
    const dispatch = useDispatch();



    const postCancelHandler = () => {
        setPostDesc('')
        setPostImage([])
        dispatch(UISliceActions.toggleNewPostWindow());
    }

    const postSubmitHandler = () => {

        const formData = new FormData();
        formData.append("userId", userId)
        formData.append("desc", postDesc)
        formData.append("postImage", postImage);
        formData.append("confirm", "1")
        dispatch(createNewPost(formData));
        dispatch(getPosts(userId));
        dispatch(UISliceActions.toggleNewPostWindow())

    }

    const configPostHandler = () => {
        
        const formData = new FormData();
        formData.append("userId", userId)
        formData.append("desc", postDesc)
        formData.append("postImage", postImage);


        dispatch(configureNewPost(formData))
    }



    return (
        <div>

            <Modal isOpen={props.active} toggle={props.onCancel} className="NewPostModal" >
                <form method="post" encType="multipart/form-data">
                    <div className="Header">
                        <Avatar className="NewPostProfileAvatar" src={process.env.PUBLIC_URL + '/assets/person/1.jpeg'} />
                        <TextField name="desc" className="captionField" id="standard-basic" label="Add a caption" value={postDesc} onChange={(e) => setPostDesc(e.target.value)} />
                    </div>
                    <div className="NewPostActionButtonWrapper">
                        <input name="postImage" class="form-control mb-3" type="file" id="formFile" onChange={(e) => setPostImage(e.target.files[0])} />
                        <Button outline color="success" onClick={configPostHandler}>Upload this image</Button>
                    </div>

                    <ModalBody className="ModalBody">
                        {uploadedImage &&
                            <img src={process.env.PUBLIC_URL + '/uploads/' + uploadedImage} className="NewPostImage" />}
                    </ModalBody>
                    <ModalFooter className="ModalFooter">
                        <div>
                            <Button color="success" className="PostButton" onClick={postSubmitHandler} block>POST TO SOCIALLY </Button>
                            <Button color="danger" className="CancelButton" onClick={postCancelHandler} block >Cancel</Button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </div >
    );

}


export default NewPost;
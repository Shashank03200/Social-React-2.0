import { postSliceActions } from "./post-slice";
import { UISliceActions } from "./ui-slice";

import axios from 'axios'

export const getPosts = (userId) => {

    return async (dispatch) => {

        const fetchPosts = async (userId) => {
            const response = await axios.get('/api/posts/timeline/' + userId);
            const postData = response.data;
            if (response.statusText !== 'OK') {
                dispatch(UISliceActions.toggleServerError({ error: postData }));
            }
            else {
                dispatch(postSliceActions.setPosts({ posts: postData }))

            }
        }

        try {
            fetchPosts(userId);
        } catch (error) {
            dispatch(UISliceActions.toggleServerError({ error }))
        }
    }
}

export const configureNewPost = (postFormData) => {

    return async (dispatch) => {
        try {

            const response = await fetch('/api/posts/newpost', {
                method: 'POST',
                body: postFormData
            })
            const newPostData = await response.json();


            if (response.statusText !== 'OK') {

                dispatch(UISliceActions.toggleServerError({ error: newPostData }));

            } else
                dispatch(postSliceActions.configureNewPost(newPostData));

        } catch (error) {
            dispatch(UISliceActions.toggleServerError({ error }))
        }
    }
}


export const createNewPost = (formData) => {

    return async (dispatch) => {


        const createPost = async () => {

            const response = await axios.post('/api/posts/newpost', formData);
            const newPostData = response.data;
            if (response.statusText !== 'OK') {

                dispatch(UISliceActions.toggleServerError({ error: newPostData }));
            } else {
                dispatch(postSliceActions.createNewPost({ newPost: newPostData }));
            }
        }

        try {
            createPost(formData);
        } catch (error) {
            dispatch(UISliceActions.toggleServerError({ error }))
        }
    }
}

export const deletePost = (token, userId, postId) => {

    return async (dispatch) => {

        if (!token) {
            dispatch(UISliceActions.toggleClientError({ error: "Forbidden" }));
            return;
        }
        const removePost = async () => {
            const response = await axios.delete('/api/posts/' + postId, {
                data: userId,
                headers: {
                    'x-auth-token': token
                }
            });
            const data = response.data;
            if (response.statusText !== 'OK') {
                dispatch(UISliceActions.toggleServerError({ error: data }));
            }
            dispatch(postSliceActions.setPosts({ posts: data }))
        }

        try {
            removePost(postId);
        } catch (error) {
            dispatch(UISliceActions.toggleServerError({ error }))
        }
    }
}

export const likePost = (userId, postId) => {
    console.log('Liking Post');

    return async (dispatch) => {
        console.log('userId', userId)

        const likePost = async (userId, postId) => {
            const response = await axios.post('/api/posts/' + postId + '/like', { userId });
            const data = response.data;

            if (response.statusText !== 'OK') {
                dispatch(UISliceActions.toggleServerError({ error: data }));
            }
        }

        try {
            likePost(userId, postId);
        } catch (error) {
            dispatch(UISliceActions.toggleServerError({ error }))
        }
    }
}
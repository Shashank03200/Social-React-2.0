import { createSlice } from '@reduxjs/toolkit';

const intialPostState = {
    posts: null,
    postUploadProgess: 0,
    uploadedImage: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState: intialPostState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload.posts;
        },
        createNewPost(state, action) {
            state.posts.push(action.payload.newPost);
        },
        setUploadProgess(state, action) {
            state.postUploadProgess = action.payload;
        },
        configureNewPost(state, action) {
            if (action.payload.postImage) {
                state.uploadedImage = action.payload.postImage
            }
        },
        // updatePost(state, action) {
        //     const postId = action.payload._id;
        //     const foundPostIndex = state.posts.findIndex((post) => post._id = postId)
        //     const foundPost = state.posts[foundPostIndex];

        // }

    }
})

export const postSliceActions = postSlice.actions;

export default postSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const intialUIState = {
    newPostWindowActive: false,
    serverError: null,
    clientError: null,
    loadingData: null,
    warning: null
}

const UISlice = createSlice({
    name: 'UISlice',
    initialState: intialUIState,
    reducers: {
        toggleNewPostWindow(state) {
            state.newPostWindowActive = !state.newPostWindowActive;
        },
        toggleServerError(state, action={}) {
            if (!state.serverError) {
                state.serverError = action.payload.error
            } else {
                state.serverError = null;
            }
        },
        toggleClientError(state, action={}) {
            if (!state.clientError) {
                state.clientError = action.payload.error
            } else {
                state.clientError = null;
            }
        },
        setIsLoading(state, action) {
            state.loadingData = action.payload;
        },
        toggleWarning(state, action) {
            state.warning = action.payload.warning;
        }

    }
})

export const UISliceActions = UISlice.actions;

export default UISlice.reducer;
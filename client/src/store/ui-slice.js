import { createSlice } from '@reduxjs/toolkit';

const intialUIState = {
    newPostWindowActive: false,
    serverError: null,
    clientError: null,
    loadingData: null,
    warning: null
}

const UISlice = {
    name: 'UISlice',
    intitialState: intialUIState,
    reducers: {
        toggleNewPostWindow(state) {
            state.newPostWindowActive = !state.newPostWindowActive;
        },
        toggleServerError(state, payload) {
            if (!state.serverError) {
                state.serverError = payload.error
            } else {
                state.serverError = null;
            }
        },
        toggleClientError(state, payload) {
            if (!state.clientError) {
                state.clientError = payload.error
            } else {
                state.clientError = null;
            }
        },
        toggleIsLoading(state) {
            state.loadingData = !state.loadingData
        },
        toggleWarning(state, payload) {
            state.warning = payload.warning;
        }

    }
}

export const UISliceActions = UISlice.actions;

export default UISlice.reducer;
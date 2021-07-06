import { createSlice } from '@reduxjs/toolkit';

const intialAuthState = {
    isAuthenticated: !!localStorage.getItem('userId'),
    userId: localStorage.getItem('userId');
    authError: null
}

const authSlice = ({
    name: 'authSlice',
    intialState: intialAuthState,
    reducers: {
        
        failedLogin(state, payload) {
            state.isAuthenticated = false;
            state.userId = null;
        },
        successLogin(state, payload) {
            state.isAuthenticated = true;
            state.userId = action.payload._id;
            state.authError = false;
        },

        initRegister(state, payload) {

        },
        errorRegister(state, payload) {
            state.isAuthenticated = false;
            state.userId = null;

        },
        successRegister(state, payload) {
            state.isAuthenticated = true;
            state.userId = action.payload.userId;
            state.authError = false;
        }
    }
})

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
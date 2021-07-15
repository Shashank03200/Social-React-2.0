import { createSlice } from '@reduxjs/toolkit';

const intialAuthState = {
    token: localStorage.getItem('tokenItem'),
    userData: undefined,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: intialAuthState,
    reducers: {

        authFailed(state) {
            state.token = undefined;
            state.userData = undefined;
            state.isAuthenticated = false;
            localStorage.removeItem('token')
        },

        authSuccess(state, action) {
            if (!localStorage.getItem('token')) {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token)
            }
            state.userData = action.payload.user;
            state.isAuthenticated = true;
        }


    }
})



export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
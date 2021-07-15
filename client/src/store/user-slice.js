import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { users: undefined },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload.users
        }
    }
})

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
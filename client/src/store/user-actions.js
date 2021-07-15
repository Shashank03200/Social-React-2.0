import { userSliceActions } from "./user-slice";
import { UISliceActions } from './ui-slice'
import axios from "axios";

export const getAllUsers = () => (
    async (dispatch) => {
        try {
            const response = await axios.get('/api/users/all');
            if (response.statusText !== 'OK') {
                dispatch(UISliceActions.toggleServerError({ error: "Service unavailable" }));
                return;
            }
            const users = response.data;

            dispatch(userSliceActions.setUsers({ users }))
        } catch (err) {
            dispatch(UISliceActions.toggleClientError({ error: "Unable to fetch all users" }))
        }
    }
)
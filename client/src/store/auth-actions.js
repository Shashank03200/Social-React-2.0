import { UISliceActions } from "./ui-slice";
import { authSliceActions } from "./auth-slice";
import axios from 'axios';

export const login = (loginData) => {
    return (dispatch) => {
        const startLogin = async (loginData) => {
            // console.log('Loggin in')
            const { email, password } = loginData;
            // (email, password);
            dispatch(UISliceActions.setIsLoading(true));
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.statusText !== 'OK') {
                dispatch(authSliceActions.authFailed());
            }
            else {
                const data = response.data;
                dispatch(authSliceActions.authSuccess(data))
            }
        }
        try {
            startLogin(loginData)
            dispatch(UISliceActions.setIsLoading(false));

        } catch (err) {
            dispatch(UISliceActions.toggleClientError({ error: err }))
        }
    }
}

export const register = (registerData) => {
    return async (dispatch) => {
        const startRegister = async () => {
            dispatch(UISliceActions.setIsLoading(true));
            const response = await axios.post('/api/auth/register', registerData)
            if (response.statusText !== 'OK') {
                dispatch(UISliceActions.toggleServerError(
                    { error: response.data }
                ))
                dispatch(authSliceActions.authFailed());
            }
            const data = response.data;
            dispatch(authSliceActions.authSuccess(data))

        }
        try {
            startRegister(registerData);
            dispatch(UISliceActions.setIsLoading(false));

        } catch (err) {
            dispatch(UISliceActions.toggleClientError({ error: err }))
        }

    }
}
import { UISliceActions } from "./ui-slice";
import { authSliceActions } from "./auth-slice";

export const login = ({ email, password }) => {
    return async (dispatch) => {
        const startLogin = async () => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                dispatch(UISliceActions.toggleServerError(
                    { error: await response.json() }
                ))
                dispatch(authSliceActions.failedLogin());
            }
            const data = await response.json();
            dispatch(authSliceActions.successLogin(data))
        }
        try {
            startLogin(email, password)
        } catch (err) {
            dispatch(UISliceActions.toggleClientError({ error: err }))
        }
    }
}

export const register = (registerData) => {
    return async (dispatch) => {
        const startRegister = async () => {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(registerData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                dispatch(UISliceActions.toggleServerError(
                    { error: await response.json() }
                ))
                dispatch(authSliceActions.failedLogin());
            }
            const data = await response.json();
            dispatch(authSliceActions.successLogin(data))
        }
        try {
            startRegister(registerData)
        } catch (err) {
            dispatch(UISliceActions.toggleClientError({ error: err }))
        }
    }
}
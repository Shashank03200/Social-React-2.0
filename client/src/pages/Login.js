import './Login.css';
import { useDebugValue, useRef } from 'react';
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { login } from '../store/auth-actions';
import { UISliceActions } from '../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.ui.isLoading)

    const loginFormHandler = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            dispatch(UISliceActions.toggleClientError({ error: "Please fill all the fields" }));
        }
        dispatch(login({ email, password }));
    }

    return (
        <div className="Login">

            <div className="LoginTitle">Lets Log In</div>
            <div className="LoginWrapper">
                <div className="LoginLeft">
                    <h3 className="LoginLogo">Socially</h3>
                    <span className="LoginDesc">
                        Connect with the friends and world around you.
                    </span>
                </div>

                <div className="LoginRight">
                    <form className="LoginBox">

                        <input type="email" placeholder="Email" className="LoginInput" ref={emailRef} />
                        <input type="password" placeholder="Password" className="LoginInput" ref={passwordRef} />
                        <button className="LoginButton" type="button" onClick={loginFormHandler} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : 'Login'}
                        </button>
                        <button className="RegisterButton" onClick={() => history.push('/register')}>Create a new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
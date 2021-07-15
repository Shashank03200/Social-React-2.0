import './Register.css';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../store/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core'
import { UISliceActions } from '../store/ui-slice';

const Register = () => {

    const loadingData = useSelector(state => state.ui.loadingData)

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();

    const dispatch = useDispatch();

    const registerSubmitHandler = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;
        if (!name || !email || !password || !passwordConfirm) {
            dispatch(UISliceActions.toggleClientError({ error: "Please fill all the fields." }))
            return;
        }

        if (password !== passwordConfirm) {
            dispatch(UISliceActions.toggleClientError({ error: "Passwords do not match." }));
            return;
        }

        dispatch(register({ name, email, password }));
    }

    return (
        <div className="Register">
            <div className="RegisterTitle">Create your account</div>
            <div className="RegisterWrapper">
                <div className="RegisterLeft">
                    <h3 className="RegisterLogo">
                        Socially
                    </h3>
                    <span className="RegisterDesc">
                        Connect with the friends and world around you.
                    </span>
                </div>
                <div className="RegisterRight">
                    <form className="RegisterBox">

                        <input
                            type="text"
                            max="100"
                            placeholder="Your Name"
                            className="RegisterInput"
                            ref={nameRef}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="RegisterInput"
                            ref={emailRef}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="RegisterInput"
                            minLength="6"
                            ref={passwordRef}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="RegisterInput"
                            minLength="6"
                            ref={passwordConfirmRef}
                        />
                        <button className="RegisterButton" type="button" onClick={registerSubmitHandler} disabled={loadingData}>
                            {loadingData ? <CircularProgress /> : 'Sign Up'}
                        </button>
                        <button className="LoginButton" type="button" onClick={() => history.push('/login')}>Login to your account</button>

                    </form>
                </div>
            </div>
        </div >
    )

}

export default Register;

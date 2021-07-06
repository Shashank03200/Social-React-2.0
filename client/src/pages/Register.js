import './Register.css';
import { useContext, useRef } from 'react';


const Register = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordAgainRef = useRef();

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
                            ref={passwordAgainRef}
                        />
                        <button className="RegisterButton" type="submit">Sign Up</button>
                        <button className="LoginButton" >Login to your account</button>

                    </form>
                </div>
            </div>
        </div >
    )

}

export default Register;

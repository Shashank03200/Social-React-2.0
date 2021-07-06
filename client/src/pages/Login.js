import './Login.css';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <div class="Login">

            <div class="LoginTitle">Lets Log In</div>
            <div class="LoginWrapper">
                <div class="LoginLeft">
                    <h3 class="LoginLogo">Socially</h3>
                    <span class="LoginDesc">
                        Connect with the friends and world around you.
                    </span>
                </div>

                <div class="LoginRight">
                    <form class="LoginBox">

                        <input type="email" placeholder="Email" className="LoginInput" ref={emailRef} />
                        <input type="password" placeholder="Password" className="LoginInput" ref={passwordRef} />
                        <button className="LoginButton" disabled={isAuthenticating}>

                            Login
                        </button>
                        <button className="RegisterButton" onClick={signupRedirect}>Create a new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
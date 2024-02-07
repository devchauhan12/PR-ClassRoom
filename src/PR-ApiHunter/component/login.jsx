import React, { useState } from 'react'
import "../assets/styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

const Login = () => {
    const [type, setType] = useState("signIn");
    const handleOnClick = (text) => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    return (
        <div className="App">
            <h2>Sign in/up Form</h2>
            <div className={`container1 ${type === "signUp" ? "right-panel-active" : ""}`} id="container">
                <SignInForm />
                <SignUpForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className='mb-2'>
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className='mb-2'>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
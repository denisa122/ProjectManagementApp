import React from "react";
import { Link } from "react-router-dom";

import "./authentication.css" ;

import Logo from "../../assets/logo.png";

const Login = () => {
    return (
        <div className="loginPageContainer">
            <div className="loginFormContainer">
                <img src={Logo} alt="Logo" className="authLogo" />  
                <h2>
                    <strong>Log in</strong>
                </h2>
                <p>
                    Your team is waiting for you. <br></br> Log in to your account to get started. 
                </p>
                <form id="loginForm">
                    <input type="email" placeholder="Work email" id="email" name="email"></input>
                    <input type="password" placeholder="Password" id="password" name="password"></input>

                    <button type="submit">Log in</button>
                </form>

                <div>
                    <p className="registerSection">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
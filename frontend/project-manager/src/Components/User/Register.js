import React from "react";
import { Link } from "react-router-dom";

import "./authentication.css" ;

import Logo from "../../assets/logo.png";

const Register = () => {
    return (
        <div className="registerPageContainer">
            <div className="registerFormContainer">
                <img src={Logo} alt="Logo" className="authLogo" />  
                <h2>
                    <strong>Sign up</strong>
                </h2>
                <p>
                    Your team is waiting for you. <br></br> Create an account to get started. 
                </p>
                <form id="registerForm">
                    <input type="text" placeholder="First name" id="firstName" name="firstName"></input>
                    <input type="text" placeholder="Last name" id="lastName" name="lastName"></input>
                    <input type="email" placeholder="Work email" id="email" name="email"></input>
                    <input type="password" placeholder="Password" id="password" name="password"></input>

                    <button type="submit">Sign up</button>
                </form>

                <div>
                    <p className="loginSection">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
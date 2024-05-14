import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./authentication.css" ;

import Logo from "../../assets/logo.png";

const Register = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/user/register", {
                firstName,
                lastName,
                email,
                password
            });

            console.log(response.data);

            // Redirect to dashboard
            window.location.href = "/dashboard";
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    
    return (
        <div className="registerPageContainer">
            <div className="registerFormContainer">
                <img src={Logo} alt="Logo" className="authLogo" />  
                <h2>
                    <strong>Sign up</strong>
                </h2>
                {error && <p>{error}</p>}
                <p>
                    Your team is waiting for you. <br></br> Create an account to get started. 
                </p>
                <form id="registerForm">
                    <input type="text" placeholder="First name" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    <input type="text" placeholder="Last name" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    <input type="email" placeholder="Work email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

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
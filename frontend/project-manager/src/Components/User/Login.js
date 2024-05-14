import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./authentication.css" ;

import Logo from "../../assets/logo.png";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await fetch("http://localhost:5000/api/user/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password
            //     })
            // });
            const response = await axios.post("http://localhost:5000/api/user/login", {
                email,
                password
            });

            const token = response.data.data.token;
            localStorage.setItem("token", token);

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
        <div className="loginPageContainer">
            <div className="loginFormContainer">
                <img src={Logo} alt="Logo" className="authLogo" />  
                <h2>
                    <strong>Log in</strong>
                </h2>
                {error && <p>{error}</p>}
                <p>
                    Your team is waiting for you. <br></br> Log in to your account to get started. 
                </p>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Work email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

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
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Homepage.css";

import Logo from "../../assets/logo.png";
import Footer from "../Footer/Footer";

const Homepage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/user/login", {
                email,
                password
            });

            const token = response.data?.data?.token;
            
            if (token) {  
                localStorage.setItem("token", token);
                window.location.href = "/dashboard";
            } else {
                setError("Token not received from server")
            }
        } catch (error) {
            console.error("Error caught in handleSubmit:", error);
            setError("An unexpected error occurred");
        }
    }

  return (
    <div>
      <div className="homepageContainer">
            <div className="heroImgContainer">
                <img src={Logo} alt="Logo" className="homepageLogo" />
                <h1 className="homepageTitle">
                    Bringing teams together. <br></br> One task at a time, <br></br>{" "}
                    towards common success.
                </h1>
            </div>
            <div className="homepageLoginFormContainer">
                <h2>
                    <strong>Jump back in</strong>
                </h2>
                <p>
                    Your teammates need you. <br></br> Log in to get started.
                </p>
                <form id="homepageLoginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Work email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                    <button type="submit">Log in</button>
                </form>

                <div>
                    <p className="homepageSignupSection">
                    Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default Homepage;

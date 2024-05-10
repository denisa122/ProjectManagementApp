import React from "react";
import { Link } from "react-router-dom";

import "./Homepage.css";

import Logo from "../../assets/logo.png";
import Footer from "../Footer/Footer";

const Homepage = () => {
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
                <form id="homepageLoginForm">
                    <label htmlFor="email">Work email</label>
                    <input type="email" id="email" name="email"></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"></input>

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

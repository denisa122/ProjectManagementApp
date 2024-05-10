import React from "react";
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
                    <label for="email">Work email</label>
                    <input type="email" name="email"></input>

                    <label for="password">Password</label>
                    <input type="password" name="password"></input>

                    <button type="submit">Log in</button>
                </form>

                <div>
                    <p className="signupSection">
                    Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default Homepage;

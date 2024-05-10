import React from "react";

import "./Dashboard.css"

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import Logo from "../../assets/logo.png";
import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const Dashboard = () => {
    return (
        <div>
            <Navigation />
            <div className="dashboardContainer">
            <div className="dashboardHeader">
                <h1>Team Projects</h1>
                <img src={Logo} alt="logo" className="dashboardLogo"></img>
            </div>
            <div className="projectsContainer">
                <div className="projectCard">
                    <img src={Project} alt="project-thumbnail" className="projectImg"></img>
                    <h3 className="projectTitle">My first project</h3>
                    <div className="projectDetailsRow">
                        <p className="projectStatus">In progress</p>
                        <div className="timeLeft">
                            <img src={Clock} alt="clock" className="clockImg"></img>
                            <p>1w left</p>
                        </div>
                    </div>
                </div>

                <div className="projectCard">
                    <img src={Project} alt="project-thumbnail" className="projectImg"></img>
                    <h3 className="projectTitle">My second project</h3>
                    <div className="projectDetailsRow">
                        <p className="projectStatus">In progress</p>
                        <div className="timeLeft">
                            <img src={Clock} alt="clock" className="clockImg"></img>
                            <p>2d left</p>
                        </div>
                    </div>
                </div>

                <div className="projectCard">
                    <img src={Project} alt="project-thumbnail" className="projectImg"></img>
                    <h3 className="projectTitle">My third project</h3>
                    <div className="projectDetailsRow">
                        <p className="projectStatus">Finished</p>
                        <div className="timeLeft">
                            <img src={Clock} alt="clock" className="clockImg" style={{display: "none"}}></img>
                            <p style={{display: "none"}}></p>
                        </div>
                    </div>
                </div>

                <div className="projectCard">
                    <img src={Project} alt="project-thumbnail" className="projectImg"></img>
                    <h3 className="projectTitle">My fourth project</h3>
                    <div className="projectDetailsRow">
                        <p className="projectStatus">Finished</p>
                        <div className="timeLeft">
                            <img src={Clock} alt="clock" className="clockImg" style={{display: "none"}}></img>
                            <p style={{display: "none"}}></p>
                        </div>
                    </div>
                </div>
            </div>

            <button className="loadButton">Load more</button>

            <Footer />
        </div>
        </div>
        
    );
}

export default Dashboard;
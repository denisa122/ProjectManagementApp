import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css"

import NavigationLeader from "../Navigation/NavigationLeader";
import Footer from "../Footer/Footer";

import Logo from "../../assets/logo.png";
import Plus from "../../assets/plus.svg";
import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const Dashboard = () => {
    return (
        <div>
            <NavigationLeader />
            <div className="dashboardContainerLeader">
            <div className="dashboardHeader">
                <h1>Your Team's Projects</h1>
                <img src={Logo} alt="logo" className="dashboardLogo"></img>
            </div>
            <Link to='/create-project' className="newProjectButton">
                <img src={Plus} alt='plus icon' style={{marginRight: "2px"}}></img>
                <button style={{border: "none", background: "none"}}>New project</button>  
            </Link>
            <div className="projectsContainer">
                <div className="projectCard">
                    <img src={Project} alt="project-thumbnail" className="projectImg"></img>
                    <div className="editButtonWrapper">   
                        <h3 className="projectTitle">My first project</h3>
                        <button>Edit</button>
                    </div>
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
                    <div className="editButtonWrapper">   
                        <h3 className="projectTitle">My second project</h3>
                        <button>Edit</button>
                    </div>
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
                    <div className="editButtonWrapper">   
                        <h3 className="projectTitle">My third project</h3>
                        <button>Edit</button>
                    </div>
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
                    <div className="editButtonWrapper">   
                        <h3 className="projectTitle">My fourth project</h3>
                        <button>Edit</button>
                    </div>
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
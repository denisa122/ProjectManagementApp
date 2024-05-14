import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css"

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import Logo from "../../assets/logo.png";
import Plus from "../../assets/plus.svg";
import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const Dashboard = () => {
    
    const [isTeamLeader, setIsTeamLeader] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get("http://localhost:5000/api/user/login-status", {
          headers: {
            'auth-token': token,
          },
        });

        setIsTeamLeader(response.data?.role === "team leader");
        console.log("Role received:", response.data?.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []); 

    return (
        <div>
      <Navigation />
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>{isTeamLeader ? "Your Team's Project" : "Team Projects"}</h1>
          <img src={Logo} alt="logo" className="dashboardLogo" />
        </div>
        <div>
          {isTeamLeader && (
            <Link to="/create-project" className="newProjectButton">
              <img src={Plus} alt="plus icon" style={{ marginRight: "2px" }}></img>
              <button style={{ border: "none", background: "none" }}>New project</button>
            </Link>
          )}
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
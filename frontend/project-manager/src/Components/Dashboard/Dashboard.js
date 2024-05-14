import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ProjectCard from "./ProjectCard";

import Logo from "../../assets/logo.png";
import Plus from "../../assets/plus.svg";

const Dashboard = () => {
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/user/login-status",
          {
            headers: {
              "auth-token": token,
            },
          }
        );

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
              <img
                src={Plus}
                alt="plus icon"
                style={{ marginRight: "2px" }}
              ></img>
              <button style={{ border: "none", background: "none" }}>
                New project
              </button>
            </Link>
          )}
        </div>
        <div className="projectsContainer">
          <ProjectCard title="My first project" status="In progress" timeLeft="1w"/>
          <ProjectCard title="My second project" status="In progress" timeLeft="2d" />
          <ProjectCard title="My third project" status="Finished" timeLeft="" />
          <ProjectCard title="My fourth project" status="Finished" timeLeft="" />
          <ProjectCard title="My fifth project" status="Finished" timeLeft="" />
          <ProjectCard title="My sixth project" status="Finished" timeLeft="" />
        </div>

        <button className="loadButton">Load more</button>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

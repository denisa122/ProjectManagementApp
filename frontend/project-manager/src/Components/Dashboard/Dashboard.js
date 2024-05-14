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
  const [userId, setUserId] = useState(null);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        // Fetch user role and ID
        const roleResponse = await axios.get(
          "http://localhost:5000/api/user/login-status",
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setIsTeamLeader(roleResponse.data?.role === "team leader");
        const id = roleResponse.data?.id;
        setUserId(id);

        // Fetch projects
        if (id) {
          const projectsResponse = await axios.get(
            `http://localhost:5000/api/projects/users/${id}`,
            {
              headers: {
                "auth-token": token,
              },
            }
          );

          setProjects(projectsResponse.data);
          setIsLoading(false);
        }  

      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
            <Link to="/new-project" className="newProjectButton">
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
          {isLoading  ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                _id={project._id}
                name={project.name}
                projectStatus={project.projectStatus}
                startDate={project.startDate}
                endDate={project.endDate}
              />
            ))
          
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

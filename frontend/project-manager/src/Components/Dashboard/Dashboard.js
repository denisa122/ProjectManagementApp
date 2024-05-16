import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ProjectCard from "./ProjectCard";

import Logo from "../../assets/logo.png";
import Plus from "../../assets/plus.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

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

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/projects/${projectIdToDelete}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectIdToDelete)
      );

      setProjectIdToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleCancelDelete = () => {
    setProjectIdToDelete(null);
  };

  return (
    <div>
      <Navigation />
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>{isTeamLeader ? "Your Team's Projects" : "Team Projects"}</h1>
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
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            projects.map((project) => (
              <div key={project._id}>
                <ProjectCard
                  _id={project._id}
                  name={project.name}
                  projectStatus={project.projectStatus}
                  startDate={project.startDate}
                  endDate={project.endDate}
                />
                <Link
                  to={`/projects/${project._id}`}
                  className="detailsButton"
                >
                  See Details
                </Link>
                {isTeamLeader && (
                  <button
                    onClick={() => setProjectIdToDelete(project._id)}
                    className="deleteButton"
                  >
                    Delete Project
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {projectIdToDelete && (
        <div className="confirmationContainer">
          <div className="confirmationBox">
            <p>Are you sure you want to delete this project?</p>
            <div>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

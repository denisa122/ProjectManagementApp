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
import Delete from "../../assets/delete.png";

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
          `${process.env.REACT_APP_API_URL}/api/user/login-status`,
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
            `${process.env.REACT_APP_API_URL}/api/projects/users/${id}`,
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
        `${process.env.REACT_APP_API_URL}/api/projects/${projectIdToDelete}`,
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
      <div className="dashboardContainer mb-10">
        <div className="text-3xl md:text-5xl font-semibold flex justify-between items-center">
          <h1>{isTeamLeader ? "Your Team's Projects" : "Team Projects"}</h1>
          <img src={Logo} alt="logo" className="w-36 mr-3" />
        </div>
        <div className="mt-10 ml-3">
          {isTeamLeader && (
            <Link to="/new-project">
              <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="flex items-center rounded bg-primary px-10 pb-4 pt-4 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
              >
                <img src={Plus} alt="plus icon" className="me-1 h-5 w-5 mr-3"></img>
                New project
              </button>
            </Link>
          )}
        </div>
        <div className="grid-cols-1 sm:grid md:grid-cols-3">
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
                <div className="mx-3 -mt-4 flex justify-end items-center space-x-3">
                  <Link
                    to={`/projects/${project._id}`}
                    className="detailsButton"
                  >
                    <button
                      type="button"
                      className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-danger-accent-300 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                      style={{
                        background:
                          "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                      }}
                    >
                      See details
                    </button>
                  </Link>

                  {isTeamLeader && (
                    <button
                      onClick={() => setProjectIdToDelete(project._id)}
                      className="deleteButton"
                    >
                      <img src={Delete} alt="" className="w-4"></img>
                    </button>
                  )}
                </div>
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
      <div className="pt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

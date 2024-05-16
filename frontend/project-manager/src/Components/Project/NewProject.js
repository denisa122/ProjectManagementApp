import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const NewProject = ({ userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createProject = async (templateId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      let requestData = {};

      if (templateId) {
        requestData = { templateId };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/projects/`,
          requestData,
          {
            headers: {
              "auth-token": token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          navigate("/dashboard");
        }
      } else {
        requestData = { teamLeader: userId };
        navigate(`/project-details/${requestData}`);
      }
    } catch (error) {
      console.error("Error creating project: ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navigation />
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2"
      style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
        <div className="me-4 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Create Project from Template
            </h5>
            <p class="mb-4 text-base">
              When choosing this option, a project with predefined project
              details will be created. <br></br>
              You will be redirected to the main page, where you can see the
              newly created project.
            </p>
            <button
              type="button"
              onClick={() => createProject("663e13bbc3d7e22c979bcf74")}
              disabled={loading}
              class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              Select
            </button>
          </div>
        </div>

        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Create Project without Template
            </h5>
            <p class="mb-4 text-base">
              When choosing this option, you will be taken to the next step,
              where you have to enter the project details. <br></br>
            </p>
            <button
              type="button"
              onClick={() => createProject(null)}
              disabled={loading}
              class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
       
      <div className="pt-12">
        <Footer />
      </div>
    </div>
  );
};

export default NewProject;

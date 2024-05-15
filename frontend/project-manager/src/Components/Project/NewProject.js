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
          "http://localhost:5000/api/projects/",
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
      <div style={{ margin: "100px" }}>
        <h1>Create New Project</h1>
        <button
          onClick={() => createProject("663e13bbc3d7e22c979bcf74")}
          disabled={loading}
        >
          Create Project from Template
        </button>
        <button onClick={() => createProject(null)} disabled={loading}>
          Create Project without Template
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NewProject;

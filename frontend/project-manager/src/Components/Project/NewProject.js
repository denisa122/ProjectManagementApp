import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewProject = ( {userId}) => {
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
        
      } else {
        requestData = { teamLeader: userId };
        console.log(requestData);
      }
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
        if (templateId) {
          navigate(`/dashboard`);
        } else {
          const projectId = response.data._id;
          navigate(`/project-details/${projectId}`);
        }
      }
    } catch (error) {
      console.error("Error creating project: ", error);
    }
    setLoading(false);
  };

  return (
    <div>
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
  );
};

export default NewProject;

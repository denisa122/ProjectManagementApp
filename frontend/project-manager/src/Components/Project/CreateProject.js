import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Project.css";

const CreateProject = () => {
    
    const navigate = useNavigate();

    const [projectType, setProjectType] = useState("");
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        projectStatus: "",
        team: [],
        teamLeader: "",
        tasks: []
    });

    const handleProjectTypeSelection = (type) => {
        setProjectType(type);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails({
            ...projectDetails,
            [name]: value
        });
    }

    const handleCreateProject = () => {
        if (projectType === "Template") {
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
                navigate("/dashboard/leader");
            }, 2000);
        } else if (projectType === "Blank") {
            navigate('/edit-project/new');
        } else {
            alert("Please select a project type!");
        }
    };

    const handleCreateProjectTest = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post("http://localhost:5000/api/projects", projectDetails, {
          headers: {
            "auth-token": token
          }
        }
      );

        console.log("Project created successfully", response.data);
        navigate("/dashboard");
        } catch (error) {
          console.error("Error creating project", error);
      } 
    }

    return (
        <div>
        <h1>Create New Project</h1>
        <button 
          onClick={() => handleProjectTypeSelection("Blank")}
          style={{ backgroundColor: projectType === "Blank" ? "green" : "inherit" }}
        >
          Create Blank Project
        </button>
        <button 
          onClick={() => handleProjectTypeSelection("Template")}
          style={{ backgroundColor: projectType === "Template" ? "green" : "inherit" }}
        >
          Create Project from Template
        </button>
        <form onSubmit={handleCreateProjectTest}>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={projectDetails.name}
            onChange={handleInputChange}
          />
          <label>Project Description</label>
          <input
            type="text"
            name="description"
            value={projectDetails.description}
            onChange={handleInputChange}
          />
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={projectDetails.startDate}
            onChange={handleInputChange}
          />
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={projectDetails.endDate}
            onChange={handleInputChange}
          />
          <label>Project Status</label>
          <input
            type="text"
            name="projectStatus"
            value={projectDetails.projectStatus}
            onChange={handleInputChange}
          />
          <label>Team Leader</label>
          <input
            type="text"
            name="teamLeader"
            value={projectDetails.teamLeader}
            onChange={handleInputChange}
          />
          <button type="submit">Create Project</button>
        </form>
      </div>
    )
}

export default CreateProject;
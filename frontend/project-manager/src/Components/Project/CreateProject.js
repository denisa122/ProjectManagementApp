import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Project.css";

const CreateProject = () => {
    
    const navigate = useNavigate();
    const [projectType, setProjectType] = useState("");
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const handleProjectTypeSelection = (type) => {
        setProjectType(type);
    };

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
        <button onClick={handleCreateProject}>Create</button>
        {showSuccessNotification && (
          <div>
            Project created successfully!
          </div>
        )}
      </div>
    )
}

export default CreateProject;
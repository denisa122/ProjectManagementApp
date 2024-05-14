import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './Project.css';

const EditProject = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize state for project fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [team, setTeam] = useState("");

    const handleSubmit = () => {
        // Implement logic to update project
        navigate('/create-tasks/${id}');
    }
    
    return (
        <div>
      <h1>Edit Project Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label>Project Status:</label>
          <select value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
        <div>
          <label>Team:</label>
          {/* Logic to populate team options */}
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">Select Team</option>
            {/* Map team options */}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    )
}

export default EditProject;
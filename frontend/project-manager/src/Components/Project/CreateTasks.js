import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Task.css";

const CreateTasks = ({ projectId, teamMembers }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [task, setTask] = useState({
    name: "",
    number: 0,
    description: "",
    startDate: "",
    taskStatus: "To do",
    assignedTeamMember: "",
    attachments: "",
    projectId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/tasks/${projectId}`,
          { ...task, projectId },
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setSuccessMessage("Task created successfully!");
        setTask({
          name: "",
          number: 0,
          description: "",
          startDate: "",
          taskStatus: "To do",
          assignedTeamMember: "",
          attachments: "",
          projectId,
        });

        navigate(`/projects/${projectId}`);
      } catch (error) {
        setError(error.message);
        console.error("Error with request for creating task:", error);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h1>Create task for the project</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Number:</label>
        <input
          type="number"
          name="number"
          value={task.number}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={task.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Task Status:</label>
        <select
          name="taskStatus"
          value={task.taskStatus}
          onChange={handleInputChange}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <label>Assigned Team Member:</label>
        <select
          name="assignedTeamMember"
          value={task.assignedTeamMember}
          onChange={handleInputChange}
        >
          <option value="">Select a team member</option>
          {teamMembers.map(memberId => (
            <option key={memberId} value={memberId}>
              {memberId}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Attachments:</label>
        <input
          type="text"
          name="attachments"
          value={task.attachments}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default CreateTasks;

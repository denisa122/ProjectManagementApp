import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <h1 className="text-black text-xl mt-4">Create task for the project</h1>
      <p className="my-4">
        Press "Add task" to add the task to the project. You can add more tasks
        at once <br></br>
        Press "Done" when you are finished and refresh the page so thee the new
        tasks you just added!
      </p>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="mb-2">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label>Number:</label>
        <input
          type="number"
          name="number"
          value={task.number}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={task.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
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
      <div className="mb-2">
        <label>Assigned Team Member:</label>
        <select
          name="assignedTeamMember"
          value={task.assignedTeamMember}
          onChange={handleInputChange}
        >
          <option value="">Select a team member</option>
          {teamMembers.map((memberId) => (
            <option key={memberId} value={memberId}>
              {memberId}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label>Attachments:</label>
        <input
          type="text"
          name="attachments"
          value={task.attachments}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="flex items-center rounded bg-primary px-6 pb-3 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        style={{
          background:
            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default CreateTasks;

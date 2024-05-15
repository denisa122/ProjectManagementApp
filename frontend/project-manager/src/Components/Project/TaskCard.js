import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Task.css";

const TaskCard = ({ task, projectId }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!task) {
        return; // If task is null, do nothing
      }

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/tasks/project/${projectId}/task/${task._id}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setTaskDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [task, projectId]);

  if (!taskDetails || isLoading) {
    return <p>Loading task details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="taskCard">
      <h3 className="taskTitle">
        # {taskDetails.task.number} {taskDetails.task.name}
      </h3>
      <p className="taskDescription">
        Description: {taskDetails.task.description}
      </p>
      <p className="taskStatus">Status: {taskDetails.task.taskStatus}</p>
      <div className="taskAssignedMember">
        <p>
          Assigned Team Member:{" "}
          {taskDetails.task.assignedTeamMember &&
            taskDetails.task.assignedTeamMember
              .map((member) => `${member.firstName} ${member.lastName}`)
              .join(", ")}
        </p>
      </div>
      <p className="taskAttachments">
        Attachments: {taskDetails.task.attachments}
      </p>
      <p>Start date: {taskDetails.task.startDate}</p>
    </div>
  );
};

export default TaskCard;

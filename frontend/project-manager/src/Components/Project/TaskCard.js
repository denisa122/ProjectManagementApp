import React, { useState, useEffect } from "react";
import axios from "axios";

import { Draggable } from "react-beautiful-dnd";

import "./Task.css";

const TaskCard = ({ task, projectId, index }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!task) {
        return; 
      }

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
        setIsLoading(false); // Set loading state to false after fetching task details
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [task, projectId]);

  // Conditional rendering based on loading state and task details
  if (isLoading || !taskDetails) {
    return <p>Loading task details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Draggable draggableId={task._id} index={index}> 
      {(provided) => (
        <div
          className="taskCard"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>
            # {taskDetails.task.number} {taskDetails.task.name}
          </h3>
          <p>
            Description: {taskDetails.task.description}
          </p>
          <p>Status: {taskDetails.task.taskStatus}</p>
          
            <p>
              Assigned Team Member:{" "}
              {taskDetails.task.assignedTeamMember &&
                taskDetails.task.assignedTeamMember
                  .map((member) => `${member.firstName} ${member.lastName}`)
                  .join(", ")}
            </p>
          
          
          <p>Start date: {taskDetails.task.startDate}</p>
        </div>
      )}
    </Draggable>
  );
};


export default TaskCard;

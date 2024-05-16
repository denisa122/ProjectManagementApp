import React, { useState, useEffect } from "react";
import axios from "axios";

import { Draggable } from "react-beautiful-dnd";

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
          `${process.env.REACT_APP_API_URL}/api/tasks/project/${projectId}/task/${task._id}`,
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
          className="block max-w-[18rem] rounded-lg bg-danger text-white shadow-secondary-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="border-b-2 border-black/20 px-6 py-3">
            <h3>
              # {taskDetails.task.number} {taskDetails.task.name}
            </h3>
          </div>

          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              {taskDetails.task.description}
            </h5>
            <p className="text-base">
              Status: {taskDetails.task.taskStatus} <br />
              Start date: {taskDetails.task.startDate}
              <p>
                Assigned Team Member:{" "}
                {taskDetails.task.assignedTeamMember &&
                  taskDetails.task.assignedTeamMember
                    .map((member) => `${member.firstName} ${member.lastName}`)
                    .join(", ")}
              </p>
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

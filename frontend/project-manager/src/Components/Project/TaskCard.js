import React, { useState, useEffect } from "react";
import axios from "axios";

import { Draggable } from "react-beautiful-dnd";

import avatar from "../../assets/avatar.svg";

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
          className="block max-w-[18rem] rounded-lg border border-danger-600 bg-transparent text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="border-b-2 border-danger-600 px-6 py-3">
            <h3 className="text-xl">
              <strong># {taskDetails.task.number} {taskDetails.task.name}</strong>
            </h3>
          </div>

          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-base">
              {taskDetails.task.description}
            </h5>
            <p className="text-base">
              Start date: {taskDetails.task.startDate}
              <p className="flex flex-row space-x-">
                <img src={avatar} alt="profile icon" className="mr-1.5"></img>
                {taskDetails.task.assignedTeamMember &&
                  taskDetails.task.assignedTeamMember
                    .map((member) => `${member.firstName} ${member.lastName}`)
                    .join(", ")}
              </p>
            </p>
          </div>
          <div className="border-t-2 border-danger-600 px-6 py-3">
          <strong>{taskDetails.task.taskStatus}</strong>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

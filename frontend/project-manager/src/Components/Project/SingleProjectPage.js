import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import CreateTasks from "./CreateTasks";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const SingleProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setTasks(response.data);
      console.log("tasks", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/projects/${projectId}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setProject(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const roleResponse = await axios.get(
          "http://localhost:5000/api/user/login-status",
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setIsTeamLeader(roleResponse.data?.role === "team leader");
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      setShowCreateTask(true);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again later.");
    }
  };

  const handleDoneAddingTasks = () => {
    setShowCreateTask(false);
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    // If dropped outside the droppable area
    if (!destination) {
      return;
    }
    // If the task is dropped in the same column
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    // Update task status
    await axios.put(
      `http://localhost:5000/api/tasks/${projectId}/${draggableId}`,
      { taskStatus: destination.droppableId },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // Fetch tasks again to reflect changes
    fetchTasks();
  };

  if (isLoading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navigation />
      <h2>Single Project Details</h2>
      {project && (
        <div>
          <p>Name: {project.name}</p>
          <p>Description: {project.description}</p>
          <p>Start date: {project.startDate}</p>
          <p>End date: {project.endDate}</p>
          <p>Project status: {project.projectStatus}</p>
          <p>Team leader: {project.teamLeader}</p>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex" }}>
              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ margin: 8, border: "1px solid lightgrey", borderRadius: 4, padding: 8, width: 400 }}
                  >
                    <h3>To Do</h3>
                    {tasks
                      .filter((task) => task.taskStatus === "To do")
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} projectId={projectId} index={index}/>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="inprogress">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ margin: 8, border: "1px solid lightgrey", borderRadius: 4, padding: 8, width: 400 }}
                  >
                    <h3>In Progress</h3>
                    {tasks
                      .filter((task) => task.taskStatus === "In progress")
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} projectId={projectId} index={index}/>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="done">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ margin: 8, border: "1px solid lightgrey", borderRadius: 4, padding: 8, width: 400 }}
                  >
                    <h3>Done</h3>
                    {tasks
                      .filter((task) => task.taskStatus === "Done")
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} projectId={projectId} index={index}/>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
          {isTeamLeader && (
            <button onClick={handleAddTask}>Add New Task</button>
          )}
          {showCreateTask && (
            <div>
              <CreateTasks projectId={projectId} />
              <button onClick={handleDoneAddingTasks}>Done</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProjectPage;

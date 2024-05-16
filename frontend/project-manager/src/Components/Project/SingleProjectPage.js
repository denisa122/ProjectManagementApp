import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import CreateTasks from "./CreateTasks";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Plus from "../../assets/plus.svg";
import Logo from "../../assets/logo.png";

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
        `${process.env.REACT_APP_API_URL}/api/tasks/${projectId}`,
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
          `${process.env.REACT_APP_API_URL}/api/projects/${projectId}`,
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
          `${process.env.REACT_APP_API_URL}/api/user/login-status`,
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
      {project && (
        <div>
          <div className="m-10 flex flex-row justify-between items-start">
            <div className="ml-4">
              <p className="text-black text-4xl mb-2">{project.name}</p>
              <p className="text-black text-xl mb-6">{project.description}</p>
              <p className="text-black text-xl mb-2">Tasks:</p>
            </div>
            <div>
              <img src={Logo} alt="logo" className="w-36 mr-7" />
            </div>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid-cols-1 sm:grid md:grid-cols-3 gap-0 mx-12">
              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      margin: 8,
                      border: "1px solid lightgrey",
                      borderRadius: 4,
                      padding: 8,
                    }}
                  >
                    <h3 className="text-black text-3xl text-center mt-4 mb-10">
                      To Do
                    </h3>
                    {tasks
                      .filter((task) => task.taskStatus === "To do")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="my-6 flex content-center justify-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                projectId={projectId}
                                index={index}
                              />
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
                    style={{
                      margin: 8,
                      border: "1px solid lightgrey",
                      borderRadius: 4,
                      padding: 8,
                    }}
                  >
                    <h3 className="text-black text-3xl text-center mt-4 mb-10">
                      In Progress
                    </h3>
                    {tasks
                      .filter((task) => task.taskStatus === "In progress")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="my-6 flex content-center justify-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                projectId={projectId}
                                index={index}
                              />
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
                    style={{
                      margin: 8,
                      border: "1px solid lightgrey",
                      borderRadius: 4,
                      padding: 8,
                    }}
                  >
                    <h3 className="text-black text-3xl text-center mt-4 mb-10">
                      Done
                    </h3>
                    {tasks
                      .filter((task) => task.taskStatus === "Done")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="my-6 flex content-center justify-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                projectId={projectId}
                                index={index}
                              />
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

          <div className="ml-14 mt-4 mb-6">
            {isTeamLeader && (
              <button
                type="button"
                onClick={handleAddTask}
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="flex items-center rounded bg-primary px-6 pb-3 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                <img
                  src={Plus}
                  alt="plus icon"
                  className="me-1 h-5 w-5 mr-3"
                ></img>
                Add task
              </button>
            )}
            {showCreateTask && (
              <div className="flex flex-col space-y-4">
                <CreateTasks
                  projectId={projectId}
                  teamMembers={project.team[0].members}
                />
                <div>
                  <button
                    onClick={handleDoneAddingTasks}
                    className="text-start rounded bg-primary px-6 pb-3 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProjectPage;

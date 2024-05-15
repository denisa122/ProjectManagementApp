import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
          <p>Tasks:</p>
          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                projectId = {projectId} // Pass task as a prop
              />
            ))}
          </div>
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
      <Footer />
    </div>
  );
};


export default SingleProjectPage;
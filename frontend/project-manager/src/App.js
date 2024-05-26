import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Dashboard from "./Components/Dashboard/Dashboard";

import SingleProjectPage from "./Components/Project/SingleProjectPage";
import NewProject from "./Components/Project/NewProject";
import ProjectDetails from "./Components/Project/ProjectDetails";
import EditProject from "./Components/Project/EditProject";

import CreateTasks from "./Components/Project/CreateTasks";

import TeamDetailsPage from "./Components/Team/TeamDetailsPage";

import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/login-status`,
            {
              headers: {
                "auth-token": token,
              },
            }
          );
          setUserId(response.data.id);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <PrivateRoute
              element={<SingleProjectPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/create-tasks/:id"
          element={
            <PrivateRoute
              element={<CreateTasks />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/new-project"
          element={
            <PrivateRoute
              element={<NewProject userId={userId} />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/project-details/:id"
          element={
            <PrivateRoute
              element={<ProjectDetails userId={userId}/>}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/edit-project/:id"
          element={
            <PrivateRoute
              element={<EditProject userId={userId} />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/team-details"
          element={
            <PrivateRoute
              element={<TeamDetailsPage userId={userId} />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

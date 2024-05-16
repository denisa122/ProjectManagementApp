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

import CreateTasks from "./Components/Project/CreateTasks";

import TeamDetailsPage from "./Components/Team/TeamDetailsPage";


function App() {
  const [userId, setUserId] = useState(null);

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        /** Change to PrivateRoute after I implement the logic for it */
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route
          path="/projects/:projectId"
          element={<SingleProjectPage />}
        ></Route>
        <Route path="/create-tasks/:id" element={<CreateTasks />}></Route>
        <Route
          path="/new-project"
          element={<NewProject userId={userId} />}
        ></Route>
        <Route
          path="/project-details/:id"
          element={<ProjectDetails userId={userId} />}
        ></Route>
        <Route path="/team-details" element={<TeamDetailsPage userId={userId}/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

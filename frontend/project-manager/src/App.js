import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import Homepage from './Components/Homepage/Homepage';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateProject from './Components/Project/CreateProject';
import EditProject from './Components/Project/EditProject';
import CreateTasks from './Components/Project/CreateTasks';

import NewProject from './Components/Project/NewProject';
import ProjectDetails from './Components/Project/ProjectDetails';

function App() {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/user/login-status', {
            headers: {
              'auth-token': token
            }
          });
          setUserId(response.data.id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        /** Change to PrivateRoute after I implement the logic for it */
        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path='/create-project' element={<CreateProject />}></Route>
        <Route path='/edit-project/:id' element={<EditProject />}></Route>

        <Route path='/create-tasks/:id' element={<CreateTasks />}></Route>

        <Route path='/new-project' element={<NewProject userId={userId}/>}></Route>
        <Route path='/project-details/:id' element={<ProjectDetails userId={userId}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

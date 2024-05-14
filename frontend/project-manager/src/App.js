import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateProject from './Components/Project/CreateProject';
import EditProject from './Components/Project/EditProject';
import CreateTasks from './Components/Project/CreateTasks';

function App() {

  const [isTeamLeader, setIsTeamLeader] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsTeamLeader(userRole === 'team leader');
    console.log('Role:', userRole);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        /** Change to PrivateRoute after I implement the logic for it */
        <Route path='/dashboard' element={<Dashboard isTeamLeader={isTeamLeader}/>}></Route>

        <Route path='/create-project' element={<CreateProject />}></Route>
        <Route path='/edit-project/:id' element={<EditProject />}></Route>

        <Route path='/create-tasks/:id' element={<CreateTasks />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

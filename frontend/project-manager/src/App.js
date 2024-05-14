import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import DashboardLeader from './Components/Dashboard/DashboardLeader';
import CreateProject from './Components/Project/CreateProject';
import EditProject from './Components/Project/EditProject';
import CreateTasks from './Components/Project/CreateTasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        /** Change to PrivateRoute after I implement the logic for it */
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/leader' element={<DashboardLeader />}></Route>

        <Route path='/create-project' element={<CreateProject />}></Route>
        <Route path='/edit-project/:id' element={<EditProject />}></Route>

        <Route path='/create-tasks/:id' element={<CreateTasks />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

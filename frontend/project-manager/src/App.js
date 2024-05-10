import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import DashboardLeader from './Components/Dashboard/DashboardLeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/leader' element={<DashboardLeader />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

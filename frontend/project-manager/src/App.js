import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

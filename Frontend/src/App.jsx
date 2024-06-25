import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add_User from './components/Add_User';
import Home from './components/Home';
import Edit_User from './components/Edit_User';
import Profile from './components/Profile';
// import Awais from './components/Awais';
// import Awaispk from './components/Awaispk';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/Awaispk" element={<Awaispk />}/> */}
        <Route path='/Adduser' element={<Add_User />}/>
        <Route path='/view_user/:id' element={<Profile />}/>
        <Route path='/Edituser/:id' element={<Edit_User />}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;

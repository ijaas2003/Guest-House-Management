import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Signup from './Components/Signup';
import Login from './Components/Login';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import OwnerLogin from './Components/Owner/OwnerLogin';
import OwnerSignup from './Components/Owner/OwnerSignup';
import OwnerHome from './Components/Owner/OwnerHome';
import Home from './Components/Home';
import OwnerAddHouse from './Components/Owner/OwnerAddHouse';
//import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import SeeBooking from './Components/Owner/SeeBooking';
function App() {
  const { user } = useAuthContext();
  const [check, setCheck] = useState(null);
  const location = window.location.href ;
  console.log(location.slice(21, location.length))// Use useLocation to access the current location

  useEffect(() => {
    if (user?.types === "owner") {
      setCheck("owner");
    } else if (user?.types === "user") {
      setCheck("user");
    }
  }, [user?.types]);

  //console.log(location.pathname); // Log the current URL path

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user == null ? <Header /> : <Navigate  to={`${user.types == "user"?"/home":"/ownerhome"}`}/>} />
        <Route path="/Login" element={user === null ? <Login /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/Signup" element={user === null ? <Signup /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/OwnerLogin" element={user === null ? <OwnerLogin /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/OwnerSignup" element={user===null ? <OwnerSignup /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/Home" element={check==="user" ? <Home /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/OwnerHome" element={check==="owner" ? <OwnerHome /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/OwnerAddHouse" element={check==="owner" ? <OwnerAddHouse /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
        <Route path="/seebooking" element={check==="owner" ? <SeeBooking /> : <Navigate to={`${location.slice(21, location.length)}`}/>} />
      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
  );
}

export default App;

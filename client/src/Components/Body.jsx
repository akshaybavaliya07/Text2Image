import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import ForgetPassword from "./ForgetPassword.jsx";
import { AppContext } from '../context/AppContext.jsx';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Body = () => {
  const {showLogin, showForgotPassword} = useContext(AppContext);

  return (
    <>
      <ToastContainer position="top-right" style={{ marginTop: '5rem' }}/>
      <Navbar />
      {showLogin && <Login />}
      {showForgotPassword && <ForgetPassword />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;

import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import { Outlet } from "react-router-dom";
import { AppContext } from '../context/AppContext.jsx'

const Body = () => {
  const {showLogin} = useContext(AppContext);

  return (
    <>
      <Navbar />
      {showLogin && <Login />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;

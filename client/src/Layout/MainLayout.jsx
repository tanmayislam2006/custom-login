import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return <div className="max-w-7xl mx-auto
  
  ">
  <Navbar/>
   <div className="min-h-[calc(100vh-200px)]">
    <ToastContainer/>
    <Outlet/>
   </div>
   <Footer/>
  </div>;
};

export default MainLayout;

import React, { useContext, useEffect } from "react";

import "./index.css";

import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SideBar from "../../Components/UserPanel/SideBar/SideBar";
import AuthContext from "../../context/authContext";
import Skeleton from "react-loading-skeleton";

function UserPanel() {
  return (
    <>
      <Topbar />
      <Navbar />
      <section class="content">
        <div class="content-header">
          <div class="container">
            <span class="content-header__title">حساب کاربری من</span>
            <span class="content-header__subtitle">پیشخوان</span>
          </div>
        </div>
        <div class="content-main">
          <div class="container">
            <div class="row">
              <SideBar />

              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserPanel;

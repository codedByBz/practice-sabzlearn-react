import React from "react";
import { Outlet } from "react-router-dom";

import './index.css'

import Sidebar from "../../Components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../Components/AdminPanel/Topbar/Topbar";

export default function index() {
  return (
    <>
      <div id="content">
        <Sidebar />
        <div id="home" className="col-10">
          <Topbar />
          <div className="container-fluid" id="home-content">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

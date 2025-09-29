import React, { useContext } from "react";
import "./Sidebar.css";

import { Link, useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function Sidebar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const loguotAcount = () => {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "آیا واقعا میخواهید خارج شوید؟",
      buttons: ["نه، دستم خورد", "آره"],
    }).then((result) => {
      if (result) {
        toast.success("با موفقیت خارج شدید", {
          position: "top-right",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: true,
          rtl: true,
          theme: "colored",
          style: {
            backgroundColor: "forestgreen",
            color: "#fff",
            fontFamily: "IRANSans",
          },
          progressStyle: { backgroundColor: "#FF0000" },
        });
        setTimeout(() => {
          authContext.logout();
          navigate("/");
        }, 2000);
      }
    });
  };

  const setActive = ({ isActive }) => {
    return isActive
      ? "flights-table-daylink active-menu"
      : "flights-table-daylink";
  };
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <NavLink className={setActive} to="/">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </NavLink>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink className={setActive} to="/p-admin" end>
              <span>صفحه اصلی</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="courses">
              <span>دوره ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="sessions">
              <span>جلسات دوره</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="articles">
              <span>مقاله ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="category">
              <span>دسته‌بندی‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="menus">
              <span>منو ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="users">
              <span>کاربران</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="comments">
              <span>کامنت‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="tickets">
              <span>تیکت‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="contacts">
              <span>پیغام‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="offs">
              <span>کدهای تخفیف</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={setActive} to="campaign">
              <span>کمپین‌ها</span>
            </NavLink>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                loguotAcount();
              }}
            >
              <span>خروج از اکانت</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

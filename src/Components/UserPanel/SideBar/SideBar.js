import React, { useContext } from "react";

import AuthContext from "../../../context/authContext";

import { Link, NavLink } from "react-router-dom";
import swal from "sweetalert";

function SideBar() {
  const authContext = useContext(AuthContext);

  const logoutUser = () => {
    swal({
      icon: "warning",
      title: "آیا از خروج از اکانت خود اطمینان دارید؟",
      buttons: ["نه، دستم خورد", "آره"],
    }).then((result) => {
      if (result) {
        console.log(authContext.logout());
      }
    });
  };

  const setActive = ({ isActive }) => {
    return isActive ? "sidebar__link active" : "sidebar__link";
  };

  return (
    <>
      <div className="col-3">
        <div className="sidebar">
          <span className="sidebar__name">{authContext.userInfo?.name}</span>
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <NavLink className={setActive} to="/my-account" end>
                پیشخوان
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className={setActive} to="orders">
                سفارش‌ها
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className={setActive} to="money">
                کیف پول من
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className={setActive} to="edit-account">
                جزئیات حساب کاربری
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className={setActive} to="buyed">
                دوره های خریداری شده
              </NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink className={setActive} to="tickets">
                تیکت های پشتیبانی
              </NavLink>
            </li>
            <li className="sidebar__item">
              <a className="sidebar__link pointer" onClick={logoutUser}>
                خروج از سیستم
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;

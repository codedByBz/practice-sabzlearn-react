import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../../context/authContext";

import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const authContext = useContext(AuthContext);

  const [allMenus, setAllMenus] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((data) => {
        setAllMenus(data);
      });
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {/* menus, submenus? */}
              {allMenus.map((menuData) => (
                <li key={menuData._id} className="main-header__item">
                  <Link to={menuData.href} className="main-header__link">
                    {menuData.title}
                    {menuData.submenus?.length ? (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {/* for submenus */}
                          {menuData.submenus.map((submenu) => (
                            <li
                              key={submenu._id}
                              className="main-header__dropdown-item"
                            >
                              <Link
                                to={submenu.href}
                                className="main-header__dropdown-link"
                              >
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {authContext.isLogin ? (
              <Link to="/my-account" className="main-header__profile">
                <span className="main-header__profile-text">
                  {" "}
                  {authContext.userInfo.name}{" "}
                </span>
              </Link>
            ) : (
              <Link to="/register" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

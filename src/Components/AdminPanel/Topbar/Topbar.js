import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";

export default function Topbar() {

  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotifBar, setIsShowNotifBar] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        "Authorization": `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAdminInfo(data);
        setAdminNotifications(data.notifications)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const seeNotif = (notifID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:4000/v1/notifications/see/${notifID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAdminNotifications(prev => prev.filter(notif => notif._id !== data._id));
      })
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className={`home-header ${isShowNotifBar ? "active-modal-notfication" : ''}`}>
          <div className="home-right">
            <div className="home-searchbar">
              <input type="text" className="search-bar" placeholder="جستجو..." />
            </div>
            <div className="home-notification"
              onMouseEnter={() => { setIsShowNotifBar(true) }}
              onMouseLeave={() => { setIsShowNotifBar(false) }}
            >
              <button type="button">
                <i className="far fa-bell"></i>
                {
                  adminNotifications.length !== 0 ? (
                    <span className="count-notif">{adminNotifications.length}</span>
                  ) : ''
                }
              </button>
            </div>
            <div className="home-notification-modal"
              onMouseLeave={() => { setIsShowNotifBar(false) }}
              onMouseEnter={() => { setIsShowNotifBar(true) }}
            >
              <ul className="home-notification-modal-list">
                {
                  adminNotifications.length === 0 ? (
                    <li className="home-notification-modal-item">
                      <span className="home-notification-modal-text">پیغامی موجود نیست</span>
                    </li>
                  ) : (
                    adminNotifications.map(notif => (
                      <li key={notif._id} className="home-notification-modal-item">
                        <span className="home-notification-modal-text">{notif.msg}</span>
                        <label className="switch">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              seeNotif(notif._id);
                            }}>دیدم</a>
                        </label>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src={adminInfo.profile} alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">
                  {adminInfo.name}
                </a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

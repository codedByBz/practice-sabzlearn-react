import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

import './Topbar.css';

function Topbar() {

  const [dataTopbar, setDataTopbar] = useState([]);

  const [infos, setInfos] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then(res => res.json())
      .then(data => {
        const shuffledData = [...data].sort(() => 0.5 - Math.random());
        setDataTopbar(shuffledData.slice(0, 6));
      })

    fetchInfos()
  }, [])

  const fetchInfos = () => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then(res => res.json())
      .then(data => {
        setInfos(data);
      })
  }

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {
                dataTopbar.map(item => (
                  <li key={item._id} className="top-bar__item">
                    <Link to={item.href} className="top-bar__link">
                      {item.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {/* sabzlearn@gmail.com */}
                {infos.email}
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                {/* 09921558293 */}
                {infos.phone}
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
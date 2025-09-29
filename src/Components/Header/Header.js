import React, { useEffect, useState } from 'react';

import Topbar from '../Topbar/Topbar';
import Navbar from '../Navbar/Navbar';

import './Header.css';
import Landing from '../Landing/Landing';

function Header() {

  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then(res => res.json())
      .then(data => {
        setInfos(data);
      })
  }, [])

  return (
    <>
      <header className="header">
        <Topbar />
        <Navbar />
      </header>
      <Landing infos={infos} />
    </>
  )
}

export default Header;
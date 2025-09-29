import React, { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import AuthContext from "./context/authContext";

function App() {
  const router = useRoutes(routes);

  const [loadnig, setLoadnig] = useState(true);
  const [isLogin, setIsLogin] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userToken, newUserInfo) => {
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify({ token: userToken }));
    setIsLogin(true);
    setUserInfo(newUserInfo);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("user");
    setUserInfo(null);
    setIsLogin(false);
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData && userInfo == null) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLogin(true);
          setUserInfo(userData);
          setLoadnig(false);
        });
    } else {
      setLoadnig(false);
      setIsLogin(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        userInfo,
        token,
        login,
        logout,
      }}
    >
      <ToastContainer />
      <div>{loadnig ? "" : <>{router}</>}</div>
    </AuthContext.Provider>
  );
}

export default App;

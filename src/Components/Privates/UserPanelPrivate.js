import React, { useContext } from "react";
import AuthContext from "../../context/authContext";

function UserPanelPrivate({ children }) {
  const authContext = useContext(AuthContext);
  return (
    <>
      {authContext.isLogin == true ? (
        <>{children}</>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}

export default UserPanelPrivate;

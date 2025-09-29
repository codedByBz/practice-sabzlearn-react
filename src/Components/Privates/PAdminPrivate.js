import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";

function PAdminPrivate({ children }) {
  const authContext = useContext(AuthContext);
  return (
    <>
      {authContext.isLogin == true && authContext.userInfo?.role == "ADMIN" ? (
        <>{children}</>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
}

export default PAdminPrivate;

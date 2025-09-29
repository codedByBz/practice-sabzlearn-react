import { createContext } from "react";

const AuthContext = createContext({
  isLogin: null,
  userInfo: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

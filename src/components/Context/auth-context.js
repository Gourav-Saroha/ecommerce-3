import React, { useState } from "react";
const AuthContext = React.createContext({
  token: null,
  userId: null,
  userName: null,
  isAuth: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const initialUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(initialUserId);
  const initialUserName = localStorage.getItem("userName");
  const [userName, setUserName] = useState(initialUserName);
  let isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const userIdHandler = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const userNameHandler = (uName) => {
    setUserName(uName);
    localStorage.setItem("userName", userName);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiryDate");
    isLoggedIn = false;
  };

  const contextValue = {
    token: token,
    userId: userId,
    userHandler: userIdHandler,
    userNameHandler: userNameHandler,
    userName: userName,
    isAuth: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminGlobalContext = React.createContext();

export const AdminGlobalContextProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/admin/all-doctors");
    }
  }, [token]);

  const value = {
    token,
    setToken,
    navigate,
  };

  return (
    <AdminGlobalContext.Provider value={value}>
      {children}
    </AdminGlobalContext.Provider>
  );
};
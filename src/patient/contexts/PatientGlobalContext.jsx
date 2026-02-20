import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PatientGlobalContext = React.createContext();

export const PatientGlobalContextProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      if(location.pathname === "/patient/login" || location.pathname === "/patient/signup" || location.pathname === "/patient/verify"){
        navigate("/patient/all-doctors");
      }    }
  }, [token]);

  const value = {
    token,
    setToken,
    navigate,
  };

  return (
    <PatientGlobalContext.Provider value={value}>
      {children}
    </PatientGlobalContext.Provider>
  );
};
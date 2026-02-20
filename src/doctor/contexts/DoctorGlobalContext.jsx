import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const DoctorGlobalContext = React.createContext();

export const DoctorGlobalContextProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/doctor/view-slots");
    }
  }, [token]);

  const value = {
    token,
    setToken,
    navigate,
  };

  return (
    <DoctorGlobalContext.Provider value={value}>
      {children}
    </DoctorGlobalContext.Provider>
  );
}
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/index.js";
import { GlobalContext } from "./GlobalContext.jsx";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

  const { token } = useContext(GlobalContext);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await API.admin.getAllDoctors();
      console.log("Fetched doctors from context:", response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
      
  


  useEffect(() => {
    if (token) fetchDoctors();
  }, [token]);

  const value = {
    doctors,
    setDoctors,
    fetchDoctors,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

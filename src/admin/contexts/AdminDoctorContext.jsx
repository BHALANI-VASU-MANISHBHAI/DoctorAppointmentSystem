import { createContext, useContext, useEffect, useState } from "react";
import API from"../../shared/api/index.js";
import { AdminGlobalContext } from "./AdminGlobalContext.jsx";

export const AdminDoctorContext = createContext();

export const AdminDoctorContextProvider = ({ children }) => {

  const { token } = useContext(AdminGlobalContext);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await API.admin.getAllDoctors();
      console.log("Fetched doctors from context:", response);
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
    <AdminDoctorContext.Provider value={value}> 
      {children}
    </AdminDoctorContext.Provider>
  );
}
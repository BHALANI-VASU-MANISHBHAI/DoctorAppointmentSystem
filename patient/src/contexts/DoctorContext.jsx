import { createContext, useEffect, useState } from "react";
import API from "../api/index.js";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await API.patient.getAllDoctors();
      
      console.log("Fetched doctors from context:", response);
      setDoctors(response);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch doctors on component mount (public endpoint, no auth needed)
  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    setDoctors,
    fetchDoctors,
    loading,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}
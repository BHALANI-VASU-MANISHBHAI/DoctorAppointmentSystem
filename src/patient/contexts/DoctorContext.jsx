import { createContext, useContext, useEffect, useState } from "react";
import  API from "../../shared/api";
import { PatientGlobalContext } from "./PatientGlobalContext";


export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

  const { token } = useContext(PatientGlobalContext);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await API.patient.getAllDoctors();
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
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}
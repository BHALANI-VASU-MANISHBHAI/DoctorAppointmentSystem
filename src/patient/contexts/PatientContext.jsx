import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientGlobalContext } from "./PatientGlobalContext";
import API from "../../shared/api/index.js";

export const PatientContext = React.createContext();

export const PatientContextProvider = ({ children }) => {
  
  const { token } = useContext(PatientGlobalContext);
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  const fetchPatientData = async () => {
    try {
      const response = await API.patient.getProfile();
      console.log("Patient profile data:", response.data);
      setPatient(response.data);  // ✅ store in state
    } catch (error) {
      console.error("Error fetching patient profile:", error);
      setPatient(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPatientData();
    }
  }, [token]);

  const value = {
    token,
    patient,
    fetchPatientData,
    navigate,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};
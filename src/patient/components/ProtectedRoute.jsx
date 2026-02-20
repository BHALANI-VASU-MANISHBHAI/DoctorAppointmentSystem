import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { PatientGlobalContext } from "../contexts/PatientGlobalContext";

const ProtectedRoute = ({ children }) => {
  const  {token}  = useContext(PatientGlobalContext);

  if (!token) {
    return <Navigate to="/patient/login" replace />
  }

  return children
}

export default ProtectedRoute

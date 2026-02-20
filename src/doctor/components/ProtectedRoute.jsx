import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { DoctorGlobalContext } from "../contexts/DoctorGlobalContext";

const ProtectedRoute = ({ children }) => {
  const  {token}  = useContext(DoctorGlobalContext);

  if (!token) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children
}

export default ProtectedRoute

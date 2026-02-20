import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminGlobalContext } from "../contexts/AdminGlobalContext";

const ProtectedRoute = ({ children }) => {
  const  {token}  = useContext(AdminGlobalContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute

import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AdminGlobalContext } from "../contexts/AdminGlobalContext";

const ProtectedRoute = ({ children }) => {
  const  {token}  = useContext(AdminGlobalContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children
}

export default ProtectedRoute

import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const  {token}  = useContext(GlobalContext);

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

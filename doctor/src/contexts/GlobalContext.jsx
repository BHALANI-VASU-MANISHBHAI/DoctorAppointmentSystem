import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GlobalContext = React.createContext()

export const GlobalContextProvider = ({ children }) => {
  const [token, setToken] = React.useState(
    localStorage.getItem("token") || null
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
  }, [token])

  const value = {
    token,
    setToken,
    navigate
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext

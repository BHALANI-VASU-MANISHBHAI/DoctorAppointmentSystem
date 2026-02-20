import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const GlobalContext = React.createContext()

export const GlobalContextProvider = ({ children }) => {
  const getInitialToken = () => {
    const stored = localStorage.getItem("token");
    if (!stored) return null;
    // If it's a stringified object, parse it
    if (stored.startsWith('{')) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.token || stored;
      } catch (e) {
        return stored;
      }
    }
    return stored;
  }

  const [token, setToken] = React.useState(getInitialToken())

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      // Always store as plain string (the JWT itself)
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


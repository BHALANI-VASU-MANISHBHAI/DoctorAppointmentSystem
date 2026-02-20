import { createContext, useContext, useState } from "react";
import API from "../api/index.js";
import { GlobalContext } from "./GlobalContext.jsx";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(GlobalContext);

    const fetchUser = async () => {
        if (!token) {
            setUser(null);
            return;
        }
        try {
            setLoading(true);
            const response = await API.patient.getProfile();
            setUser(response);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        setUser,
        fetchUser,
        loading,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
} 
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/index.js";
import { GlobalContext } from "./GlobalContext.jsx";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const { token } = useContext(GlobalContext);

    const fetchUser = async () => {
        try {   
            const response = await API.patient.getProfile();
            setUser(response);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        if(token){
            fetchUser();
        } else {
            setUser(null);
        }
    }, [token]);
    const value = {
        user,
        setUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
} 